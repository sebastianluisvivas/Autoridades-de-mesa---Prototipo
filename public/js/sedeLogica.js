// Contiene las reglas de negocio relacionadas con el registro y consulta de sedes
//Por ahora vamos a usarlo para coordinar la obtención de las sedes.


async function cargarSedes() {
    try {
        const sedes = await obtenerSedes();
        mostrarSedes(sedes);
    } catch (error) {
        console.error(error);
    }
}

