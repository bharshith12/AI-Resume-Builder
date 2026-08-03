import re
from typing import Dict, Any, List

ACTION_VERBS = {
    "spearheaded", "architected", "optimized", "implemented", "engineered", "developed",
    "scaled", "designed", "launched", "championed", "orchestrated", "transformed",
    "accelerated", "decreased", "increased", "boosted", "built", "modernized",
    "pioneered", "refactored", "automated", "mentored", "directed", "overhauled"
}

COMMON_TECH_KEYWORDS = {
    "python", "fastapi", "react", "javascript", "typescript", "postgresql", "sql",
    "docker", "kubernetes", "aws", "gcp", "azure", "ci/cd", "rest api", "graphql",
    "git", "redux", "tailwind css", "node.js", "express", "mongodb", "redis",
    "microservices", "unit testing", "system design", "agile", "scrum", "machine learning",
    "pytorch", "tensorflow", "nlp", "llm", "rag", "langchain", "data pipelines", "spark"
}

def analyze_ats(resume_data: Dict[str, Any], job_description: str = "") -> Dict[str, Any]:
    # Extract sections
    personal_info = resume_data.get("personalInfo", {})
    summary = resume_data.get("summary", "")
    experience = resume_data.get("experience", [])
    education = resume_data.get("education", [])
    skills = resume_data.get("skills", {})
    projects = resume_data.get("projects", [])

    # Flatten technical skills
    tech_skills_list = []
    if isinstance(skills, dict):
        tech_skills_list = [s.lower().strip() for s in skills.get("technical", [])]
        tech_skills_list += [s.lower().strip() for s in skills.get("soft", [])]
    elif isinstance(skills, list):
        tech_skills_list = [str(s).lower().strip() for s in skills]

    # Combine all resume text for keyword extraction
    all_text = f"{summary} "
    for exp in experience:
        all_text += f"{exp.get('position', '')} {exp.get('company', '')} {exp.get('description', '')} "
        all_text += " ".join(exp.get("bullets", [])) + " "
    for proj in projects:
        all_text += f"{proj.get('title', '')} {proj.get('description', '')} "
    all_text_lower = all_text.lower()

    # 1. Formatting & Completeness Score (Max 20)
    fmt_score = 0
    formatting_issues = []
    if personal_info.get("fullName"): fmt_score += 4
    else: formatting_issues.append("Missing full name in personal information.")
    
    if personal_info.get("email") and re.match(r"[^@]+@[^@]+\.[^@]+", personal_info.get("email", "")): fmt_score += 4
    else: formatting_issues.append("Invalid or missing email address.")

    if personal_info.get("phone"): fmt_score += 4
    else: formatting_issues.append("Missing contact phone number.")

    if personal_info.get("linkedin"): fmt_score += 4
    else: formatting_issues.append("LinkedIn profile link recommended for modern ATS.")

    if len(experience) > 0: fmt_score += 4
    else: formatting_issues.append("Work experience section is empty.")

    # 2. Section Completeness (Max 20)
    sec_score = 0
    if len(summary.strip()) > 30: sec_score += 5
    if len(education) > 0: sec_score += 5
    if len(tech_skills_list) >= 5: sec_score += 5
    if len(projects) > 0: sec_score += 5

    # 3. Action Verbs Audit (Max 20)
    verb_count = 0
    weak_bullets = []
    action_verb_suggestions = []
    
    for exp in experience:
        bullets = exp.get("bullets", [])
        if not bullets and exp.get("description"):
            bullets = [b.strip() for b in exp.get("description").split(".") if b.strip()]
            
        for b in bullets:
            first_word = b.strip().split()[0].lower() if b.strip() else ""
            if first_word in ACTION_VERBS:
                verb_count += 1
            else:
                if len(b.strip()) > 10:
                    weak_bullets.append(b.strip())

    action_verbs_score = min(20, verb_count * 4)
    if verb_count < 4:
        action_verb_suggestions.append("Start bullet points with strong power verbs like Spearheaded, Architected, Scaled, or Optimized.")

    # 4. Readability & Metrics (Max 20)
    readability_score = 15
    has_metrics = bool(re.search(r'\d+%', all_text) or re.search(r'\$\d+', all_text) or re.search(r'\d+x', all_text_lower))
    if has_metrics:
        readability_score += 5
    else:
        formatting_issues.append("Add quantifiable metrics (e.g. 'Improved speed by 40%', 'Reduced cost by $10k').")

    # 5. Keyword Matching against Job Description or Default Industry Stack (Max 20)
    matched_keywords = []
    missing_keywords = []
    
    if job_description.strip():
        jd_words = set(re.findall(r'\b[a-zA-Z\+\#]{2,}\b', job_description.lower()))
        tech_in_jd = jd_words.intersection(COMMON_TECH_KEYWORDS)
        if not tech_in_jd:
            tech_in_jd = {w for w in jd_words if len(w) > 3}
            
        for kw in tech_in_jd:
            if kw in all_text_lower or kw in tech_skills_list:
                matched_keywords.append(kw)
            else:
                missing_keywords.append(kw)
                
        if len(tech_in_jd) > 0:
            keyword_score = int((len(matched_keywords) / len(tech_in_jd)) * 20)
        else:
            keyword_score = 15
    else:
        # Default analysis against standard tech stack
        for kw in list(COMMON_TECH_KEYWORDS)[:15]:
            if kw in all_text_lower or kw in tech_skills_list:
                matched_keywords.append(kw)
            else:
                missing_keywords.append(kw)
        keyword_score = min(20, len(matched_keywords) * 2)

    overall_score = fmt_score + sec_score + action_verbs_score + readability_score + keyword_score
    overall_score = min(100, max(10, overall_score))

    recommendations = []
    if missing_keywords:
        recommendations.append(f"Consider integrating top missing keywords: {', '.join(missing_keywords[:5])}.")
    if weak_bullets:
        recommendations.append("Rewrite bullet points using action verbs and measurable business impacts.")
    if not has_metrics:
        recommendations.append("Include percentage gains, performance boosts, or team scale stats in your bullet points.")

    return {
        "overall_score": overall_score,
        "breakdown": {
            "formatting": fmt_score,
            "keyword_match": keyword_score,
            "action_verbs": action_verbs_score,
            "readability": readability_score,
            "section_completeness": sec_score
        },
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords[:10],
        "weak_bullet_points": weak_bullets[:5],
        "action_verb_suggestions": action_verb_suggestions,
        "formatting_issues": formatting_issues,
        "improvement_recommendations": recommendations
    }
