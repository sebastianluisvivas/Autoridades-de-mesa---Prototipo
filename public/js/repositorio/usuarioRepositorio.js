// Gestiona el acceso a los datos de los usuarios mediante la API de json-server

const API_URL_USUARIOS = "http://localhost:3000/usuarios";

async function obtenerUsuarios() {
    const respuesta = await fetch(API_URL_USUARIOS);

    if (!respuesta.ok) {
        throw new Error("No se pudo verificar el usuario.");
    }

    return await respuesta.json();
}