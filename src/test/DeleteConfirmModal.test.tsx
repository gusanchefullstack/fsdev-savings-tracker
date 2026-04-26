import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeleteConfirmModal } from '../components/Modals/DeleteConfirmModal';

describe('DeleteConfirmModal', () => {
  it('renders the goal name in the warning', () => {
    render(<DeleteConfirmModal goalName="MacBook Pro" onConfirm={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByText(/MacBook Pro/)).toBeInTheDocument();
  });

  it('calls onConfirm when Delete goal button clicked', () => {
    const onConfirm = vi.fn();
    render(<DeleteConfirmModal goalName="Goal" onConfirm={onConfirm} onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /delete goal/i }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('calls onClose when Cancel button clicked', () => {
    const onClose = vi.fn();
    render(<DeleteConfirmModal goalName="Goal" onConfirm={vi.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders inside a dialog', () => {
    render(<DeleteConfirmModal goalName="Goal" onConfirm={vi.fn()} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
