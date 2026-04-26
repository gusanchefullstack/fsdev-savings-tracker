import styles from './EmptyState.module.css';

interface EmptyStateProps {
  onNewGoal: () => void;
}

export function EmptyState({ onNewGoal }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <img src="/images/pattern-grid.svg" alt="" aria-hidden="true" className={styles.illustration} />
      <div className={styles.content}>
        <p className={styles.heading}>No savings goals yet</p>
        <p className={styles.description}>
          Create your first savings goal and start tracking your progress.
        </p>
        <button className={styles.btn} onClick={onNewGoal}>
          <img src="/images/icon-plus.svg" alt="" aria-hidden="true" width={20} height={20} />
          Create your first goal
        </button>
      </div>
    </div>
  );
}
