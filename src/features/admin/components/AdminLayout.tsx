import React from 'react';
import {
  BarChart3,
  BookOpen,
  Layers3,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROLE_STORAGE_KEY, getStoredUserRole } from '@/src/features/admin/services/adminApi';

const navigation = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Content', to: '/admin/content', icon: BookOpen },
  { label: 'Classes', to: '/admin/classes', icon: Layers3 },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
];

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const userRole = getStoredUserRole();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // TODO: restore auth check when auth system is implemented
  // if (userRole !== 'admin') {
  //   return <Navigate to="/home-student" replace />;
  // }

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(ADMIN_ROLE_STORAGE_KEY);
    }
    navigate('/home-student', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#EEF3F8] text-brand-navy">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside
          className={`${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } fixed inset-y-0 left-0 z-40 w-[290px] border-r border-white/10 bg-brand-navy text-white transition-transform lg:static lg:flex lg:min-h-screen`}
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between px-5 py-5 lg:px-6 lg:py-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold text-brand-navy">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-[18px] font-bold">De-Brill Admin</p>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Control Center</p>
                </div>
              </div>
              <button className="rounded-xl bg-white/10 p-2 lg:hidden" onClick={() => setIsMenuOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-2 px-4 pb-5 lg:px-5">
              {navigation.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-[13px] font-bold transition-colors ${
                      isActive ? 'bg-brand-gold text-brand-navy' : 'bg-white/5 text-white/85 hover:bg-white/10'
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mx-4 mt-auto mb-4 rounded-[24px] border border-white/10 bg-white/5 p-4 lg:mx-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 font-bold">
                  AD
                </div>
                <div>
                  <p className="text-[14px] font-bold">Admin Access</p>
                  <p className="text-[12px] text-white/60">Role from localStorage</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10244E] px-4 py-3 text-[13px] font-bold"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {isMenuOpen ? <button className="fixed inset-0 z-30 bg-brand-navy/30 lg:hidden" onClick={() => setIsMenuOpen(false)} /> : null}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-[#D8E1EC] bg-white/90 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-brand-gold">Admin Panel</p>
                <h1 className="mt-2 text-[26px] font-bold">Manage users, learning content, and classes</h1>
              </div>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="rounded-2xl border border-[#D8E1EC] bg-white p-3 lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-5 lg:px-8 lg:py-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
