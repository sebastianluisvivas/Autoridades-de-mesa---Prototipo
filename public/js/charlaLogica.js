// Contiene las reglas de negocio relacionadas con la consulta de charlas.

async function cargarCharlas() {
    try {
        const charlas = await obtenerCharlas();
        mostrarCharlas(charlas);
    } catch (error) {
        console.error(error);
    }
}