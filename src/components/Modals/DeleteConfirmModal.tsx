import { ModalBase } from './ModalBase';
import styles from './DeleteConfirmModal.module.css';

interface DeleteConfirmModalProps {
  goalName: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteConfirmModal({ goalName, onConfirm, onClose }: DeleteConfirmModalProps) {
  return (
    <ModalBase title="Delete goal" onClose={onClose}>
      <div className={styles.content}>
        <p className={styles.warning}>
          Are you sure you want to delete <strong>{goalName}</strong>? This will permanently
          delete all deposit history associated with this goal.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.deleteBtn} onClick={onConfirm}>Delete goal</button>
        </div>
      </div>
    </ModalBase>
  );
}
