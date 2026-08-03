export const SAMPLE_RESUME_DATA = {
  personalInfo: {
    fullName: "Alex Rivera",
    title: "Senior Full Stack & AI Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 382-9102",
    address: "San Francisco, CA",
    linkedin: "https://linkedin.com/in/alexrivera-tech",
    github: "https://github.com/alexrivera-dev",
    portfolio: "https://alexrivera.dev",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  summary: "Senior Full Stack & AI Engineer with 6+ years of experience architecting scalable cloud systems, microservices, and LLM-powered applications. Spearheaded engineering teams to build high-concurrency enterprise web platforms using React, FastAPI, PostgreSQL, and AWS. Passionate about clean code, high ATS compatibility, and driving operational efficiency.",
  experience: [
    {
      id: "exp-1",
      company: "CloudScale Technologies",
      position: "Senior Full Stack AI Engineer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      description: "Spearheaded the development of AI-driven analytics dashboard processing 5M+ daily API events.",
      bullets: [
        "Architected distributed microservices with FastAPI, Celery, and Redis, boosting API response speed by 42%.",
        "Engineered real-time React frontend using Tailwind CSS and WebSocket streams, increasing user retention by 28%.",
        "Mentored a team of 6 junior software engineers, enforcing SOLID principles and unit testing coverage of 90%."
      ]
    },
    {
      id: "exp-2",
      company: "Apex Digital Solutions",
      position: "Full Stack Engineer",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      description: "Developed enterprise SaaS applications for healthcare and fintech clients.",
      bullets: [
        "Designed PostgreSQL schema with complex indexing, reducing query execution times by 55% across 10M records.",
        "Integrated AWS S3, Lambda, and CloudFront CDN for seamless media upload processing and secure document delivery.",
        "Automated CI/CD pipelines via GitHub Actions and Docker, reducing deployment cycle times from 2 hours to 15 minutes."
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2015-08",
      endDate: "2019-05",
      gpa: "3.88 / 4.0"
    }
  ],
  skills: {
    technical: [
      "JavaScript (ES6+)", "TypeScript", "React.js", "FastAPI", "Python",
      "PostgreSQL", "SQLAlchemy", "Tailwind CSS", "Docker", "AWS",
      "Git", "REST APIs", "GraphQL", "Redis", "LLM Integration"
    ],
    soft: [
      "System Architecture", "Technical Leadership", "Agile / Scrum", "Cross-Functional Collaboration"
    ]
  },
  projects: [
    {
      id: "proj-1",
      title: "ResumAI - Enterprise Resume Builder",
      description: "Built a high-performance SaaS web application featuring real-time ATS scoring, AI summary enhancement, and live PDF export.",
      technologies: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/alexrivera-dev/resumai-platform",
      liveDemo: "https://resumai.vercel.app"
    },
    {
      id: "proj-2",
      title: "NeuralFlow - Real-time Data Analytics",
      description: "Developed an anomaly detection pipeline using Python, PyTorch, and Apache Kafka for streaming sensor data.",
      technologies: ["Python", "PyTorch", "Kafka", "Docker", "Grafana"],
      github: "https://github.com/alexrivera-dev/neuralflow-pipeline",
      liveDemo: "https://neuralflow-demo.com"
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023-04"
    }
  ],
  languages: [
    { name: "English", proficiency: "Native / Fluent" },
    { name: "Spanish", proficiency: "Professional Working" }
  ],
  sectionOrder: ["summary", "experience", "projects", "skills", "education", "certifications", "languages"]
};
