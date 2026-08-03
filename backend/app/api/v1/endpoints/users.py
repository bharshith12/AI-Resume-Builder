from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.v1.endpoints.auth import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse, UserBase

router = APIRouter()

@router.put("/profile", response_model=UserResponse)
def update_profile(user_update: UserBase, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_user.full_name = user_update.full_name
    current_user.email = user_update.email
    if user_update.job_title:
        current_user.job_title = user_update.job_title
    if user_update.profile_photo:
        current_user.profile_photo = user_update.profile_photo

    db.commit()
    db.refresh(current_user)
    return current_user
