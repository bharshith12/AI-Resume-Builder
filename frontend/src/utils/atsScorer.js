const ACTION_VERBS = new Set([
  "spearheaded", "architected", "optimized", "implemented", "engineered", "developed",
  "scaled", "designed", "launched", "championed", "orchestrated", "transformed",
  "accelerated", "decreased", "increased", "boosted", "built", "modernized",
  "pioneered", "refactored", "automated", "mentored", "directed", "overhauled"
]);

export function calculateClientATSScore(resumeData, jobDescription = "") {
  if (!resumeData) return { overall_score: 0, breakdown: {} };

  const personal = resumeData.personalInfo || {};
  const summary = resumeData.summary || "";
  const experience = resumeData.experience || [];
  const education = resumeData.education || [];
  const skills = resumeData.skills || {};
  const projects = resumeData.projects || [];

  // Formatting & Contact Info (Max 20)
  let fmtScore = 0;
  if (personal.fullName) fmtScore += 5;
  if (personal.email && personal.email.includes("@")) fmtScore += 5;
  if (personal.phone) fmtScore += 5;
  if (personal.linkedin) fmtScore += 5;

  // Section Completeness (Max 20)
  let secScore = 0;
  if (summary.trim().length > 30) secScore += 5;
  if (experience.length > 0) secScore += 5;
  if (education.length > 0) secScore += 5;
  if ((skills.technical?.length || 0) + (skills.soft?.length || 0) >= 4) secScore += 5;

  // Action Verbs Audit (Max 20)
  let verbCount = 0;
  experience.forEach(exp => {
    (exp.bullets || []).forEach(bullet => {
      const firstWord = bullet.trim().split(" ")[0]?.toLowerCase();
      if (firstWord && ACTION_VERBS.has(firstWord)) {
        verbCount++;
      }
    });
  });
  let verbScore = Math.min(20, verbCount * 5);

  // Metrics & Quantifiable Proof (Max 20)
  const fullText = JSON.stringify(resumeData);
  const hasMetrics = /\d+%|\$\d+|\d+x|\d+M|\d+k/i.test(fullText);
  let metricsScore = hasMetrics ? 20 : 10;

  // Keyword Matching (Max 20)
  let kwScore = 15;
  if (jobDescription.trim()) {
    const jdWords = jobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const resumeText = fullText.toLowerCase();
    const matched = jdWords.filter(w => resumeText.includes(w));
    kwScore = jdWords.length > 0 ? Math.min(20, Math.round((matched.length / jdWords.length) * 35)) : 15;
  }

  const overall = Math.min(100, Math.max(15, fmtScore + secScore + verbScore + metricsScore + kwScore));

  return {
    overall_score: overall,
    breakdown: {
      formatting: fmtScore,
      section_completeness: secScore,
      action_verbs: verbScore,
      readability: metricsScore,
      keyword_match: kwScore
    }
  };
}
