// Gestiona el acceso a los datos de las charlas mediante la API de json-server.

const API_URL_CHARLAS = "http://localhost:3000/charlas";

async function obtenerCharlas() {
    const respuesta = await fetch(API_URL_CHARLAS);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las charlas.");
    }

    return await respuesta.json();
}