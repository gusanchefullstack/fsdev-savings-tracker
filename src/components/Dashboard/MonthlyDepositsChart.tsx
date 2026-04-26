import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { MonthlyDeposit } from '../../types';
import { formatCurrency } from '../../utils/formatUtils';
import styles from './MonthlyDepositsChart.module.css';

interface MonthlyDepositsChartProps {
  data: MonthlyDeposit[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      {formatCurrency(payload[0].value)}
    </div>
  );
}

function CustomLabel({ x, y, width, value }: { x?: number; y?: number; width?: number; value?: number }) {
  if (value === undefined || x === undefined || y === undefined || width === undefined) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 8}
      fill="var(--neutral-400)"
      textAnchor="middle"
      fontSize={12}
      fontFamily="Inter, sans-serif"
    >
      {formatCurrency(value)}
    </text>
  );
}

export function MonthlyDepositsChart({ data }: MonthlyDepositsChartProps) {
  if (data.length === 0) return null;

  const maxAmount = Math.max(...data.map((d) => d.amount));
  const displayed = data.slice(-12);

  return (
    <section className={styles.container} aria-label="Monthly deposits chart">
      <h2 className={styles.title}>Monthly deposits</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={202}>
          <BarChart
            data={displayed}
            margin={{ top: 28, right: 0, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--neutral-400)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
              dy={8}
            />
            <YAxis hide domain={[0, maxAmount * 1.2]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]} label={<CustomLabel />}>
              {displayed.map((_, index) => (
                <Cell key={index} fill="var(--orange-400)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
