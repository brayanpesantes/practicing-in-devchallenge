import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileHeader from './MobileHeader'; // Adjust path as necessary
import { links } from './Header'; // Assuming links are exported from Header.tsx

// Mock child components like LinkNavigation and SwitchDarkMode if they have complex logic
// or if we want to isolate testing to MobileHeader itself.
// For this example, we'll let them render but focus on MobileHeader's behavior.

jest.mock('./LinkNavigation', () => ({
  __esModule: true,
  default: jest.fn(({ label, href, onClick, className }) => (
    <a href={href} onClick={onClick} className={className} data-testid={`link-${label}`}>
      {label}
    </a>
  )),
}));

jest.mock('./SwitchDarkMode', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="switch-dark-mode">Switch Dark Mode</div>),
}));


describe('MobileHeader', () => {
  const mockToggle = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    mockToggle.mockClear();
    mockClose.mockClear();
    (LinkNavigation as jest.Mock).mockClear();
  });

  it('is not visible when isOpen is false', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={false} close={mockClose} />);
    // The component uses translate-x-full and opacity-0.
    // Checking for exact classes can be brittle.
    // A common approach is to check for visibility if possible, or presence/absence of key elements.
    // Since it's always in the DOM, we check a class that controls visibility.
    const mobileHeaderDiv = screen.getByRole('navigation').parentElement; // The main div
    expect(mobileHeaderDiv).toHaveClass('translate-x-full', 'opacity-0');
  });

  it('is visible when isOpen is true', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={true} close={mockClose} />);
    const mobileHeaderDiv = screen.getByRole('navigation').parentElement;
    expect(mobileHeaderDiv).toHaveClass('translate-x-0', 'opacity-100');
    expect(screen.getByText('Menu')).toBeInTheDocument(); // Title should be visible
  });

  it('calls close when the close button is clicked', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={true} close={mockClose} />);
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it('renders all navigation links', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={true} close={mockClose} />);
    links.forEach(link => {
      expect(screen.getByTestId(`link-${link.label}`)).toBeInTheDocument();
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });
  });

  it('calls close when a navigation link is clicked', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={true} close={mockClose} />);
    // Click the first navigation link
    const firstLinkLabel = links[0].label;
    fireEvent.click(screen.getByTestId(`link-${firstLinkLabel}`));
    
    // The LinkNavigation mock should have its onClick prop called, which in MobileHeader is `close`
    // This relies on the mock correctly passing through the onClick prop.
    // The test for LinkNavigation itself would verify that its onClick prop is correctly handled.
    // Here, we check if `close` was called by MobileHeader when the LinkNavigation's onClick is triggered.
    // The mock for LinkNavigation is: onClick={onClick} where onClick is the prop passed by MobileHeader.
    // In MobileHeader, this prop is `close`. So, this should work.
    expect(mockClose).toHaveBeenCalledTimes(1);
  });
  
  it('renders the SwitchDarkMode component', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={true} close={mockClose} />);
    expect(screen.getByTestId('switch-dark-mode')).toBeInTheDocument();
  });

  it('has correct aria attributes and roles', () => {
    render(<MobileHeader mode={false} toggle={mockToggle} isOpen={true} close={mockClose} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // The nav element
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

});
