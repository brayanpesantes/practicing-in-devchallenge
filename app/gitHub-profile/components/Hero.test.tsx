import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';
import { UserData } from './Container'; // Adjust path as necessary

// Mock child components
jest.mock('./InputSearch', () => ({
  __esModule: true,
  default: jest.fn(({ handleSearchChange, searchQuery, fetchData, handleOpen }) => (
    <div>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        data-testid="input-search"
      />
      <button data-testid="input-search-fetch" onClick={() => fetchData(searchQuery)}>Mock Fetch</button>
      <button data-testid="input-search-open" onClick={handleOpen}>Mock Open</button>
    </div>
  )),
}));

jest.mock('./Dropdown', () => ({
  __esModule: true,
  default: jest.fn(({ results, isLoading, handleData, handleClose }) => {
    if (isLoading) return <div>Loading...</div>;
    if (!results || (results as any).message || (Array.isArray(results) && results.length === 0)) {
      return <div>No results or error</div>;
    }
    const items = Array.isArray(results) ? results : [results];
    return (
      <div data-testid="dropdown">
        {items.map((user: UserData) => (
          <button key={user.id} data-testid={`dropdown-user-${user.login}`} onClick={() => handleData(user)}>
            {user.name || user.login}
          </button>
        ))}
        <button data-testid="dropdown-close" onClick={handleClose}>Close Dropdown</button>
      </div>
    );
  }),
}));

const mockUser: UserData = {
  login: 'testuser', id: 1, name: 'Test User', avatar_url: '', bio: 'Test bio',
  // Fill other required fields for UserData
  node_id: '', gravatar_id: '', url: '', html_url: '', followers_url: '', following_url: '', gists_url: '', starred_url: '', subscriptions_url: '', organizations_url: '', repos_url: '', events_url: '', received_events_url: '', type: 'User', site_admin: false, company: null, blog: '', location: '', email: null, hireable: null, twitter_username: null, public_repos: 0, public_gists: 0, followers: 0, following: 0, created_at: '', updated_at: '',
};


describe('Hero', () => {
  const mockHandleSearchChange = jest.fn();
  const mockFetchData = jest.fn().mockResolvedValue(undefined); // Ensure it's a promise
  const mockHandleData = jest.fn(); // This is Container's handleData

  beforeEach(() => {
    mockHandleSearchChange.mockClear();
    mockFetchData.mockClear();
    mockHandleData.mockClear();
    (InputSearch as jest.Mock).mockClear();
    (Dropdown as jest.Mock).mockClear();
  });

  it('renders InputSearch', () => {
    render(
      <Hero
        handleSearchChange={mockHandleSearchChange}
        searchQuery=""
        fetchData={mockFetchData}
        results={null}
        handleData={mockHandleData}
      />
    );
    expect(InputSearch as jest.Mock).toHaveBeenCalled();
    expect(screen.getByTestId('input-search')).toBeInTheDocument();
  });

  it('does not render Dropdown initially or if isOpen is false', () => {
    render(
      <Hero
        handleSearchChange={mockHandleSearchChange}
        searchQuery="test" // searchQuery.length > 2 would have been a condition
        fetchData={mockFetchData}
        results={null}
        handleData={mockHandleData}
      />
    );
    // Dropdown is only rendered if isOpen is true. By default, isOpen is false.
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  it('renders Dropdown when InputSearch calls handleOpen', () => {
    render(
      <Hero
        handleSearchChange={mockHandleSearchChange}
        searchQuery="test"
        fetchData={mockFetchData}
        results={null}
        handleData={mockHandleData}
      />
    );
    fireEvent.click(screen.getByTestId('input-search-open')); // Simulate InputSearch opening the dropdown
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });
  
  it('passes isLoading state to Dropdown when fetchData is called from InputSearch', async () => {
    render(
      <Hero
        handleSearchChange={mockHandleSearchChange}
        searchQuery="testuser"
        fetchData={mockFetchData}
        results={null}
        handleData={mockHandleData}
      />
    );
    fireEvent.click(screen.getByTestId('input-search-open')); // Open dropdown

    // Check initial state (isLoading=false)
    expect(Dropdown as jest.Mock).toHaveBeenLastCalledWith(
      expect.objectContaining({ isLoading: false }),
      {}
    );
    
    // Simulate fetchData call from InputSearch
    // We need to ensure mockFetchData is a promise that doesn't resolve immediately
    let resolveFetch: any;
    mockFetchData.mockImplementationOnce(() => new Promise(r => resolveFetch = r));

    fireEvent.click(screen.getByTestId('input-search-fetch'));
    
    // Check if Dropdown is re-rendered with isLoading=true
    await waitFor(() => {
        expect(Dropdown as jest.Mock).toHaveBeenLastCalledWith(
            expect.objectContaining({ isLoading: true }),
            {}
        );
    });

    resolveFetch(); // Resolve the fetch promise

    // Check if Dropdown is re-rendered with isLoading=false
    await waitFor(() => {
        expect(Dropdown as jest.Mock).toHaveBeenLastCalledWith(
            expect.objectContaining({ isLoading: false }),
            {}
        );
    });
  });

  it('handleUserSelectionFromDropdown calls necessary functions and updates state', async () => {
    render(
      <Hero
        handleSearchChange={mockHandleSearchChange}
        searchQuery="initialQuery"
        fetchData={mockFetchData}
        results={mockUser} // So dropdown has an item
        handleData={mockHandleData}
      />
    );

    // Open the dropdown
    fireEvent.click(screen.getByTestId('input-search-open'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    
    // Simulate selecting a user from the dropdown
    const userButtonInDropdown = screen.getByTestId(`dropdown-user-${mockUser.login}`);
    fireEvent.click(userButtonInDropdown);

    // Check that isLoading was set to true, then false
    // This is tricky because Dropdown mock captures props at render time.
    // We expect handleSearchChange, fetchData, handleData to be called in sequence.
    
    await waitFor(() => {
      expect(mockHandleSearchChange).toHaveBeenCalledWith(mockUser.login);
    });
    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledWith(mockUser.login);
    });
    await waitFor(() => {
      expect(mockHandleData).toHaveBeenCalledTimes(1);
    });

    // Dropdown should close
    // The mock for Dropdown doesn't automatically disappear, so we check if isOpen state would lead to it not rendering
    // This test relies on the Hero component's internal state logic to set isOpen to false.
    // We can verify by checking if Dropdown is NOT called again, or if its "handleClose" prop was called (which it isn't directly in this flow)
    // A better check might be that Dropdown is no longer in the document if we can trigger a re-render that respects isOpen=false.
    // For now, we trust the sequence of calls implies correct behavior including closing.
    // If Dropdown's handleClose was called by handleUserSelectionFromDropdown, we could check that.
    // Since handleUserSelectionFromDropdown directly sets setIsOpen(false), we expect a re-render where Dropdown is not present.
    await waitFor(() => {
        expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });
  
  it('closes Dropdown when handleClose is called from Dropdown', () => {
    render(
      <Hero
        handleSearchChange={mockHandleSearchChange}
        searchQuery="test"
        fetchData={mockFetchData}
        results={mockUser} // Ensure dropdown has something to show
        handleData={mockHandleData}
      />
    );
    // Open dropdown
    fireEvent.click(screen.getByTestId('input-search-open'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    // Simulate Dropdown calling handleClose
    fireEvent.click(screen.getByTestId('dropdown-close'));
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

});
