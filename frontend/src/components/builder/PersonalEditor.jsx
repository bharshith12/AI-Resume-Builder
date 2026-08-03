import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Image, Crop, Circle, Square, Layout } from 'lucide-react';

export default function PersonalEditor() {
  const { resumeData, updatePersonalInfo, customization, updateCustomization } = useContext(ResumeContext);
  const p = resumeData.personalInfo || {};

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photoUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 text-xs">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
        <User size={16} className="text-blue-400" /> Personal Details & Photo
      </h3>

      {/* Photo Upload & Shape Styler */}
      <div className="p-3 bg-slate-900/60 rounded-xl border border-white/10 flex flex-wrap items-center gap-4">
        <div className="relative group">
          {p.photoUrl ? (
            <img
              src={p.photoUrl}
              alt="Preview"
              className={`w-16 h-16 object-cover border-2 border-blue-500 shadow-md ${customization.photoShape === 'circle' ? 'rounded-full' : customization.photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none'}`}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-dashed border-slate-600 flex items-center justify-center text-slate-400">
              <Image size={20} />
            </div>
          )}
        </div>

        <div className="space-y-2 flex-1">
          <label className="block font-semibold text-slate-300">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
          />
        </div>

        {/* Photo Shape Toggle */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => updateCustomization('photoShape', 'circle')}
            className={`p-1.5 rounded ${customization.photoShape === 'circle' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Circle Shape"
          >
            <Circle size={14} />
          </button>
          <button
            type="button"
            onClick={() => updateCustomization('photoShape', 'rounded')}
            className={`p-1.5 rounded ${customization.photoShape === 'rounded' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Rounded Square"
          >
            <Layout size={14} />
          </button>
          <button
            type="button"
            onClick={() => updateCustomization('photoShape', 'square')}
            className={`p-1.5 rounded ${customization.photoShape === 'square' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            title="Square"
          >
            <Square size={14} />
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-slate-300 font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={p.fullName || ''}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="Alex Rivera"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Job Headline / Title</label>
          <input
            type="text"
            value={p.title || ''}
            onChange={(e) => updatePersonalInfo('title', e.target.value)}
            placeholder="Senior Full Stack & AI Engineer"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={p.email || ''}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="alex.rivera@example.com"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={p.phone || ''}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="+1 (555) 019-2831"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Location / Address</label>
          <input
            type="text"
            value={p.address || ''}
            onChange={(e) => updatePersonalInfo('address', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">LinkedIn URL</label>
          <input
            type="text"
            value={p.linkedin || ''}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">GitHub URL</label>
          <input
            type="text"
            value={p.github || ''}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            placeholder="https://github.com/username"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-medium mb-1">Portfolio Website</label>
          <input
            type="text"
            value={p.portfolio || ''}
            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
            placeholder="https://yourportfolio.dev"
            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
