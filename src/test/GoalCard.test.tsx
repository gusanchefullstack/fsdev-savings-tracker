import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoalCard } from '../components/Goals/GoalCard';
import type { Goal } from '../types';

const baseGoal: Goal = {
  id: 'goal-1',
  name: 'Test Goal',
  target: 1000,
  deadline: '2099-12-31',
  createdAt: '2025-01-01T00:00:00.000Z',
  deposits: [{ id: 'dep-1', amount: 500, note: 'test', createdAt: '2025-01-01T00:00:00.000Z' }],
};

const completedGoal: Goal = {
  ...baseGoal,
  id: 'goal-2',
  name: 'Completed Goal',
  deposits: [{ id: 'dep-1', amount: 1000, note: '', createdAt: '2025-01-01T00:00:00.000Z' }],
};

const emptyGoal: Goal = {
  ...baseGoal,
  id: 'goal-3',
  name: 'Empty Goal',
  deposits: [],
};

describe('GoalCard', () => {
  it('renders the goal name', () => {
    render(<GoalCard goal={baseGoal} onClick={vi.fn()} />);
    expect(screen.getByText('Test Goal')).toBeInTheDocument();
  });

  it('renders percentage', () => {
    render(<GoalCard goal={baseGoal} onClick={vi.fn()} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(<GoalCard goal={baseGoal} onClick={vi.fn()} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('calls onClick with goal id when clicked', () => {
    const onClick = vi.fn();
    render(<GoalCard goal={baseGoal} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledWith('goal-1');
  });

  it('has accessible label on button', () => {
    render(<GoalCard goal={baseGoal} onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', expect.stringContaining('Test Goal'));
  });

  it('shows COMPLETE badge when goal is completed', () => {
    render(<GoalCard goal={completedGoal} onClick={vi.fn()} />);
    expect(screen.getByText('COMPLETE')).toBeInTheDocument();
  });

  it('does not show COMPLETE badge for in-progress goal', () => {
    render(<GoalCard goal={baseGoal} onClick={vi.fn()} />);
    expect(screen.queryByText('COMPLETE')).toBeNull();
  });

  it('shows 0% for goal with no deposits', () => {
    render(<GoalCard goal={emptyGoal} onClick={vi.fn()} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('does not contain block-level div/p/heading elements inside button', () => {
    const { container } = render(<GoalCard goal={baseGoal} onClick={vi.fn()} />);
    const btn = container.querySelector('button');
    // div and p are invalid inside button; spans are valid
    expect(btn?.querySelector('div')).toBeNull();
    expect(btn?.querySelector('p')).toBeNull();
    expect(btn?.querySelector('h1,h2,h3,h4,h5,h6')).toBeNull();
  });
});
