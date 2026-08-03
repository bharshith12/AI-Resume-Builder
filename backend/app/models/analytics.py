from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON
from datetime import datetime
from app.core.database import Base

class ATSLog(Base):
    __tablename__ = "ats_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    resume_id = Column(Integer, ForeignKey("resumes.id"), nullable=True)
    score = Column(Integer, nullable=False)
    target_job_title = Column(String, nullable=True)
    report_summary = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class AIUsageLog(Base):
    __tablename__ = "ai_usage_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    feature_used = Column(String, nullable=False) # e.g., 'summary_generator', 'bullet_optimizer', 'cover_letter'
    tokens_estimated = Column(Integer, default=150)
    created_at = Column(DateTime, default=datetime.utcnow)
