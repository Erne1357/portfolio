from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import about, projects, skills, achievements

app = FastAPI(
    title="Ernesto Villarreal — Portfolio API",
    description="Backend API serving portfolio data for Ernesto Villarreal's personal portfolio.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(about.router, prefix="/api/v1", tags=["About"])
app.include_router(projects.router, prefix="/api/v1", tags=["Projects"])
app.include_router(skills.router, prefix="/api/v1", tags=["Skills"])
app.include_router(achievements.router, prefix="/api/v1", tags=["Achievements"])


@app.get("/api/health", tags=["Health"])
def health_check():
    return {"status": "ok", "service": "portfolio-api", "version": "1.0.0"}
