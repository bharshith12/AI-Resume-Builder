import React, { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import { Sparkles, FileText, RefreshCw } from 'lucide-react';

export default function SummaryEditor() {
  const { resumeData, updateSummary } = useContext(ResumeContext);
  const [generating, setGenerating] = useState(false);

  const handleAISummary = async () => {
    setGenerating(true);
    try {
      const role = resumeData.personalInfo?.title || 'Software Engineer';
      const skills = resumeData.skills?.technical || ['React', 'Python', 'System Architecture'];
      const res = await aiService.generateSummary(role, skills, 'Senior');
      if (res.result) {
        updateSummary(res.result);
      }
    } catch (e) {
      console.error("AI Summary generation failed:", e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText size={16} className="text-blue-400" /> Executive Professional Summary
        </h3>
        <button
          type="button"
          onClick={handleAISummary}
          disabled={generating}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
        >
          {generating ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} className="text-amber-300" />}
          <span>Generate with AI</span>
        </button>
      </div>

      <textarea
        rows={5}
        value={resumeData.summary || ''}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a high-impact 3-sentence summary highlighting your key technical strengths, achievements, and career focus..."
        className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 leading-relaxed"
      />
    </div>
  );
}
