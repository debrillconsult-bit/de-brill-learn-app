import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getCurrentProfile } from '../lib/auth';
import type { Profile } from '../lib/supabase';

interface AuthContextType {
  user: Profile | null;
  setUser: (u: Profile | null) => void;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: async () => {},
  isLoggedIn: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 8000);

    getCurrentProfile().then(p => {
      clearTimeout(timeout);
      setUserState(p);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const p = await getCurrentProfile();
        setUserState(p);
      } else if (event === 'SIGNED_OUT') {
        setUserState(null);
      }
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUserState,
        logout,
        isLoggedIn: user !== null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
