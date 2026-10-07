// Contiene las reglas de negocio de la evaluación de postulaciones (CU09, CU10, CU11).

// Devuelve las postulaciones con los nombres de las charlas de interés,
// para que la vista no tenga que resolver ids.
async function obtenerPostulacionesParaEvaluar() {
    const postulaciones = await obtenerPostulaciones();
    const charlas = await obtenerCharlas();

    return postulaciones.map(postulacion => ({
        ...postulacion,
        nombresCharlas: (postulacion.charlasInteres || []).map(idCharla => {
            const charla = charlas.find(charla => charla.id === idCharla);
            return charla ? charla.nombre : "Charla no encontrada";
        })
    }));
}


function validarPostulacionPendiente(postulacion) {
    if (!postulacion) {
        throw new Error("Debe seleccionar una postulación.");
    }

    if (postulacion.estado !== "pendiente") {
        throw new Error("La postulación ya fue evaluada.");
    }
}

async function aprobarPostulacion(postulacion) {
    validarPostulacionPendiente(postulacion);

    return await actualizarPostulacion(postulacion.id, {
        estado: "aprobada"
    });
}

async function rechazarPostulacion(postulacion, motivo) {
    validarPostulacionPendiente(postulacion);

    if (!motivo) {
        throw new Error("Debe ingresar el motivo del rechazo.");
    }

    return await actualizarPostulacion(postulacion.id, {
        estado: "rechazada",
        motivoRechazo: motivo
    });
}