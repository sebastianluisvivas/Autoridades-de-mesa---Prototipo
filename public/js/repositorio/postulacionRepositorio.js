// Gestiona el acceso a los datos de las postulaciones.

async function obtenerPostulaciones() {
    return leerColeccion("postulaciones");
}

async function guardarPostulacion(postulacion) {
    const postulaciones = leerColeccion("postulaciones");
    const nuevaPostulacion = { ...postulacion, id: generarId() };

    postulaciones.push(nuevaPostulacion);
    guardarColeccion("postulaciones", postulaciones);

    return nuevaPostulacion;
}

async function actualizarPostulacion(id, cambios) {
    const postulaciones = leerColeccion("postulaciones");
    const indice = postulaciones.findIndex(postulacion => postulacion.id === id);

    if (indice === -1) {
        throw new Error("No se encontró la postulación.");
    }

    postulaciones[indice] = { ...postulaciones[indice], ...cambios };
    guardarColeccion("postulaciones", postulaciones);

    return postulaciones[indice];
}