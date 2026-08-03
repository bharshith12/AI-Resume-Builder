import React, { useState, useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';
import Navbar from '../components/common/Navbar';
import PersonalEditor from '../components/builder/PersonalEditor';
import SummaryEditor from '../components/builder/SummaryEditor';
import ExperienceEditor from '../components/builder/ExperienceEditor';
import ProjectsEditor from '../components/builder/ProjectsEditor';
import SkillsEditor from '../components/builder/SkillsEditor';
import EducationEditor from '../components/builder/EducationEditor';
import CustomizerToolbar from '../components/builder/CustomizerToolbar';
import ResumeTemplateRenderer from '../components/templates/ResumeTemplateRenderer';
import AIChatBot from '../components/ai/AIChatBot';
import { exportResumeToPDF } from '../utils/pdfExporter';
import { resumeService } from '../services/resumeService';

import {
  User, FileText, Briefcase, FolderGit2, Cpu, GraduationCap, Palette,
  Layout, Download, Share2, ZoomIn, ZoomOut, Eye, Sparkles, CheckCircle, QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function BuilderPage() {
  const { resumeData, templateId, setTemplateId, customization, activeZoom, setActiveZoom } = useContext(ResumeContext);
  const [activeTab, setActiveTab] = useState('personal');
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    { id: 'personal', name: 'Personal Details', icon: <User size={14} /> },
    { id: 'summary', name: 'Summary', icon: <FileText size={14} /> },
    { id: 'experience', name: 'Experience', icon: <Briefcase size={14} /> },
    { id: 'projects', name: 'Projects', icon: <FolderGit2 size={14} /> },
    { id: 'skills', name: 'Skills', icon: <Cpu size={14} /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={14} /> },
    { id: 'customizer', name: 'Styles & Fonts', icon: <Palette size={14} /> },
    { id: 'templates', name: '30 Templates', icon: <Layout size={14} /> },
  ];

  const templatesCatalog = [
    { id: "harvard", name: "Harvard Standard" },
    { id: "stanford", name: "Stanford Clean" },
    { id: "google", name: "Google Tech" },
    { id: "microsoft", name: "Microsoft Corporate" },
    { id: "executive", name: "Executive Leadership" },
    { id: "minimal", name: "Minimalist Crisp" },
    { id: "creative", name: "Creative Designer" },
    { id: "swe", name: "Software Engineer" },
    { id: "data_science", name: "Data Scientist" },
    { id: "side_column", name: "Two Column Grid" },
    { id: "bold_header", name: "Bold Header Modern" }
  ];

  const handleExportPDF = () => {
    setIsExporting(true);
    exportResumeToPDF('resume-preview-document', `${resumeData.personalInfo?.fullName || 'Resume'}_CV.pdf`);
    setTimeout(() => setIsExporting(false), 1200);
  };

  const handleExportDOCX = async () => {
    try {
      const blob = await resumeService.downloadDocx(resumeData);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resumeData.personalInfo?.fullName || 'Resume'}_CV.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.error("DOCX Export failed:", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      {/* Builder Sub-header Actions */}
      <div className="bg-slate-900/80 border-b border-white/10 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-14 z-30 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400">Target Role:</span>
          <span className="text-white bg-slate-800 px-3 py-1 rounded-full border border-white/10">
            {resumeData.personalInfo?.title || 'Senior Software Engineer'}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-950 rounded-xl border border-white/10 p-1">
            <button
              onClick={() => setActiveZoom(prev => Math.max(60, prev - 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-xs px-2 font-mono text-slate-300">{activeZoom}%</span>
            <button
              onClick={() => setActiveZoom(prev => Math.min(140, prev + 10))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          <button
            onClick={() => setShowShareModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Share2 size={14} /> Share / QR Code
          </button>

          <button
            onClick={handleExportDOCX}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download size={14} /> Download DOCX
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-1.5 transition-all"
          >
            <Download size={14} /> {isExporting ? 'Generating PDF...' : 'Export PDF'}
          </button>
        </div>
      </div>

      {/* Main Split Builder Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left Side Form Editor (Cols 5) */}
        <div className="lg:col-span-5 border-r border-white/10 bg-slate-950/60 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-110px)] space-y-4">
          {/* Tabs header */}
          <div className="flex overflow-x-auto gap-1 pb-2 scrollbar-none border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white bg-slate-900/40'}`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>

          {/* Active Tab Form View */}
          <div className="pt-2">
            {activeTab === 'personal' && <PersonalEditor />}
            {activeTab === 'summary' && <SummaryEditor />}
            {activeTab === 'experience' && <ExperienceEditor />}
            {activeTab === 'projects' && <ProjectsEditor />}
            {activeTab === 'skills' && <SkillsEditor />}
            {activeTab === 'education' && <EducationEditor />}
            {activeTab === 'customizer' && <CustomizerToolbar />}
            {activeTab === 'templates' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white mb-2">Select From 30+ Resume Templates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {templatesCatalog.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTemplateId(t.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${templateId === t.id ? 'bg-blue-600/20 border-blue-500 text-white ring-2 ring-blue-500' : 'bg-slate-900 border-white/10 text-slate-300 hover:border-slate-600'}`}
                    >
                      {t.name}
                      {templateId === t.id && <span className="block text-[10px] text-blue-400 font-normal mt-1">✓ Active Template</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Real-time Preview Stage (Cols 7) */}
        <div className="lg:col-span-7 bg-slate-900/40 p-4 lg:p-8 overflow-y-auto max-h-[calc(100vh-110px)] flex justify-center items-start">
          <div
            className="transition-transform duration-200 origin-top shadow-2xl rounded-lg overflow-hidden"
            style={{ transform: `scale(${activeZoom / 100})` }}
          >
            <ResumeTemplateRenderer
              data={resumeData}
              templateId={templateId}
              customization={customization}
            />
          </div>
        </div>
      </div>

      {/* Share / QR Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
            <h3 className="text-lg font-bold text-white">Share Resume Portfolio</h3>
            <p className="text-xs text-slate-400">Scan QR Code or copy live shareable link</p>

            <div className="bg-white p-4 rounded-2xl w-fit mx-auto shadow-lg">
              <QRCodeSVG value={`https://resumai-platform.vercel.app/resume/${resumeData.personalInfo?.fullName?.replace(' ', '-') || 'user'}`} size={160} />
            </div>

            <input
              type="text"
              readOnly
              value={`https://resumai-platform.vercel.app/resume/${resumeData.personalInfo?.fullName?.replace(' ', '-') || 'user'}`}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 text-center font-mono"
            />

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* Floating AI Chat Assistant */}
      <AIChatBot />
    </div>
  );
}
