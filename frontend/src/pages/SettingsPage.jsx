import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { User, Mail, Shield, Check, Key } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useContext(AuthContext);
  const [fullName, setFullName] = useState(user?.full_name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex.rivera@example.com');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-white">Account Settings & Security</h1>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-white pb-2 border-b border-white/10 flex items-center gap-2">
            <User size={16} className="text-blue-400" /> Personal Profile
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
            >
              {saved ? <Check size={14} className="text-emerald-400" /> : null}
              <span>{saved ? 'Saved Changes' : 'Save Changes'}</span>
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
