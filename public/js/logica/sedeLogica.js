// Contiene las reglas de negocio relacionadas con las sedes


async function registrarSede(nombre, direccion) {
    // Valida los datos necesarios para registrar una sede y, si son correctos,
    // solicita al repositorio que la guarde.

    if (!nombre || !direccion) {
        throw new Error("El nombre y la dirección son obligatorios.");
    }

    const sedes = await obtenerSedes();

    const nombreExiste = sedes.some(
        sede => sede.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (nombreExiste) {
        throw new Error("Ya existe una sede con ese nombre.");
    }

    const nuevaSede = {
        nombre: nombre,
        direccion: direccion
    };

    return await guardarSede(nuevaSede);
}

// Devuelve las sedes ordenadas alfabéticamente por nombre
async function obtenerSedesOrdenadas() {
    const sedes = await obtenerSedes();

    return sedes.sort((a, b) => a.nombre.localeCompare(b.nombre));
}