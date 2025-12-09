import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [email, setEmail] = useState(location.state?.prefillEmail || 'emtb_admin@webconnect360.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.redirectTo || location.state?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <main className="min-h-[60vh] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        {error && <div className="mb-3 text-red-700 bg-red-50 border border-red-200 rounded p-2 text-sm">{error}</div>}
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input className="w-full border rounded px-3 py-2 mt-1 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email Address" />
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" className="w-full border rounded px-3 py-2 mt-1 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Sign in</button>
        <div className="mt-4 text-xs text-gray-500">
          Contact your administrator for login credentials.
        </div>
      </form>
    </main>
  );
};

export default LoginPage;

