// Gestiona el acceso a los datos de las sedes.

async function obtenerSedes() {
    return leerColeccion("sedes");
}

async function guardarSede(sede) {
    const sedes = leerColeccion("sedes");
    const nuevaSede = { ...sede, id: generarId() };

    sedes.push(nuevaSede);
    guardarColeccion("sedes", sedes);

    return nuevaSede;
}