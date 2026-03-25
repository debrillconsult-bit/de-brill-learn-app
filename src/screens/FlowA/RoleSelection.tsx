import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar, DiagonalHeader } from '@/src/components/Layout';
import { Button } from '@/src/components/Button';
import { Baby, GraduationCap, UserRound, Users } from 'lucide-react';

const roles = [
  {
    id: 'child',
    title: 'Young Learner',
    subtitle: 'Ages 2-5',
    icon: Baby,
    color: '#7B1FA2',
    path: '/account-creation?role=child'
  },
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Ages 5-11',
    icon: GraduationCap,
    color: '#1565C0',
    path: '/account-creation?role=student'
  },
  {
    id: 'teacher',
    title: 'Teacher',
    subtitle: 'Manage classes',
    icon: UserRound,
    color: '#2E7D32',
    path: '/account-creation?role=teacher'
  },
  {
    id: 'parent',
    title: 'Parent',
    subtitle: 'Track progress',
    icon: Users,
    color: '#B71C1C',
    path: '/account-creation?role=parent'
  }
];

export const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-brand-offwhite">
      <StatusBar />
      <DiagonalHeader title="Who is using the app?" />
      
      <div className="flex-1 p-6 grid grid-cols-2 gap-4 auto-rows-fr">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => navigate(role.path)}
            className="bg-white rounded-[12px] border border-[#DDDDDD] p-6 flex flex-col items-center justify-center text-center gap-3 transition-transform active:scale-95"
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-1"
              style={{ backgroundColor: `${role.color}15` }}
            >
              <role.icon size={32} style={{ color: role.color }} />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-brand-navy">{role.title}</h3>
              <p className="text-[12px] text-brand-muted">{role.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-6 pb-12">
        <Button variant="outline" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
};
