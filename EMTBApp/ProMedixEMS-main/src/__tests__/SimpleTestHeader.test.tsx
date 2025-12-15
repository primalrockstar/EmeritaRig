import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SimpleTestHeader from '../SimpleTestHeader';

// Mock window.scrollY and addEventListener
const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();

beforeEach(() => {
  // Mock window methods
  Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  window.addEventListener = mockAddEventListener;
  window.removeEventListener = mockRemoveEventListener;

  // Reset mocks
  mockAddEventListener.mockClear();
  mockRemoveEventListener.mockClear();
});

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SimpleTestHeader', () => {
  it('renders the header with correct title', () => {
    renderWithRouter(<SimpleTestHeader />);

    expect(screen.getByText('ProMedix EMS')).toBeInTheDocument();
    expect(screen.getByText('Test Bottom Navigation')).toBeInTheDocument();
  });

  it('renders all bottom navigation items', () => {
    renderWithRouter(<SimpleTestHeader />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Modules')).toBeInTheDocument();
    expect(screen.getByText('Protocols')).toBeInTheDocument();
    expect(screen.getByText('Medications')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('shows test header message', () => {
    renderWithRouter(<SimpleTestHeader />);

    expect(screen.getByText(/HEADER \+ BOTTOM NAV TEST!/)).toBeInTheDocument();
  });

  it('displays scroll test instructions', () => {
    renderWithRouter(<SimpleTestHeader />);

    expect(screen.getByText('Scroll down to test the bottom navigation auto-hide feature!')).toBeInTheDocument();
  });

  it('adds scroll event listener on mount', () => {
    renderWithRouter(<SimpleTestHeader />);

    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
  });

  it('removes scroll event listener on unmount', () => {
    const { unmount } = renderWithRouter(<SimpleTestHeader />);

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});