export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatProgress(saved: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(Math.round((saved / target) * 100), 100);
}

export function getTotalSaved(deposits: { amount: number }[]): number {
  return deposits.reduce((sum, d) => sum + d.amount, 0);
}

export function getGoalStatus(saved: number, target: number): 'completed' | 'in-progress' | 'not-started' {
  if (saved >= target) return 'completed';
  if (saved > 0) return 'in-progress';
  return 'not-started';
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
