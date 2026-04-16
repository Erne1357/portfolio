from fastapi import APIRouter, Query

router = APIRouter()

DATA = {
    "en": [
        {
            "id": "siiap",
            "number": "01",
            "title": "SIIAP",
            "subtitle": "Graduate Management Platform",
            "description": (
                "Production web platform managing the complete graduate student lifecycle — "
                "admission, permanence, and graduation — for ITCJ's postgraduate programs. "
                "Started as a residency project and continued as a hired developer."
            ),
            "long_description": (
                "SIIAP (Sistema Integral de Información de Admisión, Permanencia y Conclusión) "
                "is a full-featured platform that handles every stage of a postgraduate student's journey. "
                "It features role-based access for admins, coordinators, document reviewers, and applicants, "
                "with real-time WebSocket notifications, asynchronous PDF generation, and a committee "
                "deliberation system for admission decisions."
            ),
            "tech": [
                "Python", "Flask", "PostgreSQL", "Celery", "Redis",
                "Socket.IO", "Docker", "Nginx", "Bootstrap 5", "WeasyPrint",
                "GitHub Actions", "Gunicorn", "Alembic", "SQLAlchemy",
            ],
            "category": "Web Platform",
            "category_color": "cyan",
            "github": "https://github.com/Erne1357/SIIAP",
            "live": None,
            "status": "Production",
            "features": [
                "Role-based access control (4 roles with granular permissions)",
                "Document management & multi-step review workflows",
                "Real-time in-app notifications via WebSockets",
                "Async task queue: PDF generation, email, scheduling (Celery + Redis)",
                "Committee deliberation & voting system",
                "Academic period & enrollment management",
                "Full audit trail with user history logging",
                "Containerized with Docker Compose (6 services)",
                "CI/CD with GitHub Actions (automated SSH deploy + health checks)",
                "Microsoft Graph email integration (Office 365)",
            ],
            "stats": {"models": 26, "api_endpoints": 29, "templates": 63, "services": 26},
            "images": [
                {"src": "/images/projects/siiap-1.png", "alt": "Admin dashboard with student overview"},
                {"src": "/images/projects/siiap-2.png", "alt": "Document review and approval workflow"},
                {"src": "/images/projects/siiap-3.png", "alt": "Committee deliberation and voting panel"},
                {"src": "/images/projects/siiap-4.png", "alt": "Real-time notification center"},
            ],
        },
        {
            "id": "itcj",
            "number": "02",
            "title": "ITCJ Platform",
            "subtitle": "Institutional Services Platform",
            "description": (
                "Enterprise multi-module platform for ITCJ featuring four independent applications "
                "under a shared auth core: Help-Desk, AgendaTec, VisteTec, and Warehouse."
            ),
            "long_description": (
                "A comprehensive institutional ecosystem built with FastAPI. "
                "Help-Desk manages IT support tickets and equipment inventory with SLA tracking. "
                "AgendaTec lets students schedule add/drop appointments with coordinators using "
                "real-time Redis slot-locking. VisteTec handles clothing donations and pantry management. "
                "All apps share a unified JWT auth system with granular app-level permissions."
            ),
            "tech": [
                "Python", "FastAPI", "PostgreSQL", "Redis", "Socket.IO",
                "Celery", "Docker", "Nginx", "Bootstrap 5", "PgBouncer",
                "GitHub Actions", "Uvicorn", "Alembic", "Pydantic",
            ],
            "category": "Multi-App Platform",
            "category_color": "purple",
            "github": "https://github.com/Erne1357/itcj",
            "live": None,
            "status": "Production",
            "features": [
                "4 independent apps with shared JWT authentication core",
                "Help-Desk: full ticket lifecycle + equipment inventory + SLA metrics",
                "AgendaTec: real-time slot booking with Redis soft-locks (45s hold)",
                "VisteTec: clothing donation platform with image compression pipeline",
                "Statistical analysis: K-means clustering, IQR outlier detection",
                "Granular 3-level permission system (app.resource.action)",
                "WebSocket real-time updates across all modules",
                "Blue-green zero-downtime deployment via GitHub Actions",
                "PgBouncer connection pooling for database performance",
                "CLI admin tools with Click framework",
            ],
            "stats": {"apps": 4, "api_endpoints": 50, "python_files": 129, "db_tables": 40},
            "images": [
                {"src": "/images/projects/itcj-1.png", "alt": "Main dashboard with application launcher"},
                {"src": "/images/projects/itcj-2.png", "alt": "Help-Desk ticket management view"},
                {"src": "/images/projects/itcj-3.png", "alt": "Help-Desk analytics and statistics dashboard"},
                {"src": "/images/projects/itcj-4.png", "alt": "AgendaTec appointment scheduling calendar"},
                {"src": "/images/projects/itcj-5.png", "alt": "VisteTec clothing donation catalog"},
            ],
        },
        {
            "id": "defer",
            "number": "03",
            "title": "DeferAplication",
            "subtitle": "Business Management System",
            "description": (
                "Feature-rich Windows desktop application for a private client to manage inventory, "
                "sales, clients, and suppliers — with automatic stock reconciliation on every sale."
            ),
            "long_description": (
                "A full-featured business management desktop app built with .NET 6 WinForms and PostgreSQL. "
                "Supports multi-variant products (presentation + aroma), production recipes that "
                "auto-deduct raw materials, credit sales with payment tracking, supplier credit management, "
                "and comprehensive PDF reports. Includes real-time low-stock alerts and a global search system."
            ),
            "tech": ["C#", ".NET 6", "WinForms", "PostgreSQL", "iTextSharp", "Npgsql"],
            "category": "Desktop App",
            "category_color": "green",
            "github": "https://github.com/Erne1357/deferAplication",
            "live": None,
            "status": "88% Complete",
            "features": [
                "Multi-variant inventory (presentation × aroma combinations)",
                "Automatic stock deduction on sale registration",
                "Production recipe management with raw material tracking",
                "Credit/deferred payment system for clients and suppliers",
                "PDF invoice and report generation (iTextSharp)",
                "Real-time low-stock alerts panel",
                "Role-based access control (admin / user)",
                "Global search across all entities + keyboard shortcut system",
            ],
            "stats": {"models": 33, "controls": 43, "db_tables": 20, "completion": 88},
            "images": [
                {"src": "/images/projects/defer-1.png", "alt": "Main application dashboard"},
                {"src": "/images/projects/defer-2.png", "alt": "Sales registration screen"},
                {"src": "/images/projects/defer-3.png", "alt": "Product inventory management"},
                {"src": "/images/projects/defer-4.png", "alt": "PDF report generation"},
            ],
        },
    ],
    "es": [
        {
            "id": "siiap",
            "number": "01",
            "title": "SIIAP",
            "subtitle": "Plataforma de Gestión de Posgrado",
            "description": (
                "Plataforma web en producción que gestiona el ciclo completo del estudiante de posgrado — "
                "admisión, permanencia y conclusión — para los programas de posgrado del ITCJ. "
                "Comenzó como proyecto de residencias y continuó como desarrollador contratado."
            ),
            "long_description": (
                "SIIAP (Sistema Integral de Información de Admisión, Permanencia y Conclusión) "
                "es una plataforma completa que maneja cada etapa del recorrido de un estudiante de posgrado. "
                "Cuenta con control de acceso basado en roles para administradores, coordinadores, "
                "revisores de documentos y aspirantes, con notificaciones en tiempo real por WebSockets, "
                "generación asíncrona de PDFs y un sistema de deliberación por comité para decisiones de admisión."
            ),
            "tech": [
                "Python", "Flask", "PostgreSQL", "Celery", "Redis",
                "Socket.IO", "Docker", "Nginx", "Bootstrap 5", "WeasyPrint",
                "GitHub Actions", "Gunicorn", "Alembic", "SQLAlchemy",
            ],
            "category": "Plataforma Web",
            "category_color": "cyan",
            "github": "https://github.com/Erne1357/SIIAP",
            "live": None,
            "status": "Producción",
            "features": [
                "Control de acceso basado en roles (4 roles con permisos granulares)",
                "Gestión de documentos y flujos de revisión multi-paso",
                "Notificaciones en tiempo real vía WebSockets",
                "Cola de tareas asíncronas: generación de PDF, email, programación (Celery + Redis)",
                "Sistema de deliberación y votación por comité",
                "Gestión de periodos académicos e inscripciones",
                "Registro completo de auditoría con historial de usuario",
                "Contenerizado con Docker Compose (6 servicios)",
                "CI/CD con GitHub Actions (deploy automatizado por SSH + health checks)",
                "Integración de email con Microsoft Graph (Office 365)",
            ],
            "stats": {"models": 26, "api_endpoints": 29, "templates": 63, "services": 26},
            "images": [
                {"src": "/images/projects/siiap-1.png", "alt": "Dashboard de administración con resumen de estudiantes"},
                {"src": "/images/projects/siiap-2.png", "alt": "Flujo de revisión y aprobación de documentos"},
                {"src": "/images/projects/siiap-3.png", "alt": "Panel de deliberación y votación del comité"},
                {"src": "/images/projects/siiap-4.png", "alt": "Centro de notificaciones en tiempo real"},
            ],
        },
        {
            "id": "itcj",
            "number": "02",
            "title": "Plataforma ITCJ",
            "subtitle": "Plataforma de Servicios Institucionales",
            "description": (
                "Plataforma empresarial multi-módulo para el ITCJ con cuatro aplicaciones independientes "
                "bajo un núcleo de autenticación compartido: Help-Desk, AgendaTec, VisteTec y Almacén."
            ),
            "long_description": (
                "Un ecosistema institucional integral construido con FastAPI. "
                "Help-Desk gestiona tickets de soporte técnico e inventario de equipos con seguimiento de SLA. "
                "AgendaTec permite a los estudiantes agendar citas de altas/bajas con coordinadores usando "
                "bloqueo de slots en tiempo real con Redis. VisteTec maneja donaciones de ropa y gestión de despensa. "
                "Todas las apps comparten un sistema unificado de autenticación JWT con permisos granulares por app."
            ),
            "tech": [
                "Python", "FastAPI", "PostgreSQL", "Redis", "Socket.IO",
                "Celery", "Docker", "Nginx", "Bootstrap 5", "PgBouncer",
                "GitHub Actions", "Uvicorn", "Alembic", "Pydantic",
            ],
            "category": "Plataforma Multi-App",
            "category_color": "purple",
            "github": "https://github.com/Erne1357/itcj",
            "live": None,
            "status": "Producción",
            "features": [
                "4 aplicaciones independientes con núcleo de autenticación JWT compartido",
                "Help-Desk: ciclo completo de tickets + inventario de equipos + métricas SLA",
                "AgendaTec: reservación de slots en tiempo real con soft-locks de Redis (45s)",
                "VisteTec: plataforma de donación de ropa con pipeline de compresión de imágenes",
                "Análisis estadístico: clustering K-means, detección de outliers IQR",
                "Sistema de permisos granular de 3 niveles (app.recurso.acción)",
                "Actualizaciones en tiempo real por WebSocket en todos los módulos",
                "Despliegue blue-green sin tiempo de inactividad vía GitHub Actions",
                "PgBouncer para pooling de conexiones a base de datos",
                "Herramientas CLI de administración con framework Click",
            ],
            "stats": {"apps": 4, "api_endpoints": 50, "python_files": 129, "db_tables": 40},
            "images": [
                {"src": "/images/projects/itcj-1.png", "alt": "Dashboard principal con lanzador de aplicaciones"},
                {"src": "/images/projects/itcj-2.png", "alt": "Vista de gestión de tickets Help-Desk"},
                {"src": "/images/projects/itcj-3.png", "alt": "Dashboard de analytics y estadísticas del Help-Desk"},
                {"src": "/images/projects/itcj-4.png", "alt": "Calendario de citas de AgendaTec"},
                {"src": "/images/projects/itcj-5.png", "alt": "Catálogo de donación de ropa VisteTec"},
            ],
        },
        {
            "id": "defer",
            "number": "03",
            "title": "DeferAplication",
            "subtitle": "Sistema de Gestión Empresarial",
            "description": (
                "Aplicación de escritorio con funcionalidades completas para un cliente privado, "
                "para gestionar inventario, ventas, clientes y proveedores — con reconciliación "
                "automática de stock en cada venta."
            ),
            "long_description": (
                "Una aplicación de escritorio completa para gestión empresarial construida con .NET 6 WinForms "
                "y PostgreSQL. Soporta productos multi-variante (presentación + aroma), recetas de producción "
                "que auto-descuentan materias primas, ventas a crédito con seguimiento de pagos, gestión de "
                "crédito con proveedores y reportes PDF completos. Incluye alertas de stock bajo en tiempo real "
                "y un sistema de búsqueda global."
            ),
            "tech": ["C#", ".NET 6", "WinForms", "PostgreSQL", "iTextSharp", "Npgsql"],
            "category": "App de Escritorio",
            "category_color": "green",
            "github": "https://github.com/Erne1357/deferAplication",
            "live": None,
            "status": "88% Completado",
            "features": [
                "Inventario multi-variante (presentación × combinaciones de aroma)",
                "Deducción automática de stock al registrar venta",
                "Gestión de recetas de producción con seguimiento de materias primas",
                "Sistema de crédito/pago diferido para clientes y proveedores",
                "Generación de facturas y reportes en PDF (iTextSharp)",
                "Panel de alertas de stock bajo en tiempo real",
                "Control de acceso basado en roles (admin / usuario)",
                "Búsqueda global en todas las entidades + sistema de atajos de teclado",
            ],
            "stats": {"models": 33, "controls": 43, "db_tables": 20, "completion": 88},
            "images": [
                {"src": "/images/projects/defer-1.png", "alt": "Dashboard principal de la aplicación"},
                {"src": "/images/projects/defer-2.png", "alt": "Pantalla de registro de ventas"},
                {"src": "/images/projects/defer-3.png", "alt": "Gestión de inventario de productos"},
                {"src": "/images/projects/defer-4.png", "alt": "Generación de reportes PDF"},
            ],
        },
    ],
}


@router.get("/projects")
def get_projects(lang: str = Query("en", pattern="^(en|es)$")):
    return DATA[lang]
