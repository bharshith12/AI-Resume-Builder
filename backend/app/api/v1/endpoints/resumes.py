from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.schemas.resume import ResumeCreate, ResumeUpdate, ResumeResponse
from app.services.ats_engine import analyze_ats

router = APIRouter()

@router.get("/", response_model=List[ResumeResponse])
def get_user_resumes(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Resume).filter(Resume.user_id == current_user.id).all()

@router.post("/", response_model=ResumeResponse)
def create_resume(resume_in: ResumeCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ats_result = analyze_ats(resume_in.data)
    
    new_resume = Resume(
        user_id=current_user.id,
        title=resume_in.title,
        target_role=resume_in.target_role,
        template_id=resume_in.template_id,
        data=resume_in.data,
        customization=resume_in.customization or {},
        ats_score=ats_result["overall_score"]
    )
    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)
    return new_resume

@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume_by_id(resume_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@router.put("/{resume_id}", response_model=ResumeResponse)
def update_resume(resume_id: int, resume_in: ResumeUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    if resume_in.title is not None: resume.title = resume_in.title
    if resume_in.target_role is not None: resume.target_role = resume_in.target_role
    if resume_in.template_id is not None: resume.template_id = resume_in.template_id
    if resume_in.data is not None:
        resume.data = resume_in.data
        ats_result = analyze_ats(resume_in.data)
        resume.ats_score = ats_result["overall_score"]
    if resume_in.customization is not None: resume.customization = resume_in.customization
    if resume_in.ats_score is not None: resume.ats_score = resume_in.ats_score

    db.commit()
    db.refresh(resume)
    return resume

@router.delete("/{resume_id}")
def delete_resume(resume_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    db.delete(resume)
    db.commit()
    return {"message": "Resume deleted successfully"}
