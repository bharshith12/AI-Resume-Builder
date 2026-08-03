from fastapi import APIRouter, Depends
from app.schemas.ai import (
    AISummaryRequest, AIBulletOptimizeRequest, AIProjectGenerateRequest,
    AICoverLetterRequest, AIChatRequest, AIResponse
)
from app.services.ai_service import (
    generate_ai_summary, optimize_bullet_point, generate_project,
    generate_cover_letter, ai_chat_assistant
)

router = APIRouter()

@router.post("/generate-summary", response_model=AIResponse)
async def api_generate_summary(req: AISummaryRequest):
    res = await generate_ai_summary(req.role, req.skills, req.experience_level)
    return AIResponse(success=True, result=res)

@router.post("/optimize-bullet", response_model=AIResponse)
async def api_optimize_bullet(req: AIBulletOptimizeRequest):
    res = await optimize_bullet_point(req.bullet_text, req.role or "")
    return AIResponse(success=True, result=res)

@router.post("/generate-project", response_model=AIResponse)
async def api_generate_project(req: AIProjectGenerateRequest):
    res = await generate_project(req.role, req.domain or "Full Stack", req.tech_stack)
    return AIResponse(success=True, result=res)

@router.post("/generate-cover-letter", response_model=AIResponse)
async def api_generate_cover_letter(req: AICoverLetterRequest):
    res = await generate_cover_letter(req.model_dump())
    return AIResponse(success=True, result=res)

@router.post("/chat", response_model=AIResponse)
async def api_chat(req: AIChatRequest):
    res = await ai_chat_assistant(req.message, req.context_resume)
    return AIResponse(success=True, result=res)
