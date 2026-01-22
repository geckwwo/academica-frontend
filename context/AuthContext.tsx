import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  needsOnboarding: boolean;
  setNeedsOnboarding: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (using localStorage)
    const checkAuth = () => {
      const authToken = localStorage.getItem('auth_token');
      if (authToken) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - just set auth state without backend call
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_email', email);
    setIsAuthenticated(true);
    setNeedsOnboarding(false);
  };

  const register = async (email: string, username: string, password: string) => {
    // Mock registration - just set auth state without backend call
    localStorage.setItem('auth_token', 'mock_token');
    localStorage.setItem('user_email', email);
    localStorage.setItem('user_username', username);
    setIsAuthenticated(true);
    setNeedsOnboarding(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_username');
    setIsAuthenticated(false);
    setNeedsOnboarding(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        needsOnboarding,
        setNeedsOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
