import React, { useContext } from 'react';
import { ResumeContext } from '../../context/ResumeContext';
import { FONT_OPTIONS, COLOR_THEMES } from '../../utils/constants';
import { Palette, Type, Sliders, LayoutGrid, RotateCcw } from 'lucide-react';

export default function CustomizerToolbar() {
  const { templateId, setTemplateId, customization, updateCustomization } = useContext(ResumeContext);

  return (
    <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 space-y-4 text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Palette size={16} className="text-blue-400" /> Resume Design & Formatting Customizer
        </h3>
        <button
          onClick={() => {
            updateCustomization('fontFamily', 'Inter');
            updateCustomization('themeColor', '#3b82f6');
            updateCustomization('fontSize', 14);
            updateCustomization('lineHeight', 1.5);
          }}
          className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
        >
          <RotateCcw size={12} /> Reset Styling
        </button>
      </div>

      {/* Font Family Picker */}
      <div>
        <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
          <Type size={14} className="text-blue-400" /> Select Typography Font
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FONT_OPTIONS.map(font => (
            <button
              key={font.id}
              onClick={() => updateCustomization('fontFamily', font.id)}
              className={`p-2 rounded-xl border text-left transition-all ${customization.fontFamily === font.id ? 'bg-blue-600/30 border-blue-500 text-white shadow-md' : 'bg-slate-950 border-white/10 text-slate-300 hover:border-slate-600'}`}
              style={{ fontFamily: font.family }}
            >
              <div className="font-bold text-xs">{font.id}</div>
              <div className="text-[10px] text-slate-400 truncate">{font.name.split('(')[1]?.replace(')', '') || ''}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette Theme */}
      <div>
        <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1">
          <Palette size={14} className="text-blue-400" /> Color Accent Theme
        </label>
        <div className="flex flex-wrap gap-2">
          {COLOR_THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => {
                updateCustomization('themeColor', theme.accent);
                updateCustomization('primaryColor', theme.primary);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${customization.themeColor === theme.accent ? 'bg-slate-800 border-white ring-2 ring-blue-500 text-white' : 'bg-slate-950 border-white/10 text-slate-300 hover:border-slate-600'}`}
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.accent }} />
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders: Font Size & Line Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
        <div>
          <div className="flex justify-between text-slate-300 mb-1 font-medium">
            <span>Font Size Scale</span>
            <span className="text-blue-400 font-bold">{customization.fontSize}px</span>
          </div>
          <input
            type="range"
            min={12}
            max={18}
            step={0.5}
            value={customization.fontSize || 14}
            onChange={(e) => updateCustomization('fontSize', parseFloat(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 mb-1 font-medium">
            <span>Line Height Spacing</span>
            <span className="text-blue-400 font-bold">{customization.lineHeight}</span>
          </div>
          <input
            type="range"
            min={1.2}
            max={2.0}
            step={0.1}
            value={customization.lineHeight || 1.5}
            onChange={(e) => updateCustomization('lineHeight', parseFloat(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
