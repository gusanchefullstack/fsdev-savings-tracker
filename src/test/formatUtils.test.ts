import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatProgress,
  getTotalSaved,
  getGoalStatus,
  generateId,
} from '../utils/formatUtils';

describe('formatCurrency', () => {
  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
  it('formats whole dollar amount', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });
  it('formats amount with cents', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });
  it('formats large amount', () => {
    expect(formatCurrency(11249)).toBe('$11,249.00');
  });
});

describe('formatProgress', () => {
  it('returns 0 when target is 0', () => {
    expect(formatProgress(0, 0)).toBe(0);
  });
  it('returns 0 when nothing saved', () => {
    expect(formatProgress(0, 1000)).toBe(0);
  });
  it('returns 50 at half saved', () => {
    expect(formatProgress(500, 1000)).toBe(50);
  });
  it('returns 100 when fully saved', () => {
    expect(formatProgress(1000, 1000)).toBe(100);
  });
  it('caps at 100 when over target', () => {
    expect(formatProgress(1200, 1000)).toBe(100);
  });
  it('rounds to nearest integer', () => {
    expect(formatProgress(1, 3)).toBe(33);
  });
});

describe('getTotalSaved', () => {
  it('returns 0 for empty deposits', () => {
    expect(getTotalSaved([])).toBe(0);
  });
  it('sums single deposit', () => {
    expect(getTotalSaved([{ amount: 500 }])).toBe(500);
  });
  it('sums multiple deposits', () => {
    expect(getTotalSaved([{ amount: 100 }, { amount: 200 }, { amount: 50 }])).toBe(350);
  });
  it('handles decimal amounts', () => {
    expect(getTotalSaved([{ amount: 10.5 }, { amount: 20.75 }])).toBeCloseTo(31.25);
  });
});

describe('getGoalStatus', () => {
  it('returns not-started when nothing saved', () => {
    expect(getGoalStatus(0, 1000)).toBe('not-started');
  });
  it('returns in-progress when partially saved', () => {
    expect(getGoalStatus(500, 1000)).toBe('in-progress');
  });
  it('returns completed when target met', () => {
    expect(getGoalStatus(1000, 1000)).toBe('completed');
  });
  it('returns completed when over target', () => {
    expect(getGoalStatus(1500, 1000)).toBe('completed');
  });
});

describe('generateId', () => {
  it('starts with given prefix', () => {
    expect(generateId('goal')).toMatch(/^goal-/);
    expect(generateId('dep')).toMatch(/^dep-/);
  });
  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 20 }, () => generateId('test')));
    expect(ids.size).toBe(20);
  });
});
