import React, { useState, useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { aiService } from '../../services/aiService';
import { FolderGit2, Plus, Trash2, Sparkles, RefreshCw } from 'lucide-react';

export default function ProjectsEditor() {
  const { resumeData, updateProjects } = useContext(ResumeContext);
  const projects = resumeData.projects || [];
  const [generating, setGenerating] = useState(false);

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "Real-time AI Application",
      description: "Engineered scalable web application using React, FastAPI, and PostgreSQL with automated CI/CD deployment.",
      technologies: ["React", "FastAPI", "PostgreSQL", "Docker"],
      github: "https://github.com/example/project",
      liveDemo: "https://demo.com"
    };
    updateProjects([...projects, newProj]);
  };

  const removeProject = (idx) => {
    const updated = projects.filter((_, i) => i !== idx);
    updateProjects(updated);
  };

  const updateProjField = (idx, field, value) => {
    const updated = [...projects];
    updated[idx][field] = value;
    updateProjects(updated);
  };

  const handleAIProjectGenerate = async () => {
    setGenerating(true);
    try {
      const role = resumeData.personalInfo?.title || 'Software Engineer';
      const tech = resumeData.skills?.technical || ['React', 'FastAPI', 'PostgreSQL'];
      const res = await aiService.generateProject(role, 'Enterprise SaaS', tech);
      if (res.result) {
        updateProjects([...projects, res.result]);
      }
    } catch (e) {
      console.error("AI Project Generation failed:", e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <FolderGit2 size={16} className="text-blue-400" /> Projects & Architecture
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAIProjectGenerate}
            disabled={generating}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold flex items-center gap-1 transition-all disabled:opacity-50"
          >
            {generating ? <RefreshCw size={12} className="animate-spin" /> : <Sparkles size={12} className="text-amber-300" />} AI Project Generator
          </button>
          <button
            type="button"
            onClick={addProject}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 transition-all"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      {projects.map((proj, idx) => (
        <div key={proj.id || idx} className="p-4 bg-slate-900/80 rounded-xl border border-white/10 space-y-3 relative">
          <button
            onClick={() => removeProject(idx)}
            className="absolute top-3 right-3 text-slate-400 hover:text-rose-400 p-1"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Project Title</label>
              <input
                type="text"
                value={proj.title || ''}
                onChange={(e) => updateProjField(idx, 'title', e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Technologies Used (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || '')}
                onChange={(e) => updateProjField(idx, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                placeholder="React, FastAPI, Docker, PostgreSQL"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Project Description & Architecture Impact</label>
            <textarea
              rows={2}
              value={proj.description || ''}
              onChange={(e) => updateProjField(idx, 'description', e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
