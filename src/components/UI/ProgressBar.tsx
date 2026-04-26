import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
  variant?: 'orange' | 'green' | 'dark';
}

export function ProgressBar({ percentage, variant = 'orange' }: ProgressBarProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      className={`${styles.track} ${styles[variant]}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${clamped}% saved`}
    >
      <div className={styles.fill} style={{ width: `${clamped}%` }}>
        <div className={styles.segments} aria-hidden="true" />
      </div>
    </div>
  );
}
