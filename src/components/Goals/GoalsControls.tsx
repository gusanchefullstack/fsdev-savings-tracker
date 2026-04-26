import { useState, useRef, useEffect } from 'react';
import type { FilterStatus, SortOption } from '../../types';
import styles from './GoalsControls.module.css';
import filterIcon from '/images/icon-filter.svg';
import sortIcon from '/images/icon-sort.svg';
import arrowDown from '/images/icon-arrow-down.svg';

const FILTER_OPTIONS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All goals' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'not-started', label: 'Not started' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recently-added', label: 'Recently added' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'progress', label: 'Progress' },
  { value: 'amount-saved', label: 'Amount saved' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

interface GoalsControlsProps {
  filter: FilterStatus;
  sort: SortOption;
  onFilterChange: (f: FilterStatus) => void;
  onSortChange: (s: SortOption) => void;
}

function Dropdown<T extends string>({
  icon, label, options, value, onChange,
}: {
  icon: string;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  const currentLabel = options.find((o) => o.value === value)?.label ?? label;

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        ref={btnRef}
        className={styles.dropdownBtn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${currentLabel}`}
      >
        <img src={icon} alt="" aria-hidden="true" width={16} height={16} />
        <span>{label}</span>
        <img
          src={arrowDown}
          alt=""
          aria-hidden="true"
          width={16}
          height={16}
          className={open ? styles.arrowUp : ''}
        />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label={label}>
          {options.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className={`${styles.menuItem} ${opt.value === value ? styles.active : ''}`}
                onClick={() => { onChange(opt.value); setOpen(false); btnRef.current?.focus(); }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function GoalsControls({ filter, sort, onFilterChange, onSortChange }: GoalsControlsProps) {
  return (
    <div className={styles.controls} role="group" aria-label="Filter and sort goals">
      <Dropdown
        icon={filterIcon}
        label="Filters"
        options={FILTER_OPTIONS}
        value={filter}
        onChange={onFilterChange}
      />
      <Dropdown
        icon={sortIcon}
        label="Sort by"
        options={SORT_OPTIONS}
        value={sort}
        onChange={onSortChange}
      />
    </div>
  );
}
