import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ResumeContext } from '../context/ResumeContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FileText, ShieldCheck, Sparkles, Plus, Edit3, Download, Trash2, ArrowUpRight, BarChart2 } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const { atsScore, resumeData } = useContext(ResumeContext);

  const recentResumes = [
    {
      id: 1,
      title: "Senior AI Engineer Resume",
      target_role: "Senior Staff Engineer",
      ats_score: atsScore,
      updated_at: "Just now",
      template: "Harvard Standard"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      target_role: "Full Stack Engineer",
      ats_score: 82,
      updated_at: "2 days ago",
      template: "Google Tech"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">User Dashboard</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Welcome back, {user?.full_name || 'Alex Rivera'} 👋
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Your resume ATS optimization health is in the top 5% of candidate submissions.
            </p>
          </div>

          <Link
            to="/builder"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Plus size={16} /> Create New Resume
          </Link>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Active ATS Score</span>
              <ShieldCheck size={18} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{atsScore}<span className="text-xs text-slate-400 font-normal">/100</span></div>
            <div className="text-[11px] text-emerald-400 font-medium">✓ Passed all major parser audits</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Total Resumes</span>
              <FileText size={18} className="text-blue-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">2</div>
            <div className="text-[11px] text-slate-400">Customized for target roles</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">AI Credits Available</span>
              <Sparkles size={18} className="text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">Unlimited</div>
            <div className="text-[11px] text-purple-400 font-medium">Pro Subscription Active</div>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span className="text-xs font-semibold">Recruiter Views</span>
              <BarChart2 size={18} className="text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">48</div>
            <div className="text-[11px] text-amber-400 font-medium">+14% this week</div>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Your Saved Resumes</h2>
            <Link to="/builder" className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1">
              Open Live Builder <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResumes.map((r) => (
              <div key={r.id} className="p-5 rounded-2xl glass-card border border-white/10 space-y-4 hover:border-blue-500/40 transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">{r.title}</h3>
                    <p className="text-xs text-slate-400">{r.target_role}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {r.ats_score} ATS
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex justify-between border-t border-white/5 pt-3">
                  <span>Template: {r.template}</span>
                  <span>Edited: {r.updated_at}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link
                    to="/builder"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all text-center flex items-center justify-center gap-1"
                  >
                    <Edit3 size={14} /> Edit Resume
                  </Link>
                  <Link
                    to="/ats"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all flex items-center justify-center"
                    title="Audit ATS"
                  >
                    <ShieldCheck size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
