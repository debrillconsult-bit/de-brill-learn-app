import type { AnalyticsPoint } from '@/src/features/admin/types';

interface BarChartProps {
  points: AnalyticsPoint[];
  colorClassName: string;
  valueSuffix?: string;
}

export const BarChart = ({ points, colorClassName, valueSuffix = '' }: BarChartProps) => {
  const maxValue = Math.max(...points.map(point => point.value), 1);

  return (
    <div className="rounded-[24px] bg-[#F7FAFD] p-4">
      <div className="flex h-[220px] items-end gap-3">
        {points.map(point => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-t-[16px] ${colorClassName}`}
                style={{ height: `${Math.max((point.value / maxValue) * 100, 10)}%` }}
              />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">{point.label}</p>
              <p className="mt-1 text-[12px] font-semibold text-brand-navy">
                {point.value}
                {valueSuffix}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
