// Contiene las reglas de negocio relacionadas con el registro y consulta de sedes.
// Por ahora vamos a usarlo para coordinar la obtención de las sedes.

async function cargarSedes() {
    try {
        const sedes = await obtenerSedes();
        mostrarSedes(sedes);
    } catch (error) {
        console.error(error);
    }
}

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