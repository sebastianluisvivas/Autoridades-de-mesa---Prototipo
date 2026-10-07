// Contiene las reglas para obtener la ubicación geográfica de una dirección mediante USIG

async function obtenerUbicacionDireccion(direccion) {
    if (!direccion) {
        throw new Error("No hay una dirección para buscar.");
    }

    let respuesta;

    try {
        respuesta = await obtenerUbicacion(direccion);
    } catch (error) {
        throw new Error("El servicio de mapas no está disponible en este momento.");
    }

    const resultados = respuesta.direccionesNormalizadas;

    if (!resultados || resultados.length === 0) {
        throw new Error(`No se encontró la dirección "${direccion}". Revisá que esté bien escrita e incluya la localidad.`);
    }

    const resultado = resultados[0];

    if (!resultado.coordenadas) {
        throw new Error(`No se pudo ubicar "${direccion}" en el mapa.`);
    }

    return resultado;
}