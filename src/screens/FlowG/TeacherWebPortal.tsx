import React from 'react';
import {
  Activity,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CreditCard,
  FileText,
  Globe,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Palette,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Analytics', icon: ChartNoAxesCombined },
  { label: 'Users & Roles', icon: Users },
  { label: 'Content', icon: BookOpen },
  { label: 'Alerts', icon: Bell },
  { label: 'Security', icon: ShieldCheck },
  { label: 'Integrations', icon: BriefcaseBusiness },
];

const kpis = [
  { label: 'Active Users', value: '18,420', trend: '+12.4%', note: '2,148 active in the last hour', icon: Users, accent: '#1B3A7A' },
  { label: 'Monthly Revenue', value: '$42,860', trend: '+8.1%', note: 'Subscription and school billing', icon: Wallet, accent: '#F5B800' },
  { label: 'Crash-Free Sessions', value: '99.74%', trend: '+0.3%', note: 'Healthy across Android and web', icon: Activity, accent: '#2E7D32' },
  { label: 'Push Delivery Rate', value: '96.2%', trend: '-1.1%', note: 'Watch Android delivery this week', icon: Bell, accent: '#B71C1C' },
];

const traffic = [
  { label: 'Mon', value: 62 },
  { label: 'Tue', value: 74 },
  { label: 'Wed', value: 68 },
  { label: 'Thu', value: 91 },
  { label: 'Fri', value: 84 },
  { label: 'Sat', value: 55 },
  { label: 'Sun', value: 48 },
];

const users = [
  { name: 'Amaka Okafor', role: 'Super Admin', team: 'Operations', status: 'Active', lastSeen: '2 min ago' },
  { name: 'Tunde Bello', role: 'Content Manager', team: 'Learning', status: 'Active', lastSeen: '12 min ago' },
  { name: 'Halima Sani', role: 'Support Lead', team: 'Customer Success', status: 'Invited', lastSeen: 'Pending' },
  { name: 'Joel Peters', role: 'Analyst', team: 'Growth', status: 'Suspended', lastSeen: '3 days ago' },
];

const cmsItems = [
  { title: 'Push Notifications', body: 'Draft and schedule campaigns, incident notices, and parent reminders.', meta: '14 drafts • 3 scheduled', icon: Bell, accent: '#F47920' },
  { title: 'News & Updates', body: 'Publish in-app announcements, release notes, and school news.', meta: '7 live stories', icon: FileText, accent: '#1B3A7A' },
  { title: 'Catalog & Listings', body: 'Manage books, subscription plans, and featured learning content.', meta: '28 items updated', icon: BookOpen, accent: '#2E7D32' },
];

const alerts = [
  { level: 'Critical', title: 'Payment webhook retries increasing', detail: 'Stripe callbacks exceeded threshold in the last 15 minutes.' },
  { level: 'Warning', title: 'Android push delivery dropped', detail: 'Delivery rate fell below the 97% target for Lagos schools.' },
  { level: 'Info', title: 'Traffic spike detected', detail: 'Usage is 22% above forecast after the reading challenge campaign.' },
];

const audits = [
  { actor: 'Amaka Okafor', action: 'Changed RBAC policy for Support Leads', time: '09:14 AM' },
  { actor: 'System', action: 'Triggered MFA challenge for 4 high-risk sign-ins', time: '08:52 AM' },
  { actor: 'Tunde Bello', action: 'Published “Term 3 Welcome Back” notification', time: '08:31 AM' },
];

const integrations = [
  { name: 'Google Analytics 4', status: 'Connected', detail: 'Event and funnel dashboards synced hourly.', icon: Globe },
  { name: 'HubSpot CRM', status: 'Connected', detail: 'Lead pipeline and onboarding automations are live.', icon: BriefcaseBusiness },
  { name: 'Stripe Billing', status: 'Attention', detail: 'Webhook delivery retries need review.', icon: CreditCard },
  { name: 'SendGrid', status: 'Connected', detail: 'Transactional email and OTP delivery are healthy.', icon: Mail },
];

const getStatusClasses = (status: string) => {
  if (status === 'Active' || status === 'Connected') return 'bg-green-100 text-green-700';
  if (status === 'Invited' || status === 'Attention') return 'bg-amber-100 text-amber-700';
  if (status === 'Suspended') return 'bg-red-100 text-red-700';
  return 'bg-slate-100 text-slate-700';
};

