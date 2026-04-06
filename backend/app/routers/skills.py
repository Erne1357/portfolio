from fastapi import APIRouter, Query

router = APIRouter()

DATA = {
    "en": [
        {
            "name": "Backend",
            "icon": "server",
            "skills": [
                "Python", "FastAPI", "Flask", "C#", ".NET 6",
                "SQLAlchemy", "Alembic", "Pydantic", "Jinja2", "Gunicorn", "Uvicorn",
            ],
        },
        {
            "name": "Frontend",
            "icon": "globe",
            "skills": [
                "React", "TypeScript", "JavaScript", "HTML/CSS",
                "Bootstrap 5", "Tailwind CSS", "Vite", "Framer Motion",
            ],
        },
        {
            "name": "Databases",
            "icon": "database",
            "skills": [
                "PostgreSQL", "MySQL", "SQL Server", "Oracle",
                "PgBouncer", "Database Design", "Migrations",
            ],
        },
        {
            "name": "DevOps & CI/CD",
            "icon": "settings",
            "skills": [
                "Docker", "Docker Compose", "Nginx",
                "GitHub Actions", "Blue-Green Deployment",
                "SSH Deploy", "Linux", "Shell Scripting",
            ],
        },
        {
            "name": "Real-time & Async",
            "icon": "zap",
            "skills": [
                "Socket.IO", "WebSockets", "Celery", "Redis",
                "RESTful APIs", "Redis Pub/Sub", "Task Queues",
            ],
        },
        {
            "name": "Languages & Tools",
            "icon": "code",
            "skills": [
                "Python", "C++", "Java", "C#", "JavaScript", "TypeScript",
                "Git", "GitHub", "Competitive Programming",
            ],
        },
        {
            "name": "Testing & QA",
            "icon": "shield",
            "skills": [
                "Pytest", "Unittest", "JWT Security", "RBAC",
                "CSRF Protection", "CORS", "Input Validation",
            ],
        },
        {
            "name": "Data & AI",
            "icon": "cpu",
            "skills": [
                "TensorFlow", "OpenCV", "Pandas", "NumPy",
                "Matplotlib", "K-means", "Statistical Analysis",
            ],
        },
    ],
    "es": [
        {
            "name": "Backend",
            "icon": "server",
            "skills": [
                "Python", "FastAPI", "Flask", "C#", ".NET 6",
                "SQLAlchemy", "Alembic", "Pydantic", "Jinja2", "Gunicorn", "Uvicorn",
            ],
        },
        {
            "name": "Frontend",
            "icon": "globe",
            "skills": [
                "React", "TypeScript", "JavaScript", "HTML/CSS",
                "Bootstrap 5", "Tailwind CSS", "Vite", "Framer Motion",
            ],
        },
        {
            "name": "Bases de Datos",
            "icon": "database",
            "skills": [
                "PostgreSQL", "MySQL", "SQL Server", "Oracle",
                "PgBouncer", "Diseño de BD", "Migraciones",
            ],
        },
        {
            "name": "DevOps & CI/CD",
            "icon": "settings",
            "skills": [
                "Docker", "Docker Compose", "Nginx",
                "GitHub Actions", "Blue-Green Deployment",
                "SSH Deploy", "Linux", "Shell Scripting",
            ],
        },
        {
            "name": "Tiempo Real & Asíncrono",
            "icon": "zap",
            "skills": [
                "Socket.IO", "WebSockets", "Celery", "Redis",
                "APIs RESTful", "Redis Pub/Sub", "Colas de Tareas",
            ],
        },
        {
            "name": "Lenguajes & Herramientas",
            "icon": "code",
            "skills": [
                "Python", "C++", "Java", "C#", "JavaScript", "TypeScript",
                "Git", "GitHub", "Programación Competitiva",
            ],
        },
        {
            "name": "Testing & Seguridad",
            "icon": "shield",
            "skills": [
                "Pytest", "Unittest", "Seguridad JWT", "RBAC",
                "Protección CSRF", "CORS", "Validación de Datos",
            ],
        },
        {
            "name": "Datos & IA",
            "icon": "cpu",
            "skills": [
                "TensorFlow", "OpenCV", "Pandas", "NumPy",
                "Matplotlib", "K-means", "Análisis Estadístico",
            ],
        },
    ],
}


@router.get("/skills")
def get_skills(lang: str = Query("en", pattern="^(en|es)$")):
    return DATA[lang]
