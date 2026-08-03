import API from './api';

export const resumeService = {
  getUserResumes: async () => {
    const res = await API.get('/resumes');
    return res.data;
  },

  getResumeById: async (id) => {
    const res = await API.get(`/resumes/${id}`);
    return res.data;
  },

  createResume: async (resumeData) => {
    const res = await API.post('/resumes', resumeData);
    return res.data;
  },

  updateResume: async (id, resumeData) => {
    const res = await API.put(`/resumes/${id}`, resumeData);
    return res.data;
  },

  deleteResume: async (id) => {
    const res = await API.delete(`/resumes/${id}`);
    return res.data;
  },

  downloadDocx: async (resumeData) => {
    const res = await API.post('/export/docx', resumeData, {
      responseType: 'blob'
    });
    return res.data;
  }
};
