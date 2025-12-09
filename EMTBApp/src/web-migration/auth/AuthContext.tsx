import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Role = 'student' | 'instructor' | 'admin';

type User = {
  id: string;
  name: string;
  role: Role;
  email: string;
  token?: string;
  emailVerified?: boolean;
  isInstructorVerified?: boolean;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, instructorCode?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage (simple demo persistence)
    const raw = localStorage.getItem('emtb.auth');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user ?? null);
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, instructorCode?: string) => {
    const res = await fetch('http://localhost:8001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    const role = (data.user?.role as Role) || 'student';
    const serverUser: User = {
      id: String(data.user?.id ?? 'u_' + Date.now()),
      name: data.user?.name || email.split('@')[0],
      role,
      email: data.user?.email || email,
      token: data.token,
      emailVerified: !!data.user?.emailVerified,
      isInstructorVerified: !!data.user?.isInstructorVerified,
    };
    setUser(serverUser);
    localStorage.setItem('emtb.auth', JSON.stringify({ user: serverUser }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('emtb.auth');
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const RequireRole: React.FC<{ role: Role; children: React.ReactNode }> = ({ role, children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loadingâ€¦</div>;
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

