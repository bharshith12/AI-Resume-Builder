import React, { createContext, useState, useEffect } from 'react';
import { SAMPLE_RESUME_DATA } from '../utils/sampleResumes';
import { calculateClientATSScore } from '../utils/atsScorer';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(SAMPLE_RESUME_DATA);
  const [templateId, setTemplateId] = useState('harvard');
  const [customization, setCustomization] = useState({
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 1.5,
    margin: 20,
    themeColor: '#3b82f6',
    primaryColor: '#1e293b',
    headerStyle: 'standard',
    photoShape: 'circle', // 'circle', 'rounded', 'square'
    photoSize: 96,
  });
  const [atsScore, setAtsScore] = useState(88);
  const [targetJobDescription, setTargetJobDescription] = useState('');
  const [activeZoom, setActiveZoom] = useState(100);

  // Recalculate ATS score live on resume edits
  useEffect(() => {
    const res = calculateClientATSScore(resumeData, targetJobDescription);
    setAtsScore(res.overall_score);
  }, [resumeData, targetJobDescription]);

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateSummary = (newSummary) => {
    setResumeData(prev => ({ ...prev, summary: newSummary }));
  };

  const updateExperience = (newExperience) => {
    setResumeData(prev => ({ ...prev, experience: newExperience }));
  };

  const updateEducation = (newEducation) => {
    setResumeData(prev => ({ ...prev, education: newEducation }));
  };

  const updateSkills = (newSkills) => {
    setResumeData(prev => ({ ...prev, skills: newSkills }));
  };

  const updateProjects = (newProjects) => {
    setResumeData(prev => ({ ...prev, projects: newProjects }));
  };

  const updateSectionOrder = (newOrder) => {
    setResumeData(prev => ({ ...prev, sectionOrder: newOrder }));
  };

  const updateCustomization = (key, value) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData,
      templateId, setTemplateId,
      customization, setCustomization, updateCustomization,
      atsScore, targetJobDescription, setTargetJobDescription,
      activeZoom, setActiveZoom,
      updatePersonalInfo, updateSummary, updateExperience,
      updateEducation, updateSkills, updateProjects, updateSectionOrder
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
