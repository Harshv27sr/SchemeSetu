import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

const Register = () => {
  const { signup, loading, t } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const res = await signup(name, email, password, 'Citizen');
    if (res.success) {
      navigate('/profile'); // Send them to fill details immediately! Highly intuitive user flow
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#e8edf2] dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background radial effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-govgreen-100/30 dark:bg-govgreen-950/10 rounded-full blur-3xl -z-10"></div>

      <motion.div
        className="max-w-md w-full space-y-8 bg-slate-50/85 dark:bg-slate-900/85 backdrop-blur-md p-8 rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl shadow-slate-300/20 dark:shadow-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-govgreen-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-govgreen-100 dark:shadow-none">
            SS
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create Profile</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Register as a citizen to track scheme benefits</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-start space-x-2 text-rose-700 dark:text-rose-450 text-sm animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} autoComplete="off">
          {/* Full Name field */}
          <div className="space-y-1.5">
            <label className="form-label">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500">
                <User className="w-4.5 h-4.5" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input pl-10"
                placeholder="e.g. Rahul Sharma"
                autoComplete="new-name"
              />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="form-label">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10"
                placeholder="e.g. rahul@example.com"
                autoComplete="new-email"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="form-label">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pl-10"
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div className="space-y-1.5">
            <label className="form-label">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input pl-10"
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-govgreen-600 hover:bg-govgreen-700 text-white font-bold rounded-xl shadow-lg shadow-govgreen-100/50 dark:shadow-none hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-govblue-600 dark:text-govblue-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
