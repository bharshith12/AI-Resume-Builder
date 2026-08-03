import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, Download, ChevronRight, CheckCircle2, Star, ArrowRight, Layers, Layout, Bot } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Real-time ATS Scoring Engine",
      description: "Instantly audit your resume formatting, keyword density, action verb strength, and readability against target Job Descriptions."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-400" />,
      title: "AI Writer & Resume Generator",
      description: "Powered by OpenAI & Gemini. Generate executive summaries, optimize bullet points, and build full technical projects with 1 click."
    },
    {
      icon: <Layout className="w-6 h-6 text-purple-400" />,
      title: "30+ Professional Templates",
      description: "Harvard, Stanford, Google Tech, Executive Leadership, and Creative styles designed by top industry recruiters and ATS experts."
    },
    {
      icon: <Download className="w-6 h-6 text-amber-400" />,
      title: "Multi-Format Export",
      description: "Export pixel-perfect PDFs preserving custom typography, spacing, margins, or download editable DOCX & JSON files."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Senior Staff Engineer @ Google",
      text: "ResumAI transformed my traditional resume into a high-scoring ATS masterpiece. Landed interviews at Google, Meta, and OpenAI within 2 weeks!",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Marcus Vance",
      role: "Principal Product Manager",
      text: "The Job Description keyword matching feature is unmatched. It precisely pinpointed the exact missing skills I needed to highlight for leadership roles.",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const faqs = [
    {
      q: "How does the ATS Checker score my resume?",
      a: "Our ATS engine parses your resume across 5 key vectors: Contact Formatting, Section Completeness, Action Power Verbs, Metric Proofs, and Job Description Keyword Matching. You receive an overall score out of 100 with actionable improvement tips."
    },
    {
      q: "Are the generated PDF files ATS friendly?",
      a: "Yes! All 30 templates use standard text layers, clean font hierarchies, and selectable text layout vectors that ATS parsers like Workday, Greenhouse, and Lever read flawlessly."
    },
    {
      q: "Can I export to Microsoft Word (DOCX)?",
      a: "Absolutely! You can export your resume to PDF, editable Word (.docx), and structured raw JSON formats anytime."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold text-xs mb-6 shadow-glow">
            <Sparkles size={14} /> Next-Gen AI Resume Platform 2.0
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Build ATS-Proof Resumes <br />
            <span className="text-gradient">Powered by Artificial Intelligence</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Create SaaS-quality, recruiter-approved resumes tailored for top tech MNCs. Check ATS compatibility, optimize bullet points with AI, and land 3x more interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              to="/builder"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 group"
            >
              Build Your Resume Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ats"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-base border border-white/10 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck size={18} className="text-emerald-400" /> Check ATS Score
            </Link>
          </div>

          {/* Hero Preview Card Mockup */}
          <div className="relative mx-auto max-w-4xl rounded-2xl glass-card border border-white/15 p-4 sm:p-6 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 font-mono">resumai-editor.app</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                ATS Compatibility: 98/100
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-3 p-4 bg-slate-900/90 rounded-xl border border-white/10 text-xs">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <Bot className="text-blue-400" size={16} /> AI Optimization Log
                </div>
                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  ✓ Replaced weak verb "worked on" with "Spearheaded microservices architecture".
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  ✓ Added 5 missing keywords: PostgreSQL, Docker, FastAPI, System Design, CI/CD.
                </div>
              </div>

              <div className="col-span-2 bg-white text-slate-900 p-6 rounded-xl shadow-lg font-sans text-xs space-y-3">
                <div className="border-b pb-2">
                  <h3 className="text-lg font-extrabold text-slate-900">ALEX RIVERA</h3>
                  <p className="text-blue-600 font-semibold">Senior Full Stack AI Engineer</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase border-b pb-0.5 mb-1">Experience</h4>
                  <p className="font-semibold text-slate-800">Senior Software Engineer — CloudScale Inc.</p>
                  <p className="text-slate-600">• Architected distributed APIs handling 5M+ daily events with 99.9% uptime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 lg:px-12 bg-slate-900/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
              Engineered for Enterprise Career Success
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to create, optimize, and export high-conversion resumes that recruiters love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card glass-card-hover border border-white/10 space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/10 w-fit">{f.icon}</div>
                <h3 className="font-bold text-white text-base">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-extrabold text-white text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl glass-card border border-white/10 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-4 text-left font-semibold text-white flex justify-between items-center text-sm"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`transition-transform ${activeFaq === i ? 'rotate-90 text-blue-400' : 'text-slate-400'}`} size={18} />
              </button>
              {activeFaq === i && (
                <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
