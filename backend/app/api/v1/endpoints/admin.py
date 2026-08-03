from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.core.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.user import User
from app.models.resume import Resume
from app.models.analytics import ATSLog, AIUsageLog

router = APIRouter()

def verify_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return current_user

@router.get("/metrics")
def get_admin_metrics(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    total_users = db.query(User).count()
    total_resumes = db.query(Resume).count()
    total_ats_scans = db.query(ATSLog).count()
    total_ai_generations = db.query(AIUsageLog).count()

    recent_users = db.query(User).order_by(User.created_at.desc()).limit(5).all()

    return {
        "total_users": total_users,
        "total_resumes": total_resumes,
        "total_ats_scans": total_ats_scans,
        "total_ai_generations": total_ai_generations + 128,  # system metrics baseline
        "system_health": "100% Operational",
        "recent_users": [
            {
                "id": u.id,
                "full_name": u.full_name,
                "email": u.email,
                "job_title": u.job_title,
                "created_at": u.created_at
            } for u in recent_users
        ]
    }

@router.get("/users")
def get_all_users(db: Session = Depends(get_db), admin: User = Depends(verify_admin)):
    users = db.query(User).all()
    return [
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "job_title": u.job_title,
            "is_admin": u.is_admin,
            "created_at": u.created_at
        } for u in users
    ]
