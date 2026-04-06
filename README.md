# Portfolio — Ernesto Villarreal

Personal portfolio website showcasing projects, skills, achievements, and contact information. Built with a React frontend and a FastAPI backend, deployed with Docker Compose behind an Nginx reverse proxy.

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, tsParticles

**Backend:** Python, FastAPI, Uvicorn

**Infrastructure:** Docker Compose, Nginx (reverse proxy)

**Features:** Bilingual (EN/ES), responsive design, animated UI, API-driven content

## Project Structure

```
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── components/   # UI sections (Hero, About, Skills, Projects, etc.)
│   │   ├── hooks/        # Custom hooks (usePortfolioData)
│   │   ├── i18n/         # Translations and language context
│   │   └── types/        # TypeScript type definitions
│   └── public/           # Static assets and images
├── backend/           # FastAPI application
│   └── app/
│       └── routers/      # API route handlers
├── nginx/             # Nginx reverse proxy config
└── docker-compose.yml
```

## Getting Started

### Development

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

**Backend:**

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Production (Docker)

```bash
docker compose up --build -d
```

The site will be available at `http://localhost`.

## API Endpoints

| Endpoint                  | Description         |
| ------------------------- | ------------------- |
| `GET /api/health`         | Health check        |
| `GET /api/v1/about`       | About information   |
| `GET /api/v1/projects`    | Project list        |
| `GET /api/v1/skills`      | Skills and tech     |
| `GET /api/v1/achievements`| Achievements/awards |

## License

All rights reserved.
