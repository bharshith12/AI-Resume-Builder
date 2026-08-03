from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, resumes, ats, ai, templates, export, admin

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(resumes.router, prefix="/resumes", tags=["Resumes"])
api_router.include_router(ats.router, prefix="/ats", tags=["ATS Checker"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Generator & Assistant"])
api_router.include_router(templates.router, prefix="/templates", tags=["Templates Catalog"])
api_router.include_router(export.router, prefix="/export", tags=["Export Services"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Panel"])
