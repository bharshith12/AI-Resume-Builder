from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class AISummaryRequest(BaseModel):
    role: str
    skills: List[str]
    experience_level: Optional[str] = "Mid-Senior"

class AIBulletOptimizeRequest(BaseModel):
    bullet_text: str
    role: Optional[str] = ""

class AIProjectGenerateRequest(BaseModel):
    role: str
    domain: Optional[str] = "Full Stack Web"
    tech_stack: List[str]

class AICoverLetterRequest(BaseModel):
    company_name: str
    job_title: str
    job_description: Optional[str] = ""
    applicant_name: str
    applicant_skills: List[str]
    applicant_experience: Optional[str] = ""

class AIChatRequest(BaseModel):
    message: str
    context_resume: Optional[Dict[str, Any]] = None

class AIResponse(BaseModel):
    success: bool
    result: Any
    message: str = "Success"
