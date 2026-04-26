export interface Deposit {
  id: string;
  amount: number;
  note: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  deadline: string | null;
  createdAt: string;
  deposits: Deposit[];
}

export type FilterStatus = 'all' | 'in-progress' | 'completed' | 'not-started';

export type SortOption =
  | 'recently-added'
  | 'deadline'
  | 'progress'
  | 'amount-saved'
  | 'alphabetical';

export interface GoalStats {
  totalSavings: number;
  activeGoals: number;
  completedGoals: number;
}

export interface MonthlyDeposit {
  label: string;   // e.g. "Jan"
  year: number;
  month: number;   // 0-indexed
  amount: number;
}

export type ModalType =
  | 'add-goal'
  | 'edit-goal'
  | 'add-deposit'
  | 'delete-confirm'
  | null;

export interface ModalState {
  type: ModalType;
  goalId: string | null;
}
