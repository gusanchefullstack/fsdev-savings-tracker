import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Goal } from '../../types';
import { ModalBase } from './ModalBase';
import styles from './GoalForm.module.css';
import errorIcon from '/images/icon-error.svg';
import calendarIcon from '/images/icon-calendar.svg';

interface GoalFormProps {
  existing?: Goal;
  onSave: (name: string, target: number, deadline: string | null) => void;
  onClose: () => void;
}

export function GoalForm({ existing, onSave, onClose }: GoalFormProps) {
  const [name, setName] = useState(existing?.name ?? '');
  const [target, setTarget] = useState(existing?.target ? String(existing.target) : '');
  const [deadline, setDeadline] = useState(existing?.deadline ?? '');
  const [errors, setErrors] = useState<{ name?: string; target?: string }>({});

  function validate(): boolean {
    const errs: { name?: string; target?: string } = {};
    if (!name.trim()) errs.name = 'Goal name is required.';
    const amt = parseFloat(target);
    if (!target) errs.target = 'Target amount is required.';
    else if (isNaN(amt) || amt <= 0) errs.target = 'Target must be greater than $0.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave(name.trim(), parseFloat(target), deadline || null);
  }

  return (
    <ModalBase title={existing ? 'Edit goal' : 'New goal'} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label htmlFor="goal-name" className={styles.label}>Goal name</label>
          <input
            id="goal-name"
            type="text"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. MacBook Pro"
            aria-describedby={errors.name ? 'goal-name-error' : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="goal-name-error" className={styles.error} role="alert">
              <img src={errorIcon} alt="" aria-hidden="true" width={16} height={16} />
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="goal-target" className={styles.label}>Target amount</label>
          <div className={styles.inputWrapper}>
            <span className={styles.prefix}>$</span>
            <input
              id="goal-target"
              type="number"
              min="0.01"
              step="0.01"
              className={`${styles.input} ${styles.inputPrefixed} ${errors.target ? styles.inputError : ''}`}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="0.00"
              aria-describedby={errors.target ? 'goal-target-error' : undefined}
              aria-invalid={!!errors.target}
            />
          </div>
          {errors.target && (
            <p id="goal-target-error" className={styles.error} role="alert">
              <img src={errorIcon} alt="" aria-hidden="true" width={16} height={16} />
              {errors.target}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="goal-deadline" className={styles.label}>
            Deadline <span className={styles.optional}>(optional)</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="goal-deadline"
              type="date"
              className={`${styles.input} ${styles.inputSuffixed}`}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <img src={calendarIcon} alt="" aria-hidden="true" width={16} height={16} className={styles.suffix} />
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={styles.saveBtn}>
            {existing ? 'Save changes' : 'Create goal'}
          </button>
        </div>
      </form>
    </ModalBase>
  );
}
