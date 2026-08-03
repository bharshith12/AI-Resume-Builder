import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

export default function ResumeTemplateRenderer({ data, templateId = 'harvard', customization = {} }) {
  if (!data) return null;

  const { personalInfo = {}, summary = '', experience = [], education = [], skills = {}, projects = [], certifications = [], languages = [], sectionOrder = [] } = data;
  const { fontFamily = 'Inter', fontSize = 14, lineHeight = 1.5, themeColor = '#3b82f6', primaryColor = '#1e293b', photoShape = 'circle', photoSize = 80 } = customization;

  const photoClass = photoShape === 'circle' ? 'rounded-full' : photoShape === 'rounded' ? 'rounded-xl' : 'rounded-none';

  // Section Ordering helper
  const defaultOrder = ['summary', 'experience', 'projects', 'skills', 'education', 'certifications', 'languages'];
  const activeOrder = sectionOrder && sectionOrder.length > 0 ? sectionOrder : defaultOrder;

  // Custom typography style
  const fontStyle = {
    fontFamily: fontFamily.includes(',') ? fontFamily : `${fontFamily}, sans-serif`,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight
  };

  // Section Components Map for clean rendering
  const sectionMap = {
    summary: summary ? (
      <div key="summary" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Professional Summary
        </h3>
        <p className="text-slate-700 text-sm leading-relaxed">{summary}</p>
      </div>
    ) : null,

    experience: experience.length > 0 ? (
      <div key="experience" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Work Experience
        </h3>
        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">{exp.position}</span>
                <span className="text-xs text-slate-500 font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-600 font-medium mb-1">
                <span style={{ color: themeColor }}>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 mt-1 pl-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    ) : null,

    projects: projects.length > 0 ? (
      <div key="projects" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Projects & Key Contributions
        </h3>
        <div className="space-y-3">
          {projects.map((proj, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-slate-900">{proj.title}</span>
                {proj.technologies && (
                  <span className="text-xs text-slate-500 font-mono">
                    [{Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}]
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    ) : null,

    skills: (skills.technical?.length || skills.soft?.length) ? (
      <div key="skills" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Skills & Technical Expertise
        </h3>
        <div className="text-xs space-y-1">
          {skills.technical && skills.technical.length > 0 && (
            <div>
              <span className="font-bold text-slate-900">Technical Skills: </span>
              <span className="text-slate-700">{skills.technical.join(' • ')}</span>
            </div>
          )}
          {skills.soft && skills.soft.length > 0 && (
            <div>
              <span className="font-bold text-slate-900">Soft Skills: </span>
              <span className="text-slate-700">{skills.soft.join(' • ')}</span>
            </div>
          )}
        </div>
      </div>
    ) : null,

    education: education.length > 0 ? (
      <div key="education" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Education
        </h3>
        {education.map((edu, idx) => (
          <div key={idx} className="flex justify-between items-baseline text-xs mb-1">
            <div>
              <span className="font-bold text-slate-900">{edu.degree} in {edu.field}</span>
              <span className="text-slate-600"> — {edu.institution}</span>
            </div>
            <span className="text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
          </div>
        ))}
      </div>
    ) : null,

    certifications: certifications && certifications.length > 0 ? (
      <div key="certifications" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Certifications
        </h3>
        {certifications.map((cert, idx) => (
          <div key={idx} className="text-xs flex justify-between text-slate-700 mb-1">
            <span className="font-semibold">{cert.name} - {cert.issuer}</span>
            <span className="text-slate-500">{cert.date}</span>
          </div>
        ))}
      </div>
    ) : null,

    languages: languages && languages.length > 0 ? (
      <div key="languages" className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: themeColor }}>
          Languages
        </h3>
        <div className="text-xs text-slate-700 flex gap-4">
          {languages.map((lang, idx) => (
            <span key={idx}><strong>{lang.name}:</strong> {lang.proficiency}</span>
          ))}
        </div>
      </div>
    ) : null
  };

  // Header Component
  const renderHeader = () => (
    <div className="text-center mb-6 border-b pb-4" style={{ borderColor: 'rgba(226, 232, 240, 0.8)' }}>
      {personalInfo.photoUrl && (
        <div className="flex justify-center mb-3">
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className={`object-cover border-2 shadow-sm ${photoClass}`}
            style={{ width: `${photoSize}px`, height: `${photoSize}px`, borderColor: themeColor }}
          />
        </div>
      )}
      <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900" style={{ color: primaryColor }}>
        {personalInfo.fullName || 'YOUR NAME'}
      </h1>
      <p className="text-sm font-semibold text-blue-600 tracking-wide mt-0.5" style={{ color: themeColor }}>
        {personalInfo.title || 'Target Job Title'}
      </p>

      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2">
        {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} />{personalInfo.email}</span>}
        {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} />{personalInfo.phone}</span>}
        {personalInfo.address && <span className="flex items-center gap-1"><MapPin size={12} />{personalInfo.address}</span>}
        {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin size={12} />{personalInfo.linkedin.replace('https://', '')}</span>}
        {personalInfo.github && <span className="flex items-center gap-1"><Github size={12} />{personalInfo.github.replace('https://', '')}</span>}
      </div>
    </div>
  );

  // Template Variant Layout Adjustments
  if (templateId === 'bold_header' || templateId === 'executive') {
    return (
      <div id="resume-preview-document" className="bg-white text-slate-800 p-8 shadow-2xl min-h-[1050px] max-w-[800px] mx-auto text-slate-900" style={fontStyle}>
        <div className="-mx-8 -mt-8 p-8 mb-6 text-white" style={{ backgroundColor: primaryColor }}>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">{personalInfo.fullName}</h1>
          <p className="text-base text-blue-300 font-medium tracking-wide mt-1">{personalInfo.title}</p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-200 mt-3 pt-3 border-t border-white/20">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin.replace('https://', '')}</span>}
          </div>
        </div>
        {activeOrder.map(secKey => sectionMap[secKey])}
      </div>
    );
  }

  if (templateId === 'side_column' || templateId === 'creative') {
    return (
      <div id="resume-preview-document" className="bg-white text-slate-800 p-8 shadow-2xl min-h-[1050px] max-w-[800px] mx-auto flex gap-6 text-slate-900" style={fontStyle}>
        <div className="w-1/3 bg-slate-50 -my-8 -ml-8 p-6 border-r border-slate-200">
          {personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt="profile" className={`w-24 h-24 mx-auto mb-4 object-cover ${photoClass}`} />
          )}
          <h1 className="text-xl font-bold text-slate-900 mb-1">{personalInfo.fullName}</h1>
          <p className="text-xs font-semibold text-blue-600 mb-4" style={{ color: themeColor }}>{personalInfo.title}</p>
          
          <div className="space-y-2 text-xs text-slate-600 mb-6">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.address && <div>{personalInfo.address}</div>}
          </div>

          {sectionMap.skills}
          {sectionMap.education}
          {sectionMap.languages}
        </div>

        <div className="w-2/3 py-2">
          {sectionMap.summary}
          {sectionMap.experience}
          {sectionMap.projects}
          {sectionMap.certifications}
        </div>
      </div>
    );
  }

  // Standard Single Column Render (Harvard, Stanford, Google, SWE, Minimalist, etc.)
  return (
    <div id="resume-preview-document" className="bg-white text-slate-800 p-8 shadow-2xl min-h-[1050px] max-w-[800px] mx-auto transition-all" style={fontStyle}>
      {renderHeader()}
      {activeOrder.map(secKey => sectionMap[secKey])}
    </div>
  );
}
