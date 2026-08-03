from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from typing import Dict, Any
from app.services.export_service import generate_docx_resume

router = APIRouter()

@router.post("/docx")
def export_resume_docx(resume_data: Dict[str, Any]):
    try:
        doc_stream = generate_docx_resume(resume_data)
        filename = f"{resume_data.get('personalInfo', {}).get('fullName', 'Resume').replace(' ', '_')}_Resume.docx"
        return StreamingResponse(
            doc_stream,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DOCX Generation failed: {str(e)}")
