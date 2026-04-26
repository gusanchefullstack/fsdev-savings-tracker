import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoalsControls } from '../components/Goals/GoalsControls';

describe('GoalsControls', () => {
  const defaultProps = {
    filter: 'all' as const,
    sort: 'recently-added' as const,
    onFilterChange: vi.fn(),
    onSortChange: vi.fn(),
  };

  it('renders Filters button', () => {
    render(<GoalsControls {...defaultProps} />);
    expect(screen.getByRole('button', { name: /filters/i })).toBeInTheDocument();
  });

  it('renders Sort by button', () => {
    render(<GoalsControls {...defaultProps} />);
    expect(screen.getByRole('button', { name: /sort by/i })).toBeInTheDocument();
  });

  it('opens filter dropdown on click', () => {
    render(<GoalsControls {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /filters/i }));
    expect(screen.getByText('All goals')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Not started')).toBeInTheDocument();
  });

  it('opens sort dropdown on click', () => {
    render(<GoalsControls {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /sort by/i }));
    expect(screen.getByText('Recently added')).toBeInTheDocument();
    expect(screen.getByText('Deadline')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter option is selected', () => {
    const onFilterChange = vi.fn();
    render(<GoalsControls {...defaultProps} onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByRole('button', { name: /filters/i }));
    fireEvent.click(screen.getByText('Completed'));
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('calls onSortChange when a sort option is selected', () => {
    const onSortChange = vi.fn();
    render(<GoalsControls {...defaultProps} onSortChange={onSortChange} />);
    fireEvent.click(screen.getByRole('button', { name: /sort by/i }));
    fireEvent.click(screen.getByText('Deadline'));
    expect(onSortChange).toHaveBeenCalledWith('deadline');
  });

  it('wraps controls in a group element with aria-label', () => {
    const { container } = render(<GoalsControls {...defaultProps} />);
    const group = container.querySelector('[role="group"]');
    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('aria-label', 'Filter and sort goals');
  });

  it('does NOT use a <nav> element', () => {
    const { container } = render(<GoalsControls {...defaultProps} />);
    expect(container.querySelector('nav')).toBeNull();
  });
});
