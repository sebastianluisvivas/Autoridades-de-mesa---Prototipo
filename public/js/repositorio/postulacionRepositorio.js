// Gestiona el acceso a los datos de las postulaciones mediante la API de json-server

const API_URL_POSTULACIONES = "http://localhost:3000/postulaciones";

async function guardarPostulacion(postulacion) {
    const respuesta = await fetch(API_URL_POSTULACIONES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postulacion)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo registrar la postulación.");
    }

    return await respuesta.json();
}

async function obtenerPostulaciones() {
    const respuesta = await fetch(API_URL_POSTULACIONES);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las postulaciones.");
    }

    return await respuesta.json();
}

async function actualizarPostulacion(id, cambios) {
    const respuesta = await fetch(`${API_URL_POSTULACIONES}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cambios)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo actualizar la postulación.");
    }

    return await respuesta.json();
}