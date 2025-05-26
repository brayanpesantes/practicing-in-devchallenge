import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownItem from './DropdownItem';
import { UserData } from './Container'; // Adjust path as necessary

describe('DropdownItem', () => {
  const mockUser: UserData = {
    login: 'testuser',
    id: 1,
    avatar_url: 'http://example.com/avatar.png',
    name: 'Test User',
    bio: 'This is a test bio for the user.',
    // Add other UserData fields if they are used or required by the type
    node_id: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: 'User',
    site_admin: false,
    company: null,
    blog: '',
    location: '',
    email: null,
    hireable: null,
    twitter_username: null,
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: '',
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders user information correctly', () => {
    render(<DropdownItem user={mockUser} isFocused={false} onClick={mockOnClick} />);

    expect(screen.getByText(mockUser.name!)).toBeInTheDocument();
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByText(mockUser.bio!)).toBeInTheDocument(); // Full bio, truncation is visual
    expect(screen.getByAltText(`${mockUser.login}'s avatar`)).toHaveAttribute('src', mockUser.avatar_url);
  });

  it('truncates long bios correctly in the displayed text', () => {
    const longBioUser = { ...mockUser, bio: 'This is a very long bio that definitely exceeds the sixty character limit and should be truncated by the component for display purposes.' };
    render(<DropdownItem user={longBioUser} isFocused={false} onClick={mockOnClick} />);
    
    const expectedTruncatedBio = longBioUser.bio.substring(0, 57) + "...";
    expect(screen.getByText(expectedTruncatedBio)).toBeInTheDocument();
  });
  
  it('displays "No bio available." if bio is null or empty', () => {
    const noBioUser = { ...mockUser, bio: null as any }; // Test with null bio
    render(<DropdownItem user={noBioUser} isFocused={false} onClick={mockOnClick} />);
    expect(screen.getByText('No bio available.')).toBeInTheDocument();

    const emptyBioUser = { ...mockUser, bio: '' }; // Test with empty bio
    render(<DropdownItem user={emptyBioUser} isFocused={false} onClick={mockOnClick} />);
    expect(screen.getByText('No bio available.')).toBeInTheDocument();
  });


  it('calls onClick when the button is clicked', () => {
    render(<DropdownItem user={mockUser} isFocused={false} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies focused styles when isFocused is true', () => {
    render(<DropdownItem user={mockUser} isFocused={true} onClick={mockOnClick} />);
    // The class check can be brittle. A more robust way is to check computed styles if possible,
    // or rely on aria-selected and visual regression tests.
    // For this example, we check for a class that indicates focus.
    // Ensure this class ('bg-slate-700' or 'dark:bg-slate-600') is unique enough to indicate focus.
    expect(screen.getByRole('button')).toHaveClass('bg-slate-700'); // or dark:bg-slate-600 depending on theme
    expect(screen.getByRole('listitem')).toHaveAttribute('aria-selected', 'true');
  });

  it('does not apply focused styles when isFocused is false', () => {
    render(<DropdownItem user={mockUser} isFocused={false} onClick={mockOnClick} />);
    expect(screen.getByRole('button')).not.toHaveClass('bg-slate-700');
    expect(screen.getByRole('listitem')).toHaveAttribute('aria-selected', 'false');
  });
  
  it('scrolls into view when focused', () => {
    const mockScrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

    render(<DropdownItem user={mockUser} isFocused={true} onClick={mockOnClick} />);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ block: "nearest" });

    // Clean up mock
    delete (window.HTMLElement.prototype as any).scrollIntoView;
  });
});
