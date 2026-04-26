import { useState } from 'react';
import type { FilterStatus, ModalState, SortOption } from './types';
import { useGoals } from './hooks/useGoals';
import { Header } from './components/Header/Header';
import { StatsPanel } from './components/Dashboard/StatsPanel';
import { MonthlyDepositsChart } from './components/Dashboard/MonthlyDepositsChart';
import { GoalGrid } from './components/Goals/GoalGrid';
import { GoalDetail } from './components/Goals/GoalDetail';
import { GoalsControls } from './components/Goals/GoalsControls';
import { GoalForm } from './components/Modals/GoalForm';
import { AddDepositModal } from './components/Modals/AddDepositModal';
import { DeleteConfirmModal } from './components/Modals/DeleteConfirmModal';
import styles from './App.module.css';

export default function App() {
  const { stats, monthlyDeposits, filterAndSort, addGoal, editGoal, deleteGoal, addDeposit, getGoal } = useGoals();

  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sort, setSort] = useState<SortOption>('recently-added');
  const [modal, setModal] = useState<ModalState>({ type: null, goalId: null });
  const [liveMessage, setLiveMessage] = useState('');

  const announce = (msg: string) => {
    setLiveMessage('');
    setTimeout(() => setLiveMessage(msg), 50);
  };

  const openModal = (type: ModalState['type'], goalId: string | null = null) =>
    setModal({ type, goalId });
  const closeModal = () => setModal({ type: null, goalId: null });

  const activeGoal = activeGoalId ? getGoal(activeGoalId) : null;
  const filteredGoals = filterAndSort(filter, sort);

  function handleSaveGoal(name: string, target: number, deadline: string | null) {
    if (modal.goalId) {
      editGoal(modal.goalId, name, target, deadline);
      announce(`Goal "${name}" updated.`);
    } else {
      addGoal(name, target, deadline);
      announce(`Goal "${name}" created.`);
    }
    closeModal();
  }

  function handleAddDeposit(amount: number, note: string) {
    if (!modal.goalId) return;
    addDeposit(modal.goalId, amount, note);
    announce(`Deposit of $${amount.toFixed(2)} added.`);
    closeModal();
  }

  function handleDeleteGoal() {
    if (!modal.goalId) return;
    const goal = getGoal(modal.goalId);
    deleteGoal(modal.goalId);
    if (activeGoalId === modal.goalId) setActiveGoalId(null);
    announce(`Goal "${goal?.name}" deleted.`);
    closeModal();
  }

  return (
    <>
      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{liveMessage}</div>

      <Header onNewGoal={() => openModal('add-goal')} />

      <main className={styles.main}>
        <div className={styles.container}>
          {activeGoal ? (
            <GoalDetail
              goal={activeGoal}
              onBack={() => setActiveGoalId(null)}
              onEdit={(id) => openModal('edit-goal', id)}
              onDelete={(id) => openModal('delete-confirm', id)}
              onAddDeposit={(id) => openModal('add-deposit', id)}
            />
          ) : (
            <>
              <StatsPanel stats={stats} />
              <MonthlyDepositsChart data={monthlyDeposits} />

              <section className={styles.goalsSection} aria-label="Your goals">
                <div className={styles.goalsHeader}>
                  <h2 className={styles.goalsTitle}>Your goals</h2>
                  <nav aria-label="Filter and sort options">
                    <GoalsControls
                      filter={filter}
                      sort={sort}
                      onFilterChange={setFilter}
                      onSortChange={setSort}
                    />
                  </nav>
                </div>
                <GoalGrid
                  goals={filteredGoals}
                  onGoalClick={setActiveGoalId}
                  onNewGoal={() => openModal('add-goal')}
                />
              </section>
            </>
          )}
        </div>
      </main>

      {/* Modals */}
      {(modal.type === 'add-goal' || modal.type === 'edit-goal') && (
        <GoalForm
          existing={modal.goalId ? getGoal(modal.goalId) : undefined}
          onSave={handleSaveGoal}
          onClose={closeModal}
        />
      )}
      {modal.type === 'add-deposit' && modal.goalId && (
        <AddDepositModal
          goalName={getGoal(modal.goalId)?.name ?? ''}
          onSave={handleAddDeposit}
          onClose={closeModal}
        />
      )}
      {modal.type === 'delete-confirm' && modal.goalId && (
        <DeleteConfirmModal
          goalName={getGoal(modal.goalId)?.name ?? ''}
          onConfirm={handleDeleteGoal}
          onClose={closeModal}
        />
      )}
    </>
  );
}
