import API from './api';

export const atsService = {
  analyzeATS: async (resumeData, jobDescription = "") => {
    const res = await API.post('/ats/analyze', {
      resume_data: resumeData,
      job_description: jobDescription
    });
    return res.data;
  }
};
