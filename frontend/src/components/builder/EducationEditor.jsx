import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

export default function EducationEditor() {
  const { resumeData, updateEducation } = useContext(ResumeContext);
  const education = resumeData.education || [];

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "State University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "San Francisco, CA",
      startDate: "2018-08",
      endDate: "2022-05",
      gpa: "3.8 / 4.0"
    };
    updateEducation([...education, newEdu]);
  };

  const removeEducation = (idx) => {
    const updated = education.filter((_, i) => i !== idx);
    updateEducation(updated);
  };

  const updateEduField = (idx, field, value) => {
    const updated = [...education];
    updated[idx][field] = value;
    updateEducation(updated);
  };

  return (
    <div className="space-y-4 text-xs">
      <div className="flex justify-between items-center pb-2 border-b border-white/10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <GraduationCap size={16} className="text-blue-400" /> Education & Degrees
        </h3>
        <button
          type="button"
          onClick={addEducation}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1 transition-all"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      {education.map((edu, idx) => (
        <div key={edu.id || idx} className="p-4 bg-slate-900/80 rounded-xl border border-white/10 space-y-3 relative">
          <button
            onClick={() => removeEducation(idx)}
            className="absolute top-3 right-3 text-slate-400 hover:text-rose-400 p-1"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
            <div>
              <label className="block text-slate-300 font-medium mb-1">University / Institution</label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => updateEduField(idx, 'institution', e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Degree Title</label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => updateEduField(idx, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Field of Study / Major</label>
              <input
                type="text"
                value={edu.field || ''}
                onChange={(e) => updateEduField(idx, 'field', e.target.value)}
                placeholder="Computer Science"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Dates Attended</label>
              <input
                type="text"
                value={`${edu.startDate || ''} - ${edu.endDate || ''}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  updateEduField(idx, 'startDate', parts[0]?.trim());
                  updateEduField(idx, 'endDate', parts[1]?.trim());
                }}
                placeholder="2018 - 2022"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
