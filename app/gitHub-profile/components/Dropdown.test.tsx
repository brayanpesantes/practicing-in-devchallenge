import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';
import { UserData } from './Container'; // Adjust path as necessary

// Mock DropdownItem to simplify testing of Dropdown itself
// We'll check if DropdownItem is rendered with correct props rather than its internal behavior here
jest.mock('./DropdownItem', () => ({
  __esModule: true,
  default: jest.fn(({ user, isFocused, onClick }) => (
    <li role="option" aria-selected={isFocused} data-testid={`user-${user.login}`} onClick={onClick}>
      <button>{user.name || user.login}</button>
      <span>{isFocused ? 'Focused' : 'Not Focused'}</span>
    </li>
  )),
}));


const mockUser1: UserData = {
  login: 'user1', id: 1, name: 'User One', avatar_url: '', bio: 'Bio 1', 
  // Fill other required fields for UserData
  node_id: '', gravatar_id: '', url: '', html_url: '', followers_url: '', following_url: '', gists_url: '', starred_url: '', subscriptions_url: '', organizations_url: '', repos_url: '', events_url: '', received_events_url: '', type: 'User', site_admin: false, company: null, blog: '', location: '', email: null, hireable: null, twitter_username: null, public_repos: 0, public_gists: 0, followers: 0, following: 0, created_at: '', updated_at: '',
};
const mockUser2: UserData = {
  login: 'user2', id: 2, name: 'User Two', avatar_url: '', bio: 'Bio 2',
  // Fill other required fields
  node_id: '', gravatar_id: '', url: '', html_url: '', followers_url: '', following_url: '', gists_url: '', starred_url: '', subscriptions_url: '', organizations_url: '', repos_url: '', events_url: '', received_events_url: '', type: 'User', site_admin: false, company: null, blog: '', location: '', email: null, hireable: null, twitter_username: null, public_repos: 0, public_gists: 0, followers: 0, following: 0, created_at: '', updated_at: '',
};
const mockResultsArray: UserData[] = [mockUser1, mockUser2];

describe('Dropdown', () => {
  const mockHandleData = jest.fn();
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    mockHandleData.mockClear();
    mockHandleClose.mockClear();
    (DropdownItem as jest.Mock).mockClear(); // Clear mock component calls
  });

  it('renders "Loading..." when isLoading is true', () => {
    render(
      <Dropdown results={null} isLoading={true} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "User not found." when results has a "Not Found" message', () => {
    render(
      <Dropdown results={{ message: 'Not Found' }} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(screen.getByText('User not found.')).toBeInTheDocument();
  });
  
  it('renders a custom message when results has a generic message', () => {
    render(
      <Dropdown results={{ message: 'API rate limit exceeded' }} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(screen.getByText('API rate limit exceeded')).toBeInTheDocument();
  });

  it('renders "No results found." when results is null and not loading', () => {
    render(
      <Dropdown results={null} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders "No results found." when results is an empty array', () => {
    render(
      <Dropdown results={[]} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders items correctly for a single user result', () => {
    render(
      <Dropdown results={mockUser1} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(DropdownItem as jest.Mock).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId(`user-${mockUser1.login}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser1.name!)).toBeInTheDocument();
  });

  it('renders items correctly for multiple user results', () => {
    render(
      <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    expect(DropdownItem as jest.Mock).toHaveBeenCalledTimes(mockResultsArray.length);
    expect(screen.getByTestId(`user-${mockUser1.login}`)).toBeInTheDocument();
    expect(screen.getByTestId(`user-${mockUser2.login}`)).toBeInTheDocument();
  });
  
  describe('Keyboard Navigation', () => {
    it('closes on "Escape" key press', () => {
      render(
        <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    it('navigates down with "ArrowDown" key', async () => {
      render(
        <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
      );
      const listElement = screen.getByRole('listbox');
      listElement.focus(); // Focus the listbox itself to receive keydown events

      fireEvent.keyDown(document, { key: 'ArrowDown' });
      await waitFor(() => { // Wait for state update and re-render
        // Check if DropdownItem was called with isFocused=true for the first item
        expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser1.id)[0].isFocused).toBe(true);
      });

      fireEvent.keyDown(document, { key: 'ArrowDown' });
      await waitFor(() => {
        expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser2.id)[0].isFocused).toBe(true);
        expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser1.id)[0].isFocused).toBe(false); // Previous one is no longer focused
      });
       // Wraps around
      fireEvent.keyDown(document, { key: 'ArrowDown' });
      await waitFor(() => {
        expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser1.id)[0].isFocused).toBe(true);
      });
    });
    
    it('navigates up with "ArrowUp" key', async () => {
      render(
        <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
      );
      const listElement = screen.getByRole('listbox');
      listElement.focus();

      // ArrowDown to the first item (index 0)
      fireEvent.keyDown(document, { key: 'ArrowDown' }); 
      await waitFor(() => {
         expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser1.id)[0].isFocused).toBe(true);
      });
      
      // ArrowUp should wrap to the last item (index 1)
      fireEvent.keyDown(document, { key: 'ArrowUp' });
      await waitFor(() => {
        expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser2.id)[0].isFocused).toBe(true);
      });

      // ArrowUp to the first item (index 0)
      fireEvent.keyDown(document, { key: 'ArrowUp' });
      await waitFor(() => {
        expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser1.id)[0].isFocused).toBe(true);
      });
    });

    it('calls handleData and handleClose on "Enter" key press for focused item', async () => {
      render(
        <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
      );
      const listElement = screen.getByRole('listbox');
      listElement.focus();

      // Focus the first item
      fireEvent.keyDown(document, { key: 'ArrowDown' });
      await waitFor(() => {
         expect((DropdownItem as jest.Mock).mock.calls.find(call => call[0].user.id === mockUser1.id)[0].isFocused).toBe(true);
      });
      
      // Press Enter
      fireEvent.keyDown(document, { key: 'Enter' });
      expect(mockHandleData).toHaveBeenCalledWith(mockUser1);
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });

    it('does nothing on "Enter" if no item is focused', () => {
       render(
        <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
      );
      const listElement = screen.getByRole('listbox');
      listElement.focus(); // Ensure listbox has focus but no item is selected by default based on focusedIndex = -1

      fireEvent.keyDown(document, { key: 'Enter' });
      expect(mockHandleData).not.toHaveBeenCalled();
      expect(mockHandleClose).not.toHaveBeenCalled(); // Escape would close, but Enter shouldn't
    });
  });
  
  it('resets focusedIndex when results change', () => {
    const { rerender } = render(
      <Dropdown results={mockResultsArray} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    const listElement = screen.getByRole('listbox');
    listElement.focus();

    fireEvent.keyDown(document, { key: 'ArrowDown' }); // Focus user1
    // Check that DropdownItem for user1 is called with isFocused=true
    // This requires inspecting the mock calls after the event.
    // This detail is covered in specific keyboard navigation tests.

    // Rerender with different results
    const newMockUser: UserData = { ...mockUser1, id: 3, login: 'user3' };
    rerender(
      <Dropdown results={[newMockUser]} isLoading={false} handleData={mockHandleData} handleClose={mockHandleClose} />
    );
    
    // After rerender with new results, try pressing Enter.
    // If focusedIndex was reset to -1, handleData should not be called.
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(mockHandleData).not.toHaveBeenCalledWith(mockUser1); // Make sure it wasn't called with the old focused item
    expect(mockHandleData).not.toHaveBeenCalledWith(newMockUser); // And not with the new one either if focus was reset
  });
});
