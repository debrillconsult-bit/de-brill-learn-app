import type { PropsWithChildren, ReactNode } from 'react';

interface SectionCardProps extends PropsWithChildren {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const SectionCard = ({
  eyebrow,
  title,
  description,
  action,
  children,
}: SectionCardProps) => (
  <section className="rounded-[28px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">{eyebrow}</p>
        ) : null}
        <h2 className="mt-1 text-[22px] font-bold text-brand-navy">{title}</h2>
        {description ? <p className="mt-2 text-[14px] text-brand-muted">{description}</p> : null}
      </div>
      {action}
    </div>
    <div className="mt-5">{children}</div>
  </section>
);
