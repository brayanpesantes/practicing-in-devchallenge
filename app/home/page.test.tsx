import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './page'; // Adjust path as necessary

// Mock child components that might have complex logic or side effects not relevant to this test
jest.mock('./_components/Header', () => ({
  __esModule: true,
  default: jest.fn(() => <header data-testid="mock-header">Mock Header</header>),
}));

jest.mock('../testimonial/_components/ItemList', () => ({
  __esModule: true,
  ItemList: jest.fn(({ text }) => <li data-testid={`item-${text}`}>{text}</li>),
}));

// Mock next/image if not already globally mocked in jest.setup.js
// (It is globally mocked in the provided setup, so this is redundant but shown for completeness if needed)
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props) => {
//     // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
//     return <img {...props} />;
//   },
// }));

describe('HomePage', () => {
  it('renders the main heading and key sections', () => {
    render(<HomePage />);

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /Actions for Accessibility in Design/i })).toBeInTheDocument();

    // Check for the sub-headline
    expect(screen.getByText(/😎 Simple way to communicate/i)).toBeInTheDocument();

    // Check for the introductory paragraph
    expect(screen.getByText(/The fastest way to build and deploy websites with resusable components./i)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get Live Demo/i })).toBeInTheDocument();

    // Check if the mocked Header is rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    
    // Check if ItemList items are rendered (using the mock)
    expect(screen.getByTestId('item-No credit card required')).toBeInTheDocument();
    expect(screen.getByTestId('item-Free 14-day trial')).toBeInTheDocument();

    // Check for the hero image (alt text)
    // The Image component is mocked to an img tag.
    expect(screen.getByAltText('image hero')).toBeInTheDocument();
  });

  it('toggles dark mode (conceptual check as state is internal)', () => {
    // This test is more about ensuring the structure for dark mode is present.
    // Actual dark mode toggling involves class changes on the body or html,
    // which can be tested, but here we focus on the component rendering.
    // The Header mock would receive the 'mode' and 'toggle' props.
    render(<HomePage />);
    
    // The root div of HomePage will have 'dark' class if isDarkMode is true.
    // We can't directly toggle state here without interacting with a button (likely in Header).
    // However, we can check initial state if relevant.
    // For now, this is a conceptual placeholder that actual interaction tests (e.g. via Header button) would cover.
    const mainDiv = screen.getByRole('heading', { name: /Actions for Accessibility in Design/i }).closest('div.dark\\:bg-\\[#111729\\]');
    expect(mainDiv).toBeInTheDocument(); 
    // Further testing of dark mode toggling would require simulating clicks on the SwitchDarkMode component,
    // which is part of the Header. This would be an integration test or a more detailed Header unit test.
  });
});
