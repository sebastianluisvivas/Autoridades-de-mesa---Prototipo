// Gestiona el acceso a los datos de las sedes mediante la API de json-server.

const apiUrlSedes = "http://localhost:3000/sedes";

async function obtenerSedes() {
    const respuesta = await fetch(apiUrlSedes);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las sedes.");
    }

    return await respuesta.json();
}

async function guardarSede(sede) {
    const respuesta = await fetch(apiUrlSedes, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sede)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo guardar la sede.");
    }

    return await respuesta.json();
}