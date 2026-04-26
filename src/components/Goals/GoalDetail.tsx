import type { Goal } from '../../types';
import { getTotalSaved, formatProgress, formatCurrency, getGoalStatus } from '../../utils/formatUtils';
import { formatDeadline, formatDate } from '../../utils/dateUtils';
import { ProgressBar } from '../UI/ProgressBar';
import styles from './GoalDetail.module.css';
import chevronLeft from '/images/icon-chevron-left.svg';
import plusIcon from '/images/icon-plus.svg';

interface GoalDetailProps {
  goal: Goal;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddDeposit: (id: string) => void;
}

export function GoalDetail({ goal, onBack, onEdit, onDelete, onAddDeposit }: GoalDetailProps) {
  const saved = getTotalSaved(goal.deposits);
  const percentage = formatProgress(saved, goal.target);
  const status = getGoalStatus(saved, goal.target);
  const isCompleted = status === 'completed';
  const remaining = Math.max(goal.target - saved, 0);

  const sortedDeposits = [...goal.deposits].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.container}>
      {/* Back + actions */}
      <div className={styles.topBar}>
        <button type="button" className={styles.backBtn} onClick={onBack} aria-label="Back to goals">
          <img src={chevronLeft} alt="" aria-hidden="true" width={20} height={20} />
          Back
        </button>
        <div className={styles.actions}>
          <button type="button" className={styles.editBtn} onClick={() => onEdit(goal.id)}>Edit goal</button>
          <button type="button" className={styles.deleteBtn} onClick={() => onDelete(goal.id)}>Delete</button>
        </div>
      </div>

      <h2 className={styles.goalName}>{goal.name}</h2>

      {/* Progress section */}
      {isCompleted ? (
        <div className={styles.completedSection}>
          <p className={styles.completedLabel}>Goal complete!</p>
          <p className={styles.percentage} style={{ color: 'var(--green-500)' }}>{percentage}%</p>
          <div className={styles.completedStats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total deposits</span>
              <span className={styles.statValue}>{goal.deposits.length}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Total saved</span>
              <span className={styles.statValue}>{formatCurrency(saved)}</span>
            </div>
          </div>
          <ProgressBar percentage={100} variant="green" />
        </div>
      ) : (
        <div className={styles.progressSection}>
          <p className={styles.percentage} style={{ color: 'var(--orange-400)' }}>{percentage}%</p>
          <ProgressBar percentage={percentage} variant="dark" />
          <div className={styles.amountRow}>
            <div className={styles.amountItem}>
              <span className={styles.amountLabel}>Saved</span>
              <span className={styles.amountValue}>{formatCurrency(saved)}</span>
            </div>
            <div className={styles.amountItem}>
              <span className={styles.amountLabel}>Target</span>
              <span className={styles.amountValue}>{formatCurrency(goal.target)}</span>
            </div>
            <div className={styles.amountItem}>
              <span className={styles.amountLabel}>Remaining</span>
              <span className={styles.amountValue}>{formatCurrency(remaining)}</span>
            </div>
          </div>
          {goal.deadline && (
            <p className={styles.deadline}>{formatDeadline(goal.deadline)}</p>
          )}
        </div>
      )}

      <button
        type="button"
        className={styles.addDepositBtn}
        onClick={() => onAddDeposit(goal.id)}
        aria-label={`Add deposit to ${goal.name}`}
      >
        <img src={plusIcon} alt="" aria-hidden="true" width={20} height={20} />
        Add deposit
      </button>

      {/* Deposit history */}
      <section className={styles.historySection} aria-label="Deposit history">
        <h2 className={styles.historyTitle}>Deposit history</h2>
        {sortedDeposits.length === 0 ? (
          <p className={styles.noDeposits}>No deposits yet. Add your first deposit above.</p>
        ) : (
          <ul className={styles.depositList}>
            {sortedDeposits.map((dep) => (
              <li key={dep.id} className={styles.depositItem}>
                <div className={styles.depositLeft}>
                  <span className={styles.depositNote}>
                    {dep.note || <span className={styles.noNote}>No note</span>}
                  </span>
                  <time className={styles.depositDate} dateTime={dep.createdAt}>
                    {formatDate(dep.createdAt)}
                  </time>
                </div>
                <span className={styles.depositAmount}>{formatCurrency(dep.amount)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
