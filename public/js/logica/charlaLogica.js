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


    