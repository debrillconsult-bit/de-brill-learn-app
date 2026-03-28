import React from 'react';
import { supabase } from './supabase';
import type { Profile } from './supabase';
import { getCurrentProfile } from './supabaseAuth';

interface AuthContextType {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const AuthContext =
  React.createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    logout: async () => {},
    isLoggedIn: false,
    isLoading: true,
  });

export const AuthProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [user, setUserState] =
    React.useState<Profile | null>(null);
  const [isLoading, setIsLoading] =
    React.useState(true);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    getCurrentProfile().then(profile => {
      clearTimeout(timeoutId);
      setUserState(profile);
      setIsLoading(false);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            const profile = await getCurrentProfile();
            setUserState(profile);
          } else if (event === 'SIGNED_OUT') {
            setUserState(null);
          }
        }
      );

    return () => {
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const setUser = (u: Profile | null) => {
    setUserState(u);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      logout,
      isLoggedIn: user !== null,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  React.useContext(AuthContext);
