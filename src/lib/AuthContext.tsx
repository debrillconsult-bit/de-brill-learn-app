import React from 'react';
import { User, getCurrentUser, logoutUser } from './auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = React.useState<User | null>(getCurrentUser);

  const setUser = (u: User | null) => {
    setUserState(u);
  };

  const logout = () => {
    logoutUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isLoggedIn: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
