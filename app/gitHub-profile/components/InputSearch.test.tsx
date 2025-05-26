import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputSearch from './InputSearch';

// Mock useDebounce to return the value immediately for testing
jest.mock('use-debounce', () => ({
  useDebounce: (value) => [value],
}));

describe('InputSearch', () => {
  const mockHandleSearchChange = jest.fn();
  const mockFetchData = jest.fn();
  const mockHandleOpen = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    mockHandleSearchChange.mockClear();
    mockFetchData.mockClear();
    mockHandleOpen.mockClear();
  });

  it('renders the input field with the correct placeholder', () => {
    render(
      <InputSearch
        handleSearchChange={mockHandleSearchChange}
        searchQuery=""
        fetchData={mockFetchData}
        handleOpen={mockHandleOpen}
      />
    );
    expect(screen.getByPlaceholderText('Enter GitHub username and press Enter')).toBeInTheDocument();
  });

  it('calls handleSearchChange when the input value changes', () => {
    render(
      <InputSearch
        handleSearchChange={mockHandleSearchChange}
        searchQuery=""
        fetchData={mockFetchData}
        handleOpen={mockHandleOpen}
      />
    );
    const inputElement = screen.getByRole('searchbox'); // type="search" makes it a searchbox
    fireEvent.change(inputElement, { target: { value: 'testuser' } });
    expect(mockHandleSearchChange).toHaveBeenCalledWith('testuser');
  });

  it('calls fetchData and handleOpen on "Enter" key press with non-empty query', () => {
    const searchQuery = 'testuser';
    render(
      <InputSearch
        handleSearchChange={mockHandleSearchChange}
        searchQuery={searchQuery}
        fetchData={mockFetchData}
        handleOpen={mockHandleOpen}
      />
    );
    const inputElement = screen.getByRole('searchbox');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockFetchData).toHaveBeenCalledWith(searchQuery);
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });

  it('does not call fetchData or handleOpen on "Enter" key press if query is empty or only whitespace', () => {
    render(
      <InputSearch
        handleSearchChange={mockHandleSearchChange}
        searchQuery="   " // Whitespace query
        fetchData={mockFetchData}
        handleOpen={mockHandleOpen}
      />
    );
    const inputElement = screen.getByRole('searchbox');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(mockFetchData).not.toHaveBeenCalled();
    expect(mockHandleOpen).not.toHaveBeenCalled();
  });
  
  it('calls fetchData and handleOpen via useEffect (debounced effect) when searchQuery changes and is valid', async () => {
    // This test relies on the mock of useDebounce which immediately returns the value.
    // The useEffect in InputSearch then calls fetchData.
    const { rerender } = render(
      <InputSearch
        handleSearchChange={mockHandleSearchChange}
        searchQuery="" // Initial empty query
        fetchData={mockFetchData}
        handleOpen={mockHandleOpen}
      />
    );

    // Expect nothing to happen initially with empty query
    expect(mockFetchData).not.toHaveBeenCalled();
    expect(mockHandleOpen).not.toHaveBeenCalled();

    // Change the search query
    rerender(
        <InputSearch
            handleSearchChange={mockHandleSearchChange}
            searchQuery="testuser" // New valid query
            fetchData={mockFetchData}
            handleOpen={mockHandleOpen}
        />
    );
    
    // Due to the mocked debounce, useEffect should trigger fetchData almost immediately
    // Wait for potential async updates within useEffect related to fetchData
    // For simple cases, direct check might work if no internal promises in useEffect path
    // For more complex useEffects, waitFor might be needed
    await screen.findByRole('searchbox'); // ensure component has re-rendered and effects could run

    expect(mockFetchData).toHaveBeenCalledWith("testuser");
    expect(mockHandleOpen).toHaveBeenCalledTimes(1);
  });

  it('SVG icon has aria-hidden="true"', () => {
    render(
      <InputSearch
        handleSearchChange={mockHandleSearchChange}
        searchQuery=""
        fetchData={mockFetchData}
        handleOpen={mockHandleOpen}
      />
    );
    // The SVG is inside a span that also has aria-hidden="true"
    const spanElement = screen.getByRole('searchbox').previousElementSibling; // The span wrapping SVG
    expect(spanElement).toHaveAttribute('aria-hidden', 'true');
    const svgElement = spanElement.querySelector('svg');
    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
  });
});
