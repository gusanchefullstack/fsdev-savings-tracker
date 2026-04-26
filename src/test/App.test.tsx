import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock recharts to avoid SVG rendering issues in jsdom
vi.mock('recharts', () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => null,
  XAxis: () => null,
  YAxis: () => null,
  Tooltip: () => null,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Cell: () => null,
}));

describe('App — layout and navigation', () => {
  it('renders the main landmark', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders a single h1 element', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('renders "Savings Tracker" as h1', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /savings tracker/i })).toBeInTheDocument();
  });

  it('does NOT wrap GoalsControls in a <nav>', () => {
    const { container } = render(<App />);
    // The filter/sort controls wrapper should NOT be a <nav>
    const nav = container.querySelector('nav[aria-label="Filter and sort options"]');
    expect(nav).toBeNull();
  });

  it('has live region for announcements', () => {
    render(<App />);
    expect(document.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });
});

describe('App — modal aria-hidden isolation', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('main content is NOT aria-hidden when no modal open', () => {
    const main = screen.getByRole('main');
    expect(main).not.toHaveAttribute('aria-hidden', 'true');
  });

  it('main content becomes aria-hidden when a modal opens', () => {
    fireEvent.click(screen.getByRole('button', { name: /create new savings goal/i }));
    // After modal opens, main is aria-hidden — use querySelector since aria-hidden removes it from the accessible tree
    const main = document.querySelector('main');
    expect(main).toHaveAttribute('aria-hidden', 'true');
  });

  it('main content aria-hidden is removed when modal closes', () => {
    fireEvent.click(screen.getByRole('button', { name: /create new savings goal/i }));
    fireEvent.keyDown(document, { key: 'Escape' });
    const main = document.querySelector('main');
    expect(main).not.toHaveAttribute('aria-hidden', 'true');
  });
});
