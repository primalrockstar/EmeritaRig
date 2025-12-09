import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

export type Role = 'student' | 'instructor' | 'admin';

type User = {
  id: string;
  name: string;
  role: Role;
  email: string;
  token?: string;
  emailVerified?: boolean;
  isInstructorVerified?: boolean;
  hasSeenOnboarding?: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, instructorCode?: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const raw = localStorage.getItem('emtb.auth');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          const savedUser = parsed.user;
          if (savedUser?.token) {
            // Verify token with backend
            try {
              const { data } = await api.get('/auth/me');
              const role = (data.role as Role) || 'student';
              const serverUser: User = {
                id: String(data.id ?? 'u_' + Date.now()),
                name: data.name || savedUser.email.split('@')[0],
                role,
                email: data.email || savedUser.email,
                token: savedUser.token,
                emailVerified: !!data.emailVerified,
                isInstructorVerified: !!data.isInstructorVerified,
                hasSeenOnboarding: savedUser.hasSeenOnboarding ?? false,
              };
              setUser(serverUser);
              // Update localStorage with fresh data
              localStorage.setItem('emtb.auth', JSON.stringify({ user: serverUser }));
            } catch (error) {
              // Token invalid, remove from localStorage
              localStorage.removeItem('emtb.auth');
            }
          }
        } catch {}
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string, instructorCode?: string) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    const { data } = await api.post('/auth/login', formData);
    const role = (data.user?.role as Role) || 'student';
    const serverUser: User = {
      id: String(data.user?.id ?? 'u_' + Date.now()),
      name: data.user?.name || email.split('@')[0],
      role,
      email: data.user?.email || email,
      token: data.access_token,
      emailVerified: !!data.user?.emailVerified,
      isInstructorVerified: !!data.user?.isInstructorVerified,
      hasSeenOnboarding: false, // Default to false on login
    };
    setUser(serverUser);
    localStorage.setItem('emtb.auth', JSON.stringify({ user: serverUser }));
  };

  const signup = async (email: string, password: string) => {
    const { data } = await api.post('/auth/signup', { email, password });
    const role = (data.user?.role as Role) || 'student';
    const serverUser: User = {
      id: String(data.user?.id ?? 'u_' + Date.now()),
      name: data.user?.name || email.split('@')[0],
      role,
      email: data.user?.email || email,
      token: data.access_token,
      emailVerified: !!data.user?.emailVerified,
      isInstructorVerified: !!data.user?.isInstructorVerified,
      hasSeenOnboarding: false,
    };
    setUser(serverUser);
    localStorage.setItem('emtb.auth', JSON.stringify({ user: serverUser }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emtb.auth');
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, hasSeenOnboarding: true };
      setUser(updatedUser);
      localStorage.setItem('emtb.auth', JSON.stringify({ user: updatedUser }));
    }
  };

  const value = useMemo(() => ({ user, loading, login, signup, logout, completeOnboarding }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const RequireRole: React.FC<{ role: Role; children: React.ReactNode }> = ({ role, children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading…</div>;
  if (!user || (role !== user.role && user.role !== 'admin')) {
    // Redirect by rendering a simple link prompt for SPA simplicity
    return (
      <main className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
          Unauthorized. Please <a className="underline" href="/login">log in</a> as {role}.
        </div>
      </main>
    );
  }
  // Additional instructor verification gate
  if (role === 'instructor' && !user.isInstructorVerified) {
    return (
      <main className="p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
          Instructor account requires verification. Contact your admin or use your SSO invite.
        </div>
      </main>
    );
  }
  return <>{children}</>;
};
