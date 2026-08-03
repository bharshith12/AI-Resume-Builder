from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ATSAnalysisRequest(BaseModel):
    resume_data: Dict[str, Any]
    job_description: Optional[str] = ""

class ScoreBreakdown(BaseModel):
    formatting: int
    keyword_match: int
    action_verbs: int
    readability: int
    section_completeness: int

class ATSAnalysisResponse(BaseModel):
    overall_score: int
    breakdown: ScoreBreakdown
    matched_keywords: List[str]
    missing_keywords: List[str]
    weak_bullet_points: List[str]
    action_verb_suggestions: List[str]
    formatting_issues: List[str]
    improvement_recommendations: List[str]
