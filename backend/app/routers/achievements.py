from fastapi import APIRouter, Query

router = APIRouter()

DATA = {
    "en": [
        {
            "id": "icpc-2024",
            "title": "ICPC Mexico Finals 2024",
            "event": "International Collegiate Programming Contest",
            "year": "2024",
            "rank": "74 / 120",
            "place": None,
            "type": "rank",
            "description": (
                "Qualified and competed in the ICPC Mexico Finals 2024, "
                "ranking 74th out of 120 of the best university teams across Mexico."
            ),
            "icon": "trophy",
            "color": "cyan",
        },
        {
            "id": "icpc-2023",
            "title": "ICPC Mexico Finals 2023",
            "event": "International Collegiate Programming Contest",
            "year": "2023",
            "rank": "44 / 60",
            "place": None,
            "type": "rank",
            "description": (
                "Qualified and competed in the ICPC Mexico Finals 2023, "
                "ranking 44th out of 60 top university teams in Mexico."
            ),
            "icon": "trophy",
            "color": "cyan",
        },
        {
            "id": "intertecnm-2024",
            "title": "1st Place — State Contest 2024",
            "event": "interTecNM Chihuahua State Programming Contest",
            "year": "2024",
            "rank": None,
            "place": "1st",
            "type": "place",
            "description": (
                "Won 1st place at the interTecNM Chihuahua State Programming Contest "
                "for the second consecutive year, competing against universities across the state."
            ),
            "icon": "medal",
            "color": "gold",
        },
        {
            "id": "intertecnm-2023",
            "title": "1st Place — State Contest 2023",
            "event": "interTecNM Chihuahua State Programming Contest",
            "year": "2023",
            "rank": None,
            "place": "1st",
            "type": "place",
            "description": (
                "Won 1st place at the interTecNM Chihuahua State Programming Contest, "
                "defeating teams from all TecNM institutions in Chihuahua."
            ),
            "icon": "medal",
            "color": "gold",
        },
        {
            "id": "ccna-2024",
            "title": "CCNAV7: Introduction to Networks",
            "event": "Cisco Networking Academy Certification",
            "year": "2024",
            "rank": None,
            "place": None,
            "type": "certification",
            "description": (
                "Completed Cisco's CCNAV7 certification covering network fundamentals, "
                "IP addressing, routing protocols, and switch configuration (Jan – Jun 2024)."
            ),
            "icon": "award",
            "color": "blue",
        },
    ],
    "es": [
        {
            "id": "icpc-2024",
            "title": "Final Nacional ICPC México 2024",
            "event": "Concurso Internacional de Programación Colegial",
            "year": "2024",
            "rank": "74 / 120",
            "place": None,
            "type": "rank",
            "description": (
                "Clasifiqué y competí en la Final Nacional ICPC México 2024, "
                "obteniendo el lugar 74 de 120 de los mejores equipos universitarios de México."
            ),
            "icon": "trophy",
            "color": "cyan",
        },
        {
            "id": "icpc-2023",
            "title": "Final Nacional ICPC México 2023",
            "event": "Concurso Internacional de Programación Colegial",
            "year": "2023",
            "rank": "44 / 60",
            "place": None,
            "type": "rank",
            "description": (
                "Clasifiqué y competí en la Final Nacional ICPC México 2023, "
                "obteniendo el lugar 44 de 60 de los mejores equipos universitarios de México."
            ),
            "icon": "trophy",
            "color": "cyan",
        },
        {
            "id": "intertecnm-2024",
            "title": "1er Lugar — Concurso Estatal 2024",
            "event": "Concurso Estatal de Programación interTecNM Chihuahua",
            "year": "2024",
            "rank": None,
            "place": "1er",
            "type": "place",
            "description": (
                "Obtuve el 1er lugar en el Concurso Estatal de Programación interTecNM Chihuahua "
                "por segundo año consecutivo, compitiendo contra universidades de todo el estado."
            ),
            "icon": "medal",
            "color": "gold",
        },
        {
            "id": "intertecnm-2023",
            "title": "1er Lugar — Concurso Estatal 2023",
            "event": "Concurso Estatal de Programación interTecNM Chihuahua",
            "year": "2023",
            "rank": None,
            "place": "1er",
            "type": "place",
            "description": (
                "Obtuve el 1er lugar en el Concurso Estatal de Programación interTecNM Chihuahua, "
                "venciendo equipos de todas las instituciones TecNM en Chihuahua."
            ),
            "icon": "medal",
            "color": "gold",
        },
        {
            "id": "ccna-2024",
            "title": "CCNAV7: Introducción a Redes",
            "event": "Certificación Cisco Networking Academy",
            "year": "2024",
            "rank": None,
            "place": None,
            "type": "certification",
            "description": (
                "Completé la certificación CCNAV7 de Cisco cubriendo fundamentos de redes, "
                "direccionamiento IP, protocolos de enrutamiento y configuración de switches (Ene – Jun 2024)."
            ),
            "icon": "award",
            "color": "blue",
        },
    ],
}


@router.get("/achievements")
def get_achievements(lang: str = Query("en", pattern="^(en|es)$")):
    return DATA[lang]
