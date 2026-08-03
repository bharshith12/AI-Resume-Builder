import API from './api';

export const aiService = {
  generateSummary: async (role, skills, experienceLevel = "Mid-Senior") => {
    const res = await API.post('/ai/generate-summary', { role, skills, experience_level: experienceLevel });
    return res.data;
  },

  optimizeBullet: async (bulletText, role = "") => {
    const res = await API.post('/ai/optimize-bullet', { bullet_text: bulletText, role });
    return res.data;
  },

  generateProject: async (role, domain = "Full Stack", techStack = []) => {
    const res = await API.post('/ai/generate-project', { role, domain, tech_stack: techStack });
    return res.data;
  },

  generateCoverLetter: async (payload) => {
    const res = await API.post('/ai/generate-cover-letter', payload);
    return res.data;
  },

  sendChatMessage: async (message, contextResume = null) => {
    const res = await API.post('/ai/chat', { message, context_resume: contextResume });
    return res.data;
  }
};
