import { describe, it, expect } from 'vitest';
import { formatDeadline, formatDate, isOverdue, shiftDeadline } from '../utils/dateUtils';

describe('formatDeadline', () => {
  it('returns "No deadline" for null', () => {
    expect(formatDeadline(null)).toBe('No deadline');
  });
  it('formats a valid date string', () => {
    expect(formatDeadline('2026-06-01')).toBe('Due 1 Jun 2026');
  });
  it('formats end of year date', () => {
    expect(formatDeadline('2026-12-31')).toBe('Due 31 Dec 2026');
  });
});

describe('formatDate', () => {
  it('formats an ISO string to readable date', () => {
    const result = formatDate('2025-11-15T09:00:00.000Z');
    expect(result).toMatch(/Nov/);
    expect(result).toMatch(/2025/);
  });
});

describe('isOverdue', () => {
  it('returns false for null deadline', () => {
    expect(isOverdue(null)).toBe(false);
  });
  it('returns true for past deadline', () => {
    expect(isOverdue('2020-01-01')).toBe(true);
  });
  it('returns false for future deadline', () => {
    expect(isOverdue('2099-01-01')).toBe(false);
  });
});

describe('shiftDeadline', () => {
  it('shifts date forward by months', () => {
    expect(shiftDeadline('2026-01-15', 3)).toBe('2026-04-15');
  });
  it('shifts date backward by months', () => {
    expect(shiftDeadline('2026-06-01', -3)).toBe('2026-03-01');
  });
  it('handles year boundary', () => {
    expect(shiftDeadline('2026-11-01', 3)).toBe('2027-02-01');
  });
  it('returns same date for zero offset', () => {
    expect(shiftDeadline('2026-05-15', 0)).toBe('2026-05-15');
  });
});
