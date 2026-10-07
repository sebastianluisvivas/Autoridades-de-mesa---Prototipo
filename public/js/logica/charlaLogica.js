// Contiene las reglas de negocio relacionadas con la consulta de charlas

async function cargarCharlas() {
    try {
        const charlas = await obtenerCharlas();
        const sedes = await obtenerSedes();

        mostrarCharlas(charlas, sedes);
    } catch (error) {
        console.error(error);
    }
}


    //Recibe charla y busca sede correspondiente, ej recibe "charla sede id 2, busca en las sedes cual id es el 2 y devuelve la ubicacion"
    async function obtenerDireccionCharla(charla) {
    const sedes = await obtenerSedes();

    const sede = sedes.find(sede => sede.id === charla.sedeId);

    if (!sede) {
        throw new Error("No se encontró la sede de la charla.");
    }

    return sede.direccion;
}


async function obtenerUbicacionCharla(charla) {
    const direccion = await obtenerDireccionCharla(charla);

    return await obtenerUbicacion(direccion);
}
