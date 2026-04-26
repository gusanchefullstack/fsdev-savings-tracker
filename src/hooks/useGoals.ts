import { useMemo } from 'react';
import type { Goal, Deposit, FilterStatus, SortOption, GoalStats, MonthlyDeposit } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { initialGoals } from '../data/initialData';
import { getTotalSaved, getGoalStatus, generateId, formatProgress } from '../utils/formatUtils';
import { getMonthKey, getMonthLabel, getYear, getMonth } from '../utils/dateUtils';

const STORAGE_KEY = 'savings-tracker-goals';

export function useGoals() {
  const [goals, setGoals] = useLocalStorage<Goal[]>(STORAGE_KEY, initialGoals);

  /* ── Stats ── */
  const stats: GoalStats = useMemo(() => {
    let totalSavings = 0;
    let activeGoals = 0;
    let completedGoals = 0;
    for (const goal of goals) {
      const saved = getTotalSaved(goal.deposits);
      totalSavings += saved;
      const status = getGoalStatus(saved, goal.target);
      if (status === 'completed') completedGoals++;
      else if (status === 'in-progress') activeGoals++;
    }
    return { totalSavings, activeGoals, completedGoals };
  }, [goals]);

  /* ── Monthly deposits aggregation ── */
  const monthlyDeposits: MonthlyDeposit[] = useMemo(() => {
    const map = new Map<string, MonthlyDeposit>();
    for (const goal of goals) {
      for (const dep of goal.deposits) {
        const key = getMonthKey(dep.createdAt);
        if (!map.has(key)) {
          map.set(key, {
            label: getMonthLabel(dep.createdAt),
            year: getYear(dep.createdAt),
            month: getMonth(dep.createdAt),
            amount: 0,
          });
        }
        map.get(key)!.amount += dep.amount;
      }
    }
    return Array.from(map.values()).sort((a, b) =>
      a.year !== b.year ? a.year - b.year : a.month - b.month
    );
  }, [goals]);

  /* ── Filter & Sort ── */
  function filterAndSort(filter: FilterStatus, sort: SortOption): Goal[] {
    let filtered = goals.filter((goal) => {
      if (filter === 'all') return true;
      const saved = getTotalSaved(goal.deposits);
      const status = getGoalStatus(saved, goal.target);
      return status === filter;
    });

    return filtered.sort((a, b) => {
      const savedA = getTotalSaved(a.deposits);
      const savedB = getTotalSaved(b.deposits);
      switch (sort) {
        case 'recently-added':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'deadline': {
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        case 'progress':
          return formatProgress(savedB, b.target) - formatProgress(savedA, a.target);
        case 'amount-saved':
          return savedB - savedA;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }

  /* ── CRUD ── */
  function addGoal(name: string, target: number, deadline: string | null): Goal {
    const newGoal: Goal = {
      id: generateId('goal'),
      name,
      target,
      deadline,
      createdAt: new Date().toISOString(),
      deposits: [],
    };
    setGoals((prev) => [newGoal, ...prev]);
    return newGoal;
  }

  function editGoal(id: string, name: string, target: number, deadline: string | null) {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, name, target, deadline } : g))
    );
  }

  function deleteGoal(id: string) {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }

  function addDeposit(goalId: string, amount: number, note: string): Deposit {
    const deposit: Deposit = {
      id: generateId('dep'),
      amount,
      note,
      createdAt: new Date().toISOString(),
    };
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, deposits: [...g.deposits, deposit] } : g
      )
    );
    return deposit;
  }

  function getGoal(id: string): Goal | undefined {
    return goals.find((g) => g.id === id);
  }

  return {
    goals,
    stats,
    monthlyDeposits,
    filterAndSort,
    addGoal,
    editGoal,
    deleteGoal,
    addDeposit,
    getGoal,
  };
}
