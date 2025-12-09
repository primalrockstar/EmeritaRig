import React, { useState } from 'react';
import { Shield, Lock, Mail } from 'lucide-react';

interface LoginProps {
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Login failed');
      }
      const data = await res.json();
      // Store token in localStorage
      localStorage.setItem('auth_token', data.token);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
        <div className="relative p-10 space-y-6 text-white">
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/20 border border-white/20">
              <Shield className="w-8 h-8" />
            </span>
            <div>
              <h1 className="text-3xl font-semibold">Emerita Clinical Suite</h1>
              <p className="text-slate-200 text-sm mt-2">
                Enter your credentials.
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-100">Email</span>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-400/80">
                <Mail className="w-5 h-5 text-slate-200" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-slate-200/60 text-white"
                  placeholder="user@example.com"
                />
              </div>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-100">Password</span>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-indigo-400/80">
                <Lock className="w-5 h-5 text-slate-200" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none placeholder:text-slate-200/60 text-white"
                  placeholder="••••••••"
                />
              </div>
            </label>

            {error && (
              <p className="text-sm text-red-300 bg-red-950/40 border border-red-800/40 rounded-2xl px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold tracking-wide transition disabled:opacity-60"
            >
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
