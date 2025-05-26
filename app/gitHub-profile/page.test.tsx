import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GitHubProfilePage from './page'; // Adjust path as necessary

// Mock the Container component as it handles data fetching and complex logic
jest.mock('./components/Container', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-container">Mock Container</div>),
}));

describe('GitHubProfilePage', () => {
  it('renders the Container component', () => {
    render(<GitHubProfilePage />);

    // Check if the mocked Container component is rendered
    expect(screen.getByTestId('mock-container')).toBeInTheDocument();
    expect(screen.getByText('Mock Container')).toBeInTheDocument(); // Check content of the mock
  });
});