const getAlertClasses = (level: string) => {
  if (level === 'Critical') return 'border-red-200 bg-red-50 text-red-700';
  if (level === 'Warning') return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-sky-200 bg-sky-50 text-sky-700';
};

export const TeacherWebPortal = () => {
  return (
    <div className="min-h-screen bg-[#EEF3F8] text-brand-navy">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/50 bg-brand-navy text-white lg:min-h-screen lg:w-[280px] lg:border-b-0 lg:border-r lg:border-r-white/10">
          <div className="flex items-center justify-between px-5 py-5 lg:px-6 lg:py-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold text-[20px] text-brand-navy">
                🛡️
              </div>
              <div>
                <p className="text-[18px] font-bold">De-Brill Admin</p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Control Center</p>
              </div>
            </div>
            <span className="rounded-xl bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white/80">Live</span>
          </div>

          <nav className="grid grid-cols-2 gap-2 px-4 pb-5 lg:grid-cols-1 lg:px-5">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${item.active ? 'bg-brand-gold text-brand-navy' : 'bg-white/5 text-white/85 hover:bg-white/10'}`}
              >
                <item.icon size={18} />
                <span className="text-[13px] font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mx-4 mb-4 rounded-[24px] border border-white/10 bg-white/5 p-4 lg:mx-5 lg:mt-auto">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[20px]">👩‍💼</div>
              <div>
                <p className="text-[14px] font-bold">Amaka Okafor</p>
                <p className="text-[12px] text-white/60">Super Admin</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-[#10244E] px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">MFA</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-[13px] font-bold">Required for all admins</p>
                <ShieldCheck size={18} className="text-brand-gold" />
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[#D8E1EC] bg-white/90 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-brand-gold">Admin Dashboard</p>
                <h1 className="mt-2 text-[28px] font-bold leading-tight">Operations, Growth, and Security at a Glance</h1>
                <p className="mt-1 text-[14px] text-brand-muted">Real-time KPIs, user controls, CMS workflows, alerts, audit visibility, branding options, and integrations.</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 rounded-2xl border border-[#D8E1EC] bg-[#F6F9FC] px-4 py-3 text-brand-muted sm:min-w-[280px]">
                  <Search size={18} />
                  <input type="text" placeholder="Search users, events, or campaigns" className="w-full bg-transparent text-[13px] outline-none placeholder:text-brand-muted" />
                </div>
                <div className="flex gap-3">
                  <button className="rounded-2xl border border-[#D8E1EC] bg-white px-4 py-3 text-[13px] font-bold text-brand-navy">Export Snapshot</button>
                  <button className="rounded-2xl bg-brand-navy px-4 py-3 text-[13px] font-bold text-white">Create Admin Task</button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-5 lg:px-8 lg:py-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                  <article key={kpi.label} className="rounded-[28px] border border-white/70 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: kpi.accent }}>
                        <kpi.icon size={22} />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${kpi.trend.startsWith('-') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{kpi.trend}</span>
                    </div>
                    <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-muted">{kpi.label}</p>
                    <p className="mt-1 text-[30px] font-bold">{kpi.value}</p>
                    <p className="mt-1 text-[13px] text-brand-muted">{kpi.note}</p>
                  </article>
                ))}
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.65fr_1fr]">
                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Real-Time Analytics</p>
                      <h2 className="text-[22px] font-bold">Engagement and revenue trends</h2>
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-brand-navy px-3 py-1 text-[11px] font-bold text-white">7 days</span>
                      <span className="rounded-full bg-[#EEF3F8] px-3 py-1 text-[11px] font-bold text-brand-muted">30 days</span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-[24px] bg-[#F7FAFD] p-4">
                      <div className="flex h-[240px] items-end gap-3">
                        {traffic.map((bar) => (
                          <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                            <div className="flex w-full flex-1 items-end">
                              <div className="w-full rounded-t-[16px] bg-gradient-to-t from-brand-navy to-[#4DBBEE]" style={{ height: `${bar.value}%` }} />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="rounded-2xl bg-white p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">DAU</p><p className="mt-1 text-[20px] font-bold">8.9k</p></div>
                        <div className="rounded-2xl bg-white p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">ARPU</p><p className="mt-1 text-[20px] font-bold">$12.8</p></div>
                        <div className="rounded-2xl bg-white p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Latency</p><p className="mt-1 text-[20px] font-bold">182ms</p></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-[24px] bg-brand-navy p-5 text-white">
                      <div>
                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Platform Mix</p>
                        <h3 className="mt-2 text-[20px] font-bold">User behavior by channel</h3>
                      </div>
                      {[
                        { label: 'Android App', value: '61%', color: '#1B3A7A' },
                        { label: 'Web Admin', value: '24%', color: '#F5B800' },
                        { label: 'Parent Portal', value: '15%', color: '#4DBBEE' },
                      ].map((item) => (
                        <div key={item.label} className="rounded-[20px] bg-white/8 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[13px] font-bold">{item.label}</span>
                            <span className="text-[18px] font-bold">{item.value}</span>
                          </div>
                          <div className="mt-3 h-2 rounded-full bg-white/10">
                            <div className="h-2 rounded-full" style={{ width: item.value, backgroundColor: item.color }} />
                          </div>
                        </div>
                      ))}
                      <div className="rounded-[20px] bg-brand-gold p-4 text-brand-navy">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Performance Note</p>
                        <p className="mt-2 text-[13px] font-medium">Web admins are spending 18% more time in the CMS after the latest content campaign launch.</p>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Alerts & Notifications</p>
                  <h2 className="mt-2 text-[22px] font-bold">Proactive system signals</h2>
                  <div className="mt-5 flex flex-col gap-3">
                    {alerts.map((alert) => (
                      <div key={alert.title} className={`rounded-[22px] border p-4 ${getAlertClasses(alert.level)}`}>
                        <div className="flex items-start gap-3">
                          <CircleAlert size={18} className="mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{alert.level}</span>
                              <button className="text-[11px] font-bold">Review</button>
                            </div>
                            <h3 className="mt-2 text-[15px] font-bold">{alert.title}</h3>
                            <p className="mt-1 text-[13px] leading-relaxed">{alert.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">User Management System</p>
                      <h2 className="text-[22px] font-bold">Accounts, roles, and RBAC controls</h2>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-2xl border border-[#D8E1EC] bg-white px-4 py-2 text-[12px] font-bold">Export Users</button>
                      <button className="rounded-2xl bg-brand-navy px-4 py-2 text-[12px] font-bold text-white">Create Account</button>
                    </div>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-[24px] border border-[#E3EAF2]">
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white">
                        <thead className="bg-[#F7FAFD] text-left">
                          <tr className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">
                            <th className="px-4 py-4">User</th>
                            <th className="px-4 py-4">Role</th>
                            <th className="px-4 py-4">Team</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Last Seen</th>
                            <th className="px-4 py-4">Permissions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.name} className="border-t border-[#EEF3F8] text-[13px]">
                              <td className="px-4 py-4 font-bold">{user.name}</td>
                              <td className="px-4 py-4">{user.role}</td>
                              <td className="px-4 py-4">{user.team}</td>
                              <td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusClasses(user.status)}`}>{user.status}</span></td>
                              <td className="px-4 py-4">{user.lastSeen}</td>
                              <td className="px-4 py-4"><button className="font-bold text-brand-gold">Edit RBAC</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>

                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Security & Auditing</p>
                  <h2 className="mt-2 text-[22px] font-bold">MFA posture and audit trail</h2>
                  <div className="mt-5 flex flex-col gap-4">
                    <div className="rounded-[24px] bg-brand-navy p-5 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">MFA Coverage</p>
                          <p className="mt-2 text-[28px] font-bold">94%</p>
                        </div>
                        <LockKeyhole size={28} className="text-brand-gold" />
                      </div>
                      <p className="mt-3 text-[13px] text-white/70">Enforce MFA for finance and content publishing roles before the next release window.</p>
                    </div>

                    <div className="rounded-[24px] bg-[#F7FAFD] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-muted">Audit Log</p>
                      <div className="mt-3 flex flex-col gap-3">
                        {audits.map((audit) => (
                          <div key={`${audit.actor}-${audit.time}`} className="rounded-[18px] bg-white p-3 shadow-sm">
                            <p className="text-[13px] font-semibold">{audit.actor}</p>
                            <p className="mt-1 text-[13px] text-brand-muted">{audit.action}</p>
                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">{audit.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </section>

              <section className="grid gap-6 xl:grid-cols-[1.1fr_1fr_1fr]">
                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Content Management System</p>
                  <h2 className="mt-2 text-[22px] font-bold">Control in-app messaging and content</h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {cmsItems.map((item) => (
                      <div key={item.title} className="rounded-[22px] border border-[#E3EAF2] p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: item.accent }}>
                            <item.icon size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[15px] font-bold">{item.title}</h3>
                            <p className="mt-1 text-[13px] leading-relaxed text-brand-muted">{item.body}</p>
                            <div className="mt-3 flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">{item.meta}</span>
                              <button className="flex items-center gap-1 text-[12px] font-bold">
                                Manage
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Customization</p>
                  <h2 className="mt-2 text-[22px] font-bold">Brand, theme, and layout</h2>
                  <div className="mt-5 flex flex-col gap-4">
                    <div className="rounded-[22px] bg-[#F7FAFD] p-4">
                      <div className="flex items-center gap-2">
                        <Palette size={18} className="text-brand-navy" />
                        <p className="text-[14px] font-bold">Theme presets</p>
                      </div>
                      <div className="mt-4 flex flex-col gap-3">
                        {[
                          { name: 'Navy Gold', colors: ['#1B3A7A', '#F5B800', '#F0F4FA'], active: true },
                          { name: 'Emerald Sky', colors: ['#0F766E', '#38BDF8', '#ECFEFF'] },
                          { name: 'Sunrise Coral', colors: ['#B45309', '#FB7185', '#FFF7ED'] },
                        ].map((theme) => (
                          <button key={theme.name} className={`rounded-[18px] border p-3 text-left ${theme.active ? 'border-brand-gold bg-brand-gold/10' : 'border-[#E3EAF2] bg-white'}`}>
                            <div className="flex items-center justify-between">
                              <span className="text-[13px] font-bold">{theme.name}</span>
                              {theme.active && <CheckCircle2 size={16} className="text-brand-gold" />}
                            </div>
                            <div className="mt-3 flex gap-2">
                              {theme.colors.map((color) => (
                                <span key={color} className="h-6 flex-1 rounded-full" style={{ backgroundColor: color }} />
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-[#E3EAF2] p-4">
                        <div className="flex items-center gap-2"><Sparkles size={16} className="text-brand-gold" /><p className="text-[13px] font-bold">Logo Kit</p></div>
                        <p className="mt-2 text-[13px] text-brand-muted">Swap logos, favicon, and splash assets for white-label school deployments.</p>
                      </div>
                      <div className="rounded-[22px] border border-[#E3EAF2] p-4">
                        <div className="flex items-center gap-2"><Smartphone size={16} className="text-brand-gold" /><p className="text-[13px] font-bold">Layouts</p></div>
                        <p className="mt-2 text-[13px] text-brand-muted">Preview desktop and mobile admin layouts before publishing branding changes.</p>
                      </div>
                    </div>
                  </div>
                </article>

                <article className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Third-Party Integration</p>
                  <h2 className="mt-2 text-[22px] font-bold">Connected external platforms</h2>
                  <div className="mt-5 flex flex-col gap-3">
                    {integrations.map((integration) => (
                      <div key={integration.name} className="rounded-[22px] border border-[#E3EAF2] p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F7FAFD]">
                            <integration.icon size={18} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[14px] font-bold">{integration.name}</span>
                              <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusClasses(integration.status)}`}>{integration.status}</span>
                            </div>
                            <p className="mt-2 text-[13px] leading-relaxed text-brand-muted">{integration.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </section>

              <section className="rounded-[30px] border border-white/70 bg-white p-5 shadow-sm lg:p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">Responsive Operations</p>
                    <h2 className="text-[22px] font-bold">Desktop-scale control with mobile-ready access</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-[#EEF3F8] px-3 py-1 text-[11px] font-bold text-brand-muted">Desktop</span>
                    <span className="rounded-full bg-[#EEF3F8] px-3 py-1 text-[11px] font-bold text-brand-muted">Tablet</span>
                    <span className="rounded-full bg-brand-gold px-3 py-1 text-[11px] font-bold text-brand-navy">Mobile-ready</span>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-[24px] bg-[#F7FAFD] p-4"><p className="text-[13px] font-bold">Compact navigation</p><p className="mt-2 text-[13px] leading-relaxed text-brand-muted">Sidebar stacks into quick-access cards on smaller screens without losing control points.</p></div>
                  <div className="rounded-[24px] bg-[#F7FAFD] p-4"><p className="text-[13px] font-bold">Scannable sections</p><p className="mt-2 text-[13px] leading-relaxed text-brand-muted">Admin modules reflow from single-column mobile to multi-column desktop layouts.</p></div>
                  <div className="rounded-[24px] bg-[#F7FAFD] p-4"><p className="text-[13px] font-bold">Fast action patterns</p><p className="mt-2 text-[13px] leading-relaxed text-brand-muted">Alert triage, RBAC edits, CMS tasks, and integrations remain close to the top of the experience.</p></div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
