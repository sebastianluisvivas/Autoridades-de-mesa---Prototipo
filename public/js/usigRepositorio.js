// Gestiona la comunicación con la API de USIG para obtener información geográfica de una dirección
//Recibe ""Juan María Gutiérrez 1150" y se comunica con USIG

const USIG_URL = "https://servicios.usig.buenosaires.gob.ar/normalizar/";

async function obtenerUbicacion(direccion) {
    const url = `${USIG_URL}?direccion=${encodeURIComponent(direccion)}&geocodificar=true`;

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        throw new Error("No se pudo obtener la ubicación de la dirección.");
    }

    return await respuesta.json();
}