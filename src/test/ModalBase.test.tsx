import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalBase } from '../components/Modals/ModalBase';

describe('ModalBase', () => {
  it('renders the title', () => {
    render(<ModalBase title="Test modal" onClose={() => {}}><p>content</p></ModalBase>);
    expect(screen.getByText('Test modal')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<ModalBase title="Modal" onClose={() => {}}><p>Child content</p></ModalBase>);
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('has role="dialog"', () => {
    render(<ModalBase title="Modal" onClose={() => {}}><p>x</p></ModalBase>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<ModalBase title="Modal" onClose={() => {}}><p>x</p></ModalBase>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('labels dialog with the title via aria-labelledby', () => {
    render(<ModalBase title="My Dialog" onClose={() => {}}><p>x</p></ModalBase>);
    const dialog = screen.getByRole('dialog');
    const titleEl = screen.getByText('My Dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', titleEl.id);
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<ModalBase title="Modal" onClose={onClose}><p>x</p></ModalBase>);
    fireEvent.click(screen.getByRole('button', { name: /close dialog/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when clicking the overlay backdrop', () => {
    const onClose = vi.fn();
    render(<ModalBase title="Modal" onClose={onClose}><p>x</p></ModalBase>);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does NOT call onClose when clicking inside the panel', () => {
    const onClose = vi.fn();
    render(<ModalBase title="Modal" onClose={onClose}><p>inner</p></ModalBase>);
    fireEvent.click(screen.getByText('inner'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<ModalBase title="Modal" onClose={onClose}><p>x</p></ModalBase>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
