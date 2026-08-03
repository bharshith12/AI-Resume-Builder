from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.ats import ATSAnalysisRequest, ATSAnalysisResponse
from app.services.ats_engine import analyze_ats
from app.models.analytics import ATSLog
from app.core.database import get_db

router = APIRouter()

@router.post("/analyze", response_model=ATSAnalysisResponse)
def analyze_resume_ats(req: ATSAnalysisRequest, db: Session = Depends(get_db)):
    result = analyze_ats(req.resume_data, req.job_description or "")
    
    # Save anonymous ATS log for analytics tracking
    log = ATSLog(
        score=result["overall_score"],
        target_job_title=req.resume_data.get("personalInfo", {}).get("title", "Unknown"),
        report_summary=result["breakdown"]
    )
    db.add(log)
    db.commit()

    return result
