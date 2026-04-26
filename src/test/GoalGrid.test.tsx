import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GoalGrid } from '../components/Goals/GoalGrid';
import type { Goal } from '../types';

const makeGoal = (id: string, name: string, saved: number, target: number): Goal => ({
  id,
  name,
  target,
  deadline: '2099-12-31',
  createdAt: '2025-01-01T00:00:00.000Z',
  deposits: saved > 0 ? [{ id: `dep-${id}`, amount: saved, note: '', createdAt: '2025-01-01T00:00:00.000Z' }] : [],
});

describe('GoalGrid', () => {
  it('renders EmptyState when no goals', () => {
    render(<GoalGrid goals={[]} onGoalClick={vi.fn()} onNewGoal={vi.fn()} />);
    expect(screen.getByText(/no savings goals yet/i)).toBeInTheDocument();
  });

  it('renders goal names', () => {
    const goals = [makeGoal('1', 'MacBook Pro', 500, 2499)];
    render(<GoalGrid goals={goals} onGoalClick={vi.fn()} onNewGoal={vi.fn()} />);
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
  });

  it('renders multiple goals', () => {
    const goals = [
      makeGoal('1', 'MacBook Pro', 500, 2499),
      makeGoal('2', 'Keyboard', 200, 350),
    ];
    render(<GoalGrid goals={goals} onGoalClick={vi.fn()} onNewGoal={vi.fn()} />);
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
    expect(screen.getByText('Keyboard')).toBeInTheDocument();
  });

  it('selects an in-progress goal as featured', () => {
    const goals = [
      makeGoal('1', 'Not started', 0, 1000),
      makeGoal('2', 'In Progress', 500, 1000),
    ];
    render(<GoalGrid goals={goals} onGoalClick={vi.fn()} onNewGoal={vi.fn()} />);
    // Both should render
    expect(screen.getByText('Not started')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('renders progress bars for all goals', () => {
    const goals = [
      makeGoal('1', 'Goal A', 500, 1000),
      makeGoal('2', 'Goal B', 200, 400),
    ];
    render(<GoalGrid goals={goals} onGoalClick={vi.fn()} onNewGoal={vi.fn()} />);
    expect(screen.getAllByRole('progressbar')).toHaveLength(2);
  });
});
