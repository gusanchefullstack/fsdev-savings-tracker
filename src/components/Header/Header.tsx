import styles from './Header.module.css';
import logoLarge from '/images/logo-large.svg';
import logoSmall from '/images/logo-small.svg';
import plusIcon from '/images/icon-plus.svg';

interface HeaderProps {
  onNewGoal: () => void;
}

export function Header({ onNewGoal }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Savings Tracker home">
          <img src={logoSmall} alt="" aria-hidden="true" className={styles.logoSmall} width={40} height={40} />
          <img src={logoLarge} alt="" aria-hidden="true" className={styles.logoLarge} width={40} height={40} />
          <span className={styles.logoText}>Savings Tracker</span>
        </a>
        <button
          className={styles.newGoalBtn}
          onClick={onNewGoal}
          aria-label="Create new savings goal"
        >
          <img src={plusIcon} alt="" aria-hidden="true" width={20} height={20} />
          <span>New goal</span>
        </button>
      </div>
    </header>
  );
}
