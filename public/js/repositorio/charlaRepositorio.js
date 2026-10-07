// Gestiona el acceso a los datos de las charlas mediante la API de json-server.

const API_URL_CHARLAS = "http://localhost:3000/charlas";

// Gestiona el acceso a los datos de las charlas.

async function obtenerCharlas() {
    return leerColeccion("charlas");
}