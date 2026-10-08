// Contiene las reglas de negocio relacionadas con las sedes.

async function registrarSede(nombre, direccion) {
    if (!nombre || !direccion) {
        throw new Error("Ingresá el nombre y buscá la dirección en el mapa antes de guardar.");
    }

    const sedes = await obtenerSedes();

    const nombreExiste = sedes.some(
        sede => sede.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (nombreExiste) {
        throw new Error("Ya existe una sede con ese nombre.");
    }

    // Se verifica la dirección con USIG y se guarda la versión normalizada.
    const ubicacion = await obtenerUbicacionDireccion(direccion);

    return await guardarSede({
        nombre: nombre,
        direccion: ubicacion.direccion
    });
}

// Devuelve las sedes ordenadas alfabéticamente por nombre.
async function obtenerSedesOrdenadas() {
    const sedes = await obtenerSedes();

    return sedes.sort((a, b) => a.nombre.localeCompare(b.nombre));
}