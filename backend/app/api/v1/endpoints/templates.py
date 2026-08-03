from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter()

TEMPLATES_CATALOG = [
    {"id": "harvard", "name": "Harvard Standard", "category": "Academic & Legal", "ats_friendly": True, "popular": True, "description": "Traditional single-column serif layout preferred by IVY league institutions and fortune 500 recruiters."},
    {"id": "stanford", "name": "Stanford Clean", "category": "Executive", "ats_friendly": True, "popular": True, "description": "Minimalist header with clear line demarcations and prominent skills focus."},
    {"id": "google", "name": "Google Tech", "category": "Engineering", "ats_friendly": True, "popular": True, "description": "Modern technical template optimized for Software Engineers, System Architects & DevOps."},
    {"id": "microsoft", "name": "Microsoft Corporate", "category": "Corporate", "ats_friendly": True, "popular": False, "description": "Structured dual-tone layout suitable for Enterprise Project Managers and Business Analysts."},
    {"id": "executive", "name": "Executive Leadership", "category": "Executive", "ats_friendly": True, "popular": True, "description": "Bold header banner with high-impact executive summary focus."},
    {"id": "minimal", "name": "Minimalist Crisp", "category": "Clean", "ats_friendly": True, "popular": True, "description": "Sleek whitespace-heavy layout with crisp typography and subtle accent lines."},
    {"id": "modern", "name": "Modern Slate", "category": "Modern", "ats_friendly": True, "popular": True, "description": "Contemporary design featuring side skills pillar and clean typography."},
    {"id": "creative", "name": "Creative Designer", "category": "Design & Product", "ats_friendly": False, "popular": False, "description": "Vibrant layout tailored for UI/UX Designers, Animators, and Product Managers."},
    {"id": "elegant", "name": "Elegant Serif", "category": "Classic", "ats_friendly": True, "popular": False, "description": "Sophisticated classic styling with refined font serif accents."},
    {"id": "swe", "name": "Software Engineer", "category": "Engineering", "ats_friendly": True, "popular": True, "description": "Project-first structure emphasizing technical stack, repos, and cloud certifications."},
    {"id": "data_science", "name": "Data Scientist", "category": "Engineering", "ats_friendly": True, "popular": True, "description": "Highlighting machine learning projects, statistical analysis, research papers, and Kaggle achievements."},
    {"id": "ai_engineer", "name": "AI & ML Architect", "category": "Engineering", "ats_friendly": True, "popular": True, "description": "Tailored for AI Researchers, LLM Developers, and Machine Learning Infrastructure Engineers."},
    {"id": "product_mgr", "name": "Product Manager", "category": "Management", "ats_friendly": True, "popular": False, "description": "Outcome-oriented template emphasizing product metrics, team leadership, and roadmap execution."},
    {"id": "ui_ux", "name": "UI/UX Specialist", "category": "Design & Product", "ats_friendly": True, "popular": False, "description": "Visually crisp template with linkable portfolio items and design system highlights."},
    {"id": "finance", "name": "Finance & Analyst", "category": "Corporate", "ats_friendly": True, "popular": False, "description": "Rigorous quantitative layout for Investment Banking, Financial Planning, and Risk Analysis."},
    {"id": "healthcare", "name": "Healthcare Professional", "category": "Medical", "ats_friendly": True, "popular": False, "description": "Clean clinical format emphasizing licenses, patient care achievements, and board certifications."},
    {"id": "marketing", "name": "Growth Marketing", "category": "Marketing", "ats_friendly": True, "popular": False, "description": "Campaign-focused layout highlighting ROI metrics, digital ad spend, and brand growth."},
    {"id": "student", "name": "Student & Intern", "category": "Academic & Legal", "ats_friendly": True, "popular": True, "description": "Education and campus projects focused template for university students seeking internships."},
    {"id": "fresher", "name": "Graduate Fresher", "category": "Academic & Legal", "ats_friendly": True, "popular": True, "description": "Balanced single-page layout for entry-level candidates showcasing coursework and key skills."},
    {"id": "experienced", "name": "Senior Staff Architect", "category": "Executive", "ats_friendly": True, "popular": True, "description": "Multi-page capable format tailored for 10+ years experienced industry veterans."},
    {"id": "compact", "name": "Compact 1-Page", "category": "Clean", "ats_friendly": True, "popular": True, "description": "High-density single-page layout engineered to fit extensive experience without overflow."},
    {"id": "corporate_navy", "name": "Corporate Navy", "category": "Corporate", "ats_friendly": True, "popular": False, "description": "Deep blue accent theme with professional tabular alignment."},
    {"id": "emerald_tech", "name": "Emerald Tech", "category": "Engineering", "ats_friendly": True, "popular": False, "description": "Modern emerald accent theme for cybersecurity and DevOps engineers."},
    {"id": "purple_pro", "name": "Purple Professional", "category": "Modern", "ats_friendly": True, "popular": False, "description": "Vibrant violet sidebar template with high readability typography."},
    {"id": "monochrome", "name": "Monochrome Classic", "category": "Clean", "ats_friendly": True, "popular": False, "description": "Pure black and white layout maximizing ATS parser readability."},
    {"id": "bold_header", "name": "Bold Header Modern", "category": "Modern", "ats_friendly": True, "popular": False, "description": "Attention-grabbing dark header banner with clean contact iconography."},
    {"id": "side_column", "name": "Two Column Grid", "category": "Modern", "ats_friendly": True, "popular": False, "description": "Split screen layout with left skills column and right experience timeline."},
    {"id": "border_frame", "name": "Framed Elegance", "category": "Classic", "ats_friendly": True, "popular": False, "description": "Subtle outer border line with formal section dividers."},
    {"id": "glass_card", "name": "Glassmorphism Modern", "category": "Design & Product", "ats_friendly": True, "popular": False, "description": "Translucent UI styled header with modern pill tags for skills."},
    {"id": "silicon_valley", "name": "Silicon Valley Standard", "category": "Engineering", "ats_friendly": True, "popular": True, "description": "The exact template format used by senior tech leads in Big Tech."}
]

@router.get("/", response_model=List[Dict[str, Any]])
def get_templates():
    return TEMPLATES_CATALOG
