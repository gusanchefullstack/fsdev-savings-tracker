import { useState } from 'react';
import type { FormEvent } from 'react';
import { ModalBase } from './ModalBase';
import styles from './GoalForm.module.css';
import errorIcon from '/images/icon-error.svg';

interface AddDepositModalProps {
  goalName: string;
  onSave: (amount: number, note: string) => void;
  onClose: () => void;
}

export function AddDepositModal({ goalName, onSave, onClose }: AddDepositModalProps) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) {
      setError('Amount must be greater than $0.');
      return;
    }
    setError('');
    onSave(amt, note.trim());
  }

  return (
    <ModalBase title={`Add deposit — ${goalName}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label htmlFor="deposit-amount" className={styles.label}>Amount</label>
          <div className={styles.inputWrapper}>
            <span className={styles.prefix}>$</span>
            <input
              id="deposit-amount"
              type="number"
              min="0.01"
              step="0.01"
              className={`${styles.input} ${styles.inputPrefixed} ${error ? styles.inputError : ''}`}
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(''); }}
              placeholder="0.00"
              aria-describedby={error ? 'deposit-amount-error' : undefined}
              aria-invalid={!!error}
            />
          </div>
          {error && (
            <p id="deposit-amount-error" className={styles.error} role="alert">
              <img src={errorIcon} alt="" aria-hidden="true" width={16} height={16} />
              {error}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="deposit-note" className={styles.label}>
            Note <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="deposit-note"
            type="text"
            className={styles.input}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Monthly savings"
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={styles.saveBtn}>Add deposit</button>
        </div>
      </form>
    </ModalBase>
  );
}
