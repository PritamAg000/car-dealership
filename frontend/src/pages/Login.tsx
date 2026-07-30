import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Car, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = (location.state as any)?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setSubmitting(true);
      await login(email.trim(), password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-luxury-dark bg-[radial-gradient(#1C2541_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-luxury-gold to-luxury-accent items-center justify-center shadow-xl shadow-luxury-accent/20 mb-4">
            <Car className="w-9 h-9 text-luxury-dark stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans">
            APEX <span className="text-luxury-accent">MOTORS</span>
          </h1>
          <p className="text-sm text-luxury-muted mt-1">Sign in to your luxury inventory portal</p>
        </div>

        {/* Card */}
        <div className="glass-panel p-8 rounded-3xl border border-luxury-border/60 shadow-2xl">
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="email"
                  required
                  placeholder="admin@dealership.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-luxury-dark/90 border border-luxury-border/60 text-white placeholder-luxury-muted text-sm focus:outline-none focus:border-luxury-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-luxury-muted uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-luxury-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-luxury-dark/90 border border-luxury-border/60 text-white placeholder-luxury-muted text-sm focus:outline-none focus:border-luxury-accent transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-luxury-gold to-luxury-accent text-luxury-dark font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-luxury-accent/20 flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-luxury-dark border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-luxury-border/40 text-xs text-luxury-muted space-y-1.5">
            <div className="font-semibold text-luxury-accent uppercase tracking-wider">Demo Accounts:</div>
            <div>Admin: <code className="text-white bg-luxury-dark/80 px-1.5 py-0.5 rounded">admin@dealership.com</code> / <code className="text-white bg-luxury-dark/80 px-1.5 py-0.5 rounded">admin123</code></div>
            <div>Customer: <code className="text-white bg-luxury-dark/80 px-1.5 py-0.5 rounded">customer@dealership.com</code> / <code className="text-white bg-luxury-dark/80 px-1.5 py-0.5 rounded">customer123</code></div>
          </div>

          <div className="mt-6 text-center text-sm text-luxury-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-luxury-accent font-semibold hover:underline">
              Create one now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
