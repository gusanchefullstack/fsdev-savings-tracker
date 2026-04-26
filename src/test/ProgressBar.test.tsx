import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ProgressBar } from '../components/UI/ProgressBar';

describe('ProgressBar', () => {
  it('renders a native progress element', () => {
    render(<ProgressBar percentage={50} />);
    expect(document.querySelector('progress')).toBeInTheDocument();
  });

  it('sets value to clamped percentage', () => {
    render(<ProgressBar percentage={75} />);
    expect(document.querySelector('progress')).toHaveAttribute('value', '75');
  });

  it('sets max to 100', () => {
    render(<ProgressBar percentage={50} />);
    expect(document.querySelector('progress')).toHaveAttribute('max', '100');
  });

  it('has accessible label with percentage', () => {
    render(<ProgressBar percentage={60} />);
    expect(document.querySelector('progress')).toHaveAttribute('aria-label', '60% saved');
  });

  it('clamps percentage below 0 to 0', () => {
    render(<ProgressBar percentage={-10} />);
    expect(document.querySelector('progress')).toHaveAttribute('value', '0');
  });

  it('clamps percentage above 100 to 100', () => {
    render(<ProgressBar percentage={150} />);
    expect(document.querySelector('progress')).toHaveAttribute('value', '100');
  });

  it('applies orange variant class by default', () => {
    const { container } = render(<ProgressBar percentage={50} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/orange/);
  });

  it('applies green variant class when specified', () => {
    const { container } = render(<ProgressBar percentage={100} variant="green" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/green/);
  });

  it('applies dark variant class when specified', () => {
    const { container } = render(<ProgressBar percentage={40} variant="dark" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/dark/);
  });
});
