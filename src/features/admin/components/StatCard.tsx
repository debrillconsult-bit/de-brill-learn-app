import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone: string;
  note?: string;
}

export const StatCard = ({ label, value, icon: Icon, tone, note }: StatCardProps) => (
  <article className="rounded-[28px] border border-white/70 bg-white p-5 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: tone }}>
      <Icon size={22} />
    </div>
    <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-muted">{label}</p>
    <p className="mt-1 text-[32px] font-bold text-brand-navy">{value}</p>
    {note ? <p className="mt-2 text-[13px] text-brand-muted">{note}</p> : null}
  </article>
);
