import React, { useState, useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import { aiService } from '../services/aiService';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Sparkles, FileText, Download, Copy, RefreshCw, Check } from 'lucide-react';

export default function CoverLetterPage() {
  const { resumeData } = useContext(ResumeContext);
  const [companyName, setCompanyName] = useState('Google Inc.');
  const [jobTitle, setJobTitle] = useState('Senior Full Stack AI Engineer');
  const [jobDesc, setJobDesc] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager,\n\nI am writing to express my strong enthusiasm for the Senior Full Stack AI Engineer role at Google Inc. With a robust background in software engineering and expertise in React, FastAPI, PostgreSQL, and System Architecture, I am confident in my ability to make an immediate impact on your engineering initiatives.\n\nThroughout my career, I have focused on building scalable, user-centric software solutions that solve complex technical problems. At my previous roles, I spearheaded key product enhancements that improved application performance by over 40% and elevated overall user satisfaction.\n\nGoogle Inc.'s commitment to engineering excellence aligns perfectly with my career aspirations. I am eager to contribute my technical knowledge to help achieve your strategic goals.\n\nThank you for your time and consideration.\n\nSincerely,\nAlex Rivera`
  );

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const payload = {
        company_name: companyName,
        job_title: jobTitle,
        job_description: jobDesc,
        applicant_name: resumeData.personalInfo?.fullName || 'Alex Rivera',
        applicant_skills: resumeData.skills?.technical || ['React', 'FastAPI', 'PostgreSQL'],
        applicant_experience: resumeData.summary || ''
      };
      const res = await aiService.generateCoverLetter(payload);
      if (res.result) {
        setCoverLetter(res.result);
      }
    } catch (e) {
      console.error("Cover letter generation failed:", e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold text-xs">
            <Sparkles size={14} /> AI Cover Letter Generator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Executive Cover Letters
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Generate customized, high-converting cover letters matching your resume skills directly to target company roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs (Cols 5) */}
          <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-white/10 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm pb-2 border-b border-white/10">Target Role Details</h3>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Google Inc."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Senior Full Stack AI Engineer"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Job Description Snippet (Optional)</label>
              <textarea
                rows={4}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste key responsibilities or required qualifications..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {generating ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} className="text-amber-300" />}
              <span>Generate AI Cover Letter</span>
            </button>
          </div>

          {/* Letter Preview Stage (Cols 7) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Live Cover Letter Preview</span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium flex items-center gap-1 transition-all"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>
            </div>

            <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl min-h-[500px] leading-relaxed text-sm font-sans whitespace-pre-wrap border border-slate-200">
              {coverLetter}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
