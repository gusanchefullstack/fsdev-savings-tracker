import type { Goal } from '../../types';
import { getTotalSaved, getGoalStatus } from '../../utils/formatUtils';
import { GoalCard } from './GoalCard';
import { EmptyState } from './EmptyState';
import styles from './GoalGrid.module.css';

interface GoalGridProps {
  goals: Goal[];
  onGoalClick: (id: string) => void;
  onNewGoal: () => void;
}

export function GoalGrid({ goals, onGoalClick, onNewGoal }: GoalGridProps) {
  if (goals.length === 0) {
    return <EmptyState onNewGoal={onNewGoal} />;
  }

  /* Find the best candidate for featured (first non-completed in-progress, else first goal) */
  const featuredIndex = (() => {
    const idx = goals.findIndex((g) => {
      const saved = getTotalSaved(g.deposits);
      return getGoalStatus(saved, g.target) === 'in-progress';
    });
    return idx >= 0 ? idx : 0;
  })();

  /* Separate featured from the rest */
  const featured = goals[featuredIndex];
  const rest = goals.filter((_, i) => i !== featuredIndex);

  /* Pair up remaining goals for the asymmetric 2-col layout */
  const rows: Goal[][] = [];
  for (let i = 0; i < rest.length; i += 3) {
    rows.push(rest.slice(i, i + 3));
  }

  return (
    <div className={styles.grid}>
      {/* Featured row: wide card left + tall card right */}
      <div className={styles.featuredRow}>
        <div className={styles.featuredCard}>
          <GoalCard goal={featured} featured onClick={onGoalClick} />
        </div>
        {rest[0] && (
          <div className={styles.tallCard}>
            <GoalCard goal={rest[0]} onClick={onGoalClick} />
          </div>
        )}
      </div>

      {/* Subsequent rows: groups of up to 3 goals in asymmetric layout */}
      {rows.slice(1).map((group, rowIdx) => (
        <div
          key={rowIdx}
          className={`${styles.row} ${rowIdx % 2 === 0 ? styles.rowReverse : ''}`}
        >
          {group[0] && (
            <div className={styles.tallCard}>
              <GoalCard goal={group[0]} onClick={onGoalClick} />
            </div>
          )}
          <div className={styles.wideBlock}>
            {group[1] && (
              <div className={styles.wideCard}>
                <GoalCard goal={group[1]} onClick={onGoalClick} />
              </div>
            )}
            <div className={styles.halfRow}>
              {group[2] && (
                <div className={styles.halfCard}>
                  <GoalCard goal={group[2]} onClick={onGoalClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
