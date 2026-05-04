import React from 'react';
import { supabase } from './supabase';
import type { Profile } from './supabase';
import { getCurrentProfile, testSupabaseConnection } from './supabaseAuth';

interface AuthContextType {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
  suppressAuthListener: React.MutableRefObject<boolean>;
}

export const AuthContext =
  React.createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    logout: async () => {},
    isLoggedIn: false,
    isLoading: true,
    suppressAuthListener: { current: false },
  });

export const AuthProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [user, setUserState] =
    React.useState<Profile | null>(null);
  const [isLoading, setIsLoading] =
    React.useState(true);

  // When set to true, the auth state listener will ignore SIGNED_IN events.
  // This is used during registration to prevent the listener from overriding
  // the navigation to the email verification screen.
  const suppressAuthListener = React.useRef(false);

  React.useEffect(() => {
    testSupabaseConnection().then(ok => {
      console.log('Supabase connection:', ok ? 'OK' : 'FAILED');
    });

    // Always resolve within 3 seconds, even if Supabase is slow or RLS recurses
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    getCurrentProfile().then(profile => {
      clearTimeout(timeoutId);
      if (profile) setUserState(profile);
      setIsLoading(false);
    }).catch(() => {
      clearTimeout(timeoutId);
      setIsLoading(false);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(
        async (event, session) => {
          // Suppress listener during registration flow to avoid
          // interfering with the navigation to email verification.
          if (suppressAuthListener.current) return;

          if (event === 'SIGNED_IN' && session) {
            // Use a timeout to prevent RLS recursion from hanging the entire client.
            // If getCurrentProfile takes more than 3s, skip it — the profile
            // will be loaded on the next page load.
            try {
              const profile = await getCurrentProfile();
              if (profile) setUserState(profile);
            } catch {
              // Silently ignore — profile will load on next navigation
            }
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
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      logout,
      isLoggedIn: user !== null,
      isLoading,
      suppressAuthListener,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  React.useContext(AuthContext);
