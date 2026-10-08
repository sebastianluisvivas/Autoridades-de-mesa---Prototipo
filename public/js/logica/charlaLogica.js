// Contiene las reglas de negocio relacionadas con las charlas.

// Devuelve las charlas con los datos de su sede, para que las vistas no tengan que resolver ids.
async function obtenerCharlasConSede() {
    const charlas = await obtenerCharlas();
    const sedes = await obtenerSedes();

    return charlas.map(charla => ({
        ...charla,
        sede: sedes.find(sede => sede.id === charla.sedeId) || null
    }));
}