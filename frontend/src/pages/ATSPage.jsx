import React, { useState, useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import { atsService } from '../services/atsService';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import confetti from 'canvas-confetti';
import { ShieldCheck, Sparkles, AlertCircle, CheckCircle2, Search, ArrowRight, RefreshCw, Cpu, FileText } from 'lucide-react';

export default function ATSPage() {
  const { resumeData, atsScore, targetJobDescription, setTargetJobDescription } = useContext(ResumeContext);
  const [analyzing, setAnalyzing] = useState(false);
  const [atsReport, setAtsReport] = useState(null);

  const handleRunAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await atsService.analyzeATS(resumeData, targetJobDescription);
      setAtsReport(res);
      if (res.overall_score >= 80) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error("ATS Analysis failed:", e);
    } finally {
      setAnalyzing(false);
    }
  };

  const activeReport = atsReport || {
    overall_score: atsScore,
    breakdown: { formatting: 18, keyword_match: 16, action_verbs: 18, readability: 18, section_completeness: 18 },
    matched_keywords: ["react", "python", "fastapi", "postgresql", "docker", "tailwind css", "git", "rest api"],
    missing_keywords: ["kubernetes", "ci/cd", "redis", "system design", "microservices"],
    weak_bullet_points: ["Worked on frontend components using React and HTML."],
    action_verb_suggestions: ["Replace 'worked on' with 'Architected' or 'Spearheaded'."],
    formatting_issues: ["Include quantifiable metrics (e.g. '% gain', '$ saved') in bullet points."],
    improvement_recommendations: [
      "Add Kubernetes and CI/CD to technical skills tags.",
      "Quantify achievements in Work Experience (e.g. 'Improved speed by 35%')."
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-xs">
            <ShieldCheck size={14} /> Enterprise ATS Compatibility Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ATS Score Checker & Job Description Optimizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Audit your resume against applicant tracking system (ATS) algorithms used by Workday, Greenhouse, and Lever.
          </p>
        </div>

        {/* Job Description Paste Box */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-blue-400" /> Target Job Description (Paste Here)
            </label>
            <button
              onClick={handleRunAnalysis}
              disabled={analyzing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {analyzing ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} className="text-amber-300" />}
              <span>Run Deep ATS Analysis</span>
            </button>
          </div>

          <textarea
            rows={5}
            value={targetJobDescription}
            onChange={(e) => setTargetJobDescription(e.target.value)}
            placeholder="Paste target Job Description text here to compare required skills, keywords, and qualifications..."
            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
          />
        </div>

        {/* ATS Score Overview & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Scorecard (Cols 4) */}
          <div className="lg:col-span-4 p-6 rounded-3xl glass-card border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Overall ATS Score</span>
            
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-8 border-slate-800" />
              <div
                className="absolute inset-0 rounded-full border-8 border-emerald-500 border-t-transparent border-r-transparent animate-spin-slow"
                style={{ transform: `rotate(${activeReport.overall_score * 3.6}deg)` }}
              />
              <div className="text-4xl font-extrabold text-white">
                {activeReport.overall_score}
                <span className="block text-xs font-normal text-slate-400 mt-1">out of 100</span>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              {activeReport.overall_score >= 80 ? "🎉 Exceptional! Your resume passes 95%+ of ATS parsers." : "⚠️ Good start. Implement recommendations below to reach 85+."}
            </p>
          </div>

          {/* Detailed Vectors (Cols 8) */}
          <div className="lg:col-span-8 p-6 rounded-3xl glass-card border border-white/10 space-y-6">
            <h3 className="font-bold text-white text-base">ATS Analysis Breakdown</h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Keyword Match Density</span>
                  <span className="font-bold text-blue-400">{activeReport.breakdown.keyword_match} / 20</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${(activeReport.breakdown.keyword_match / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Action Power Verbs</span>
                  <span className="font-bold text-purple-400">{activeReport.breakdown.action_verbs} / 20</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${(activeReport.breakdown.action_verbs / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Readability & Metrics</span>
                  <span className="font-bold text-emerald-400">{activeReport.breakdown.readability} / 20</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(activeReport.breakdown.readability / 20) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Contact & Formatting Integrity</span>
                  <span className="font-bold text-amber-400">{activeReport.breakdown.formatting} / 20</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${(activeReport.breakdown.formatting / 20) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Matched vs Missing Keywords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-2">
              <CheckCircle2 size={16} /> Matched Keywords Found
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeReport.matched_keywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <h3 className="font-bold text-rose-400 text-sm flex items-center gap-2">
              <AlertCircle size={16} /> Missing Keywords to Include
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {activeReport.missing_keywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
