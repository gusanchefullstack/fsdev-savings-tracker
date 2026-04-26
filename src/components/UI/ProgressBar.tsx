import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  percentage: number;
  variant?: 'orange' | 'green' | 'dark';
}

export function ProgressBar({ percentage, variant = 'orange' }: ProgressBarProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <span className={`${styles.wrapper} ${styles[variant]}`}>
      <progress
        className={styles.track}
        value={clamped}
        max={100}
        aria-label={`${clamped}% saved`}
      />
      <span className={styles.segments} aria-hidden="true" />
    </span>
  );
}
