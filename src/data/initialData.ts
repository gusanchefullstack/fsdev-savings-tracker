import rawData from '../../data.json';
import type { Goal } from '../types';
import { MONTH_OFFSET, shiftIsoDate, shiftDeadline } from '../utils/dateUtils';

function shiftGoals(goals: Goal[]): Goal[] {
  if (MONTH_OFFSET === 0) return goals as Goal[];
  return goals.map((goal) => ({
    ...goal,
    createdAt: shiftIsoDate(goal.createdAt, MONTH_OFFSET),
    deadline: goal.deadline ? shiftDeadline(goal.deadline, MONTH_OFFSET) : null,
    deposits: goal.deposits.map((dep) => ({
      ...dep,
      createdAt: shiftIsoDate(dep.createdAt, MONTH_OFFSET),
    })),
  }));
}

export const initialGoals: Goal[] = shiftGoals(rawData.goals as Goal[]);
