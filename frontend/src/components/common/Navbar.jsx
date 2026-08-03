import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Sun, Moon, FileText, BarChart3, ShieldCheck, User, LogOut, LayoutDashboard } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { ResumeContext } from '../../context/ResumeContext';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { atsScore } = useContext(ResumeContext);
  const location = useLocation();

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    if (score >= 60) return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-gradient">ResumAI</span>
          <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            PRO ATS
          </span>
        </div>
      </Link>

      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/10 text-sm font-medium">
        <Link
          to="/builder"
          className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${location.pathname === '/builder' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
        >
          <FileText size={16} /> Builder
        </Link>
        <Link
          to="/ats"
          className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${location.pathname === '/ats' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
        >
          <BarChart3 size={16} /> ATS Checker
        </Link>
        <Link
          to="/cover-letter"
          className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${location.pathname === '/cover-letter' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
        >
          <Sparkles size={16} /> AI Cover Letter
        </Link>
        <Link
          to="/dashboard"
          className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-2 ${location.pathname === '/dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
        >
          <LayoutDashboard size={16} /> Dashboard
        </Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* ATS Score Indicator */}
        <Link to="/ats" className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all hover:scale-105 ${getScoreColor(atsScore)}`}>
          <ShieldCheck size={14} /> ATS Score: {atsScore}/100
        </Link>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10 transition-all"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-blue-400" />}
        </button>

        {/* User Account Button */}
        {user ? (
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs border border-white/20">
                {user.full_name ? user.full_name[0] : 'U'}
              </div>
              <span className="hidden lg:inline-block text-xs font-semibold text-slate-200">{user.full_name?.split(' ')[0]}</span>
            </Link>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
