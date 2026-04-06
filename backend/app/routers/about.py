from fastapi import APIRouter, Query

router = APIRouter()

DATA = {
    "en": {
        "name": "Ernesto Villarreal Ibarra",
        "title": "Full Stack Developer",
        "bio": (
            "Computer Systems Engineer with a strong focus on backend development, "
            "system architecture, and competitive programming. I build production-grade "
            "platforms at ITCJ that solve real institutional problems — from graduate student "
            "management to help-desk ticketing and appointment scheduling. "
            "Passionate about clean code, scalable architecture, and solving complex algorithmic challenges."
        ),
        "current_role": {
            "position": "Programmer (Honorarios)",
            "company": "ITCJ — Instituto Tecnológico de Ciudad Juárez",
            "period": "August 2025 – Present",
            "description": (
                "Developing and maintaining institutional web platforms for graduate student management, "
                "help-desk ticketing, appointment scheduling, and campus services."
            ),
        },
        "location": "Ciudad Juárez, Chihuahua, México",
        "email": "villarreal.i.ernesto@gmail.com",
        "phone": "+52 (656) 585-0010",
        "github": "https://github.com/Erne1357",
        "linkedin": "https://www.linkedin.com/in/ernesto-villarreal-ibarra-49a443337/",
        "photo": "/images/profile.jpg",
        "education": [
            {
                "degree": "B.S. in Computer Systems Engineering",
                "institution": "ITCJ — Instituto Tecnológico de Ciudad Juárez",
                "period": "2021 – 2025",
                "status": "Graduated",
            },
            {
                "degree": "Technical Diploma in Programming",
                "institution": "CBTIS 114",
                "period": "2018 – 2021",
                "status": "Completed",
            },
        ],
        "stats": {
            "projects": 3,
            "languages": 6,
            "icpc_finals": 2,
            "years_coding": 7,
        },
        "stats_labels": {
            "projects": "Projects",
            "languages": "Languages",
            "icpc_finals": "ICPC Finals",
            "years_coding": "Years Coding",
        },
    },
    "es": {
        "name": "Ernesto Villarreal Ibarra",
        "title": "Desarrollador Full Stack",
        "bio": (
            "Ingeniero en Sistemas Computacionales con un fuerte enfoque en desarrollo backend, "
            "arquitectura de sistemas y programación competitiva. Construyo plataformas de producción "
            "en el ITCJ que resuelven problemas institucionales reales — desde la gestión de estudiantes "
            "de posgrado hasta mesa de ayuda y agendamiento de citas. "
            "Apasionado por el código limpio, la arquitectura escalable y la resolución de desafíos algorítmicos complejos."
        ),
        "current_role": {
            "position": "Programador (Honorarios)",
            "company": "ITCJ — Instituto Tecnológico de Ciudad Juárez",
            "period": "Agosto 2025 – Presente",
            "description": (
                "Desarrollo y mantenimiento de plataformas web institucionales para la gestión de estudiantes "
                "de posgrado, mesa de ayuda, agendamiento de citas y servicios del campus."
            ),
        },
        "location": "Ciudad Juárez, Chihuahua, México",
        "email": "villarreal.i.ernesto@gmail.com",
        "phone": "+52 (656) 585-0010",
        "github": "https://github.com/Erne1357",
        "linkedin": "https://www.linkedin.com/in/ernesto-villarreal-ibarra-49a443337/",
        "photo": "/images/profile.jpg",
        "education": [
            {
                "degree": "Ingeniería en Sistemas Computacionales",
                "institution": "ITCJ — Instituto Tecnológico de Ciudad Juárez",
                "period": "2021 – 2025",
                "status": "Egresado",
            },
            {
                "degree": "Técnico en Programación",
                "institution": "CBTIS 114",
                "period": "2018 – 2021",
                "status": "Completado",
            },
        ],
        "stats": {
            "projects": 3,
            "languages": 6,
            "icpc_finals": 2,
            "years_coding": 7,
        },
        "stats_labels": {
            "projects": "Proyectos",
            "languages": "Lenguajes",
            "icpc_finals": "Finales ICPC",
            "years_coding": "Años Programando",
        },
    },
}


@router.get("/about")
def get_about(lang: str = Query("en", pattern="^(en|es)$")):
    return DATA[lang]
