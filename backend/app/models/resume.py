from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, JSON
from datetime import datetime
from app.core.database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, default="Untitled Resume", nullable=False)
    target_role = Column(String, nullable=True)
    template_id = Column(String, default="harvard", nullable=False)

    # Full structured resume JSON
    data = Column(JSON, nullable=False)
    
    # Customization styling settings JSON
    customization = Column(JSON, nullable=True)
    
    # Latest calculated ATS Score
    ats_score = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
