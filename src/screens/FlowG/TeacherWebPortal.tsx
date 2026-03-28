import React from 'react';
import { Navigate } from 'react-router-dom';
import { setStoredUserRole } from '@/src/features/admin/services/adminApi';

export const TeacherWebPortal = () => {
  React.useEffect(() => {
    setStoredUserRole('admin');
  }, []);

  return <Navigate to="/admin/dashboard" replace />;
};
