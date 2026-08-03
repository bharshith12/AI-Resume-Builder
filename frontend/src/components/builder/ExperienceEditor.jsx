import React, { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import { Briefcase, Plus, Trash2, Sparkles, GripVertical, RefreshCw } from 'lucide-react';

export default function ExperienceEditor() {
  const { resumeData, updateExperience } = useContext(ResumeContext);
  const experiences = resumeData.experience || [];
  const [optimizingIdx, setOptimizingIdx] = useState(null);

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      position: "Software Engineer",
      company: "Tech Enterprise",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "Present",
      current: true,
      bullets: [
        "Architected scalable microservices using React and Python FastAPI, handling 100k+ daily users.",
        "Optimized database queries resulting in a 40% performance improvement."
      ]
    };
    updateExperience([...experiences, newExp]);
  };

  const removeExperience = (idx) => {
    const updated = experiences.filter((_, i) => i !== idx);
    updateExperience(updated);
  };

  const updateExpField = (idx, field, value) => {
    const updated = [...experiences];
    updated[idx][field] = value;
    updateExperience(updated);
  };

  const addBullet = (expIdx) => {
    const updated = [...experiences];
    updated[expIdx].bullets = [...(updated[expIdx].bullets || []), "Designed and integrated core software features using modern best practices."];
    updateExperience(updated);
  };

  const updateBullet = (expIdx, bulletIdx, value) => {
    const updated = [...experiences];
    updated[expIdx].bullets[bulletIdx] = value;
    updateExperience(updated);
  };

  const removeBullet = (expIdx, bulletIdx) => {
    const updated = [...experiences];
    updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    updateExperience(updated);
  };

  const handleAIBulletOptimize = async (expIdx, bulletIdx, text) => {
    setOptimizingIdx(`${expIdx}-${bulletIdx}`);
    try {
      const res = await aiService.optimizeBullet(text, experiences[expIdx].position);
      if (res.result) {
        updateBullet(expIdx, bulletIdx, res.result);
      }
    } catch (e) {
      console.error("AI Bullet optimization failed:", e);
    } finally {
      setOptimizingIdx(null);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Briefcase size={16} className="text-blue-400" /> Work Experience
        </h3>
        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 transition-all"
        >
          <Plus size={14} /> Add Position
        </button>
      </div>

      {experiences.map((exp, idx) => (
        <div key={exp.id || idx} className="p-4 bg-slate-900/80 rounded-xl border border-white/10 space-y-3 relative group">
          <button
            onClick={() => removeExperience(idx)}
            className="absolute top-3 right-3 text-slate-400 hover:text-rose-400 p-1"
            title="Delete Experience"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Job Position / Role</label>
              <input
                type="text"
                value={exp.position || ''}
                onChange={(e) => updateExpField(idx, 'position', e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => updateExpField(idx, 'company', e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Start Date</label>
              <input
                type="text"
                value={exp.startDate || ''}
                onChange={(e) => updateExpField(idx, 'startDate', e.target.value)}
                placeholder="2022-01"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">End Date</label>
              <input
                type="text"
                value={exp.endDate || ''}
                onChange={(e) => updateExpField(idx, 'endDate', e.target.value)}
                placeholder="Present"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bullet Points */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-slate-300 font-medium">Achievements & Bullet Points</label>
              <button
                type="button"
                onClick={() => addBullet(idx)}
                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
              >
                <Plus size={12} /> Add Bullet
              </button>
            </div>

            <div className="space-y-2">
              {(exp.bullets || []).map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-center gap-2">
                  <span className="text-slate-500">•</span>
                  <input
                    type="text"
                    value={bullet}
                    onChange={(e) => updateBullet(idx, bIdx, e.target.value)}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAIBulletOptimize(idx, bIdx, bullet)}
                    disabled={optimizingIdx === `${idx}-${bIdx}`}
                    className="p-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 transition-all"
                    title="Optimize with AI"
                  >
                    {optimizingIdx === `${idx}-${bIdx}` ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeBullet(idx, bIdx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
