from pydantic import BaseModel
from typing import Optional, List, Any, Dict
from datetime import datetime

class ResumeBase(BaseModel):
    title: str = "Untitled Resume"
    target_role: Optional[str] = ""
    template_id: str = "harvard"
    data: Dict[str, Any]
    customization: Optional[Dict[str, Any]] = None

class ResumeCreate(ResumeBase):
    pass

class ResumeUpdate(BaseModel):
    title: Optional[str] = None
    target_role: Optional[str] = None
    template_id: Optional[str] = None
    data: Optional[Dict[str, Any]] = None
    customization: Optional[Dict[str, Any]] = None
    ats_score: Optional[int] = None

class ResumeResponse(ResumeBase):
    id: int
    user_id: int
    ats_score: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
