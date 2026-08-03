# ResumAI — Enterprise AI Resume Builder with Integrated ATS Checker

ResumAI is a SaaS-quality, production-ready web platform that enables job seekers and software engineers to craft high-impact, ATS-friendly resumes using AI.

---

## 🌟 Key Features

- **Live Real-time Builder**: Split-screen editor with instant live resume updates and zero page refreshes.
- **30+ Professional Resume Templates**: Harvard, Stanford, Google Style, Microsoft Corporate, Executive Leadership, Creative, Software Engineer, Data Scientist, Product Manager, and Minimalist ATS templates.
- **ATS Checker & Job Description Optimizer**: 100-point multi-vector ATS scoring engine analyzing keyword density, action verb strength, formatting, readability, and missing technical skills.
- **AI-Powered Writer**: Powered by OpenAI & Gemini integration (with intelligent local fallback logic) to generate summaries, optimize bullet points, suggest technical skills, and auto-generate technical projects.
- **AI Cover Letter Writer**: Customized executive cover letters aligned with target job titles and company names.
- **Photo Customizer & Cropper**: Support profile photo uploads with instant shape switching (Circle, Rounded, Square) and zoom controls.
- **Multi-Format Export & Sharing**: Export high-precision printable PDFs, editable Word (.docx) documents, raw JSON, and shareable QR codes.
- **SaaS UI/UX**: Glassmorphism design tokens, dark/light theme switching, responsive layouts, and interactive animations.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS with Glassmorphism tokens
- **Icons**: Lucide React & React Icons
- **Animations**: Framer Motion
- **Drag and Drop**: `@hello-pangea/dnd`
- **PDF Generation**: `html2pdf.js`, `jspdf`, `html2canvas`

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: SQLite (Default zero-config setup) / PostgreSQL ready
- **ORM**: SQLAlchemy
- **Authentication**: JWT Tokens, bcrypt password hashing
- **Export Engines**: `python-docx`, Jinja2 templates

---

## 🚀 Quick Start Guide

### 1. Run the Backend API Server

```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
- Interactive OpenAPI Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### 2. Run the Frontend App

```bash
cd frontend
npm install
npm run dev
```
- Open application at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Architecture Overview

```
AI Resume/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/ (auth, users, resumes, ats, ai, templates, export, admin)
│   │   ├── core/ (config, database, security)
│   │   ├── models/ (user, resume, analytics)
│   │   ├── schemas/ (user, resume, ats, ai)
│   │   ├── services/ (ats_engine, ai_service, export_service)
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/ (common, landing, builder, preview, templates, ats, ai, admin)
│   │   ├── context/ (AuthContext, ResumeContext, ThemeContext)
│   │   ├── pages/ (LandingPage, AuthPages, DashboardPage, BuilderPage, ATSPage, CoverLetterPage, AdminPage, SettingsPage)
│   │   ├── services/ (api, authService, resumeService, atsService, aiService)
│   │   └── utils/ (atsScorer, pdfExporter, sampleResumes, constants)
│   └── package.json
└── README.md
```
