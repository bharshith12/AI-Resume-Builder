import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 pt-12 pb-8 px-6 lg:px-12 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">ResumAI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Enterprise AI-powered Resume Builder and ATS Optimization Platform built for Software Engineers, Product Leaders & Industry Professionals.
          </p>
          <div className="flex gap-3 text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors"><Github size={18} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Product</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/builder" className="hover:text-white transition-colors">AI Resume Builder</a></li>
            <li><a href="/ats" className="hover:text-white transition-colors">ATS Score Analyzer</a></li>
            <li><a href="/cover-letter" className="hover:text-white transition-colors">AI Cover Letter Writer</a></li>
            <li><a href="#" className="hover:text-white transition-colors">30+ Professional Templates</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Templates</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">Harvard & Ivy League</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Software Engineering</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Executive Leadership</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Minimalist ATS Classic</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Engineering</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>© {new Date().getFullYear()} ResumAI Platform Inc. All rights reserved.</div>
        <div className="flex items-center gap-1">
          Engineered with <Heart size={12} className="text-rose-500 fill-rose-500" /> for global engineers
        </div>
      </div>
    </footer>
  );
}
