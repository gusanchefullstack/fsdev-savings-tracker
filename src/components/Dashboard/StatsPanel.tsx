import type { GoalStats } from '../../types';
import { formatCurrency } from '../../utils/formatUtils';
import styles from './StatsPanel.module.css';

interface StatsPanelProps {
  stats: GoalStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <section className={styles.panel} aria-label="Savings summary">
      <div className={styles.totalSavings}>
        <p className={styles.label}>Total savings</p>
        <p className={styles.totalValue}>{formatCurrency(stats.totalSavings)}</p>
      </div>

      <div className={styles.statCard}>
        <p className={styles.label}>Active goals</p>
        <p className={`${styles.statValue} ${styles.orange}`}>{stats.activeGoals}</p>
        <img
          src="/images/icon-target.svg"
          alt=""
          aria-hidden="true"
          className={styles.decorIcon}
        />
      </div>

      <div className={styles.statCard}>
        <p className={styles.label}>Goals completed</p>
        <p className={`${styles.statValue} ${styles.green}`}>{stats.completedGoals}</p>
        <img
          src="/images/icon-checkmark.svg"
          alt=""
          aria-hidden="true"
          className={styles.decorIcon}
        />
      </div>
    </section>
  );
}
