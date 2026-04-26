import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
  variant?: 'orange' | 'green' | 'dark';
}

export function ProgressBar({ percentage, variant = 'orange' }: ProgressBarProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <span
      className={`${styles.track} ${styles[variant]}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${clamped}% saved`}
    >
      <span className={styles.fill} style={{ width: `${clamped}%` }}>
        <span className={styles.segments} aria-hidden="true" />
      </span>
    </span>
  );
}
