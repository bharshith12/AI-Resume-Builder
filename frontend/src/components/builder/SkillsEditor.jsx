import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { Cpu, Plus, X } from 'lucide-react';

export default function SkillsEditor() {
  const { resumeData, updateSkills } = useContext(ResumeContext);
  const techSkills = resumeData.skills?.technical || [];
  const softSkills = resumeData.skills?.soft || [];

  const handleAddTechSkill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const val = e.target.value.trim();
      if (!techSkills.includes(val)) {
        updateSkills({ ...resumeData.skills, technical: [...techSkills, val] });
      }
      e.target.value = '';
    }
  };

  const handleRemoveTechSkill = (skillToRemove) => {
    updateSkills({
      ...resumeData.skills,
      technical: techSkills.filter(s => s !== skillToRemove)
    });
  };

  const handleAddSoftSkill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const val = e.target.value.trim();
      if (!softSkills.includes(val)) {
        updateSkills({ ...resumeData.skills, soft: [...softSkills, val] });
      }
      e.target.value = '';
    }
  };

  const handleRemoveSoftSkill = (skillToRemove) => {
    updateSkills({
      ...resumeData.skills,
      soft: softSkills.filter(s => s !== skillToRemove)
    });
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="pb-2 border-b border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Cpu size={16} className="text-blue-400" /> Technical & Soft Skills
        </h3>
      </div>

      {/* Technical Skills */}
      <div className="p-3 bg-slate-900/80 rounded-xl border border-white/10 space-y-2">
        <label className="block text-slate-300 font-semibold">Technical Skills (Press Enter to add tag)</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {techSkills.map((s, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 flex items-center gap-1 font-medium">
              {s}
              <button type="button" onClick={() => handleRemoveTechSkill(s)} className="hover:text-white">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={handleAddTechSkill}
          placeholder="Type skill (e.g. React, Python, PostgreSQL, Docker) and hit Enter..."
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Soft Skills */}
      <div className="p-3 bg-slate-900/80 rounded-xl border border-white/10 space-y-2">
        <label className="block text-slate-300 font-semibold">Soft Skills & Leadership</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {softSkills.map((s, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 font-medium">
              {s}
              <button type="button" onClick={() => handleRemoveSoftSkill(s)} className="hover:text-white">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          onKeyDown={handleAddSoftSkill}
          placeholder="Type soft skill (e.g. System Design, Agile Leadership) and hit Enter..."
          className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
}
