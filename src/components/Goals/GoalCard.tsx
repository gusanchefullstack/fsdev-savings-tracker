import type { Goal } from '../../types';
import { getTotalSaved, formatProgress, formatCurrency, getGoalStatus } from '../../utils/formatUtils';
import { formatDeadline } from '../../utils/dateUtils';
import { ProgressBar } from '../UI/ProgressBar';
import styles from './GoalCard.module.css';

interface GoalCardProps {
  goal: Goal;
  featured?: boolean;
  onClick: (id: string) => void;
}

export function GoalCard({ goal, featured = false, onClick }: GoalCardProps) {
  const saved = getTotalSaved(goal.deposits);
  const percentage = formatProgress(saved, goal.target);
  const status = getGoalStatus(saved, goal.target);
  const isCompleted = status === 'completed';
  const isFeatured = featured && !isCompleted;

  const cardClass = [
    styles.card,
    isFeatured ? styles.featured : '',
    isCompleted ? styles.completed : '',
    !isFeatured && !isCompleted ? styles.default : '',
  ].filter(Boolean).join(' ');

  const progressVariant = isCompleted ? 'green' : isFeatured ? 'orange' : 'dark';

  return (
    <article className={cardClass}>
      <button
        className={styles.cardBtn}
        onClick={() => onClick(goal.id)}
        aria-label={`View details for ${goal.name}, ${percentage}% saved`}
      >
        <div className={styles.header}>
          <h2 className={styles.name}>{goal.name}</h2>
          {isCompleted && (
            <span className={styles.badge} aria-label="Goal complete">COMPLETE</span>
          )}
        </div>

        <div className={styles.body}>
          <p className={`${styles.percentage} ${isCompleted ? styles.percentageGreen : isFeatured ? styles.percentageWhite : styles.percentageOrange}`}>
            {percentage}%
          </p>
          <ProgressBar percentage={percentage} variant={progressVariant} />
          <div className={styles.meta}>
            <span>{formatCurrency(saved)} of {formatCurrency(goal.target)}</span>
            {goal.deadline && (
              <>
                <span className={styles.dot} aria-hidden="true" />
                <span>{formatDeadline(goal.deadline)}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}
