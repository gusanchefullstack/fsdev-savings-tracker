const SEED_LATEST_YEAR = 2026;
const SEED_LATEST_MONTH = 2; // March (0-indexed)

function getMonthOffset(): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  return (currentYear - SEED_LATEST_YEAR) * 12 + (currentMonth - SEED_LATEST_MONTH);
}

export function shiftIsoDate(isoString: string, monthOffset: number): string {
  const date = new Date(isoString);
  date.setMonth(date.getMonth() + monthOffset);
  return date.toISOString();
}

export function shiftDeadline(dateString: string, monthOffset: number): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setMonth(date.getMonth() + monthOffset);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const MONTH_OFFSET = getMonthOffset();

export function formatDeadline(dateString: string | null): string {
  if (!dateString) return 'No deadline';
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return `Due ${day} ${date.toLocaleString('default', { month: 'short' })} ${year}`;
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getMonthKey(isoString: string): string {
  const date = new Date(isoString);
  return `${date.getFullYear()}-${date.getMonth()}`;
}

export function getMonthLabel(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('default', { month: 'short' });
}

export function getYear(isoString: string): number {
  return new Date(isoString).getFullYear();
}

export function getMonth(isoString: string): number {
  return new Date(isoString).getMonth();
}

export function isOverdue(deadline: string | null): boolean {
  if (!deadline) return false;
  const [y, m, d] = deadline.split('-').map(Number);
  return new Date(y, m - 1, d) < new Date();
}
