// Gestiona la presentación y actualización de la interfaz relacionada con las charlas.

let charlasCargadas = [];

document.getElementById("buscador-charlas")
    .addEventListener("input", manejarBusquedaCharlas);

async function cargarCharlas() {
    try {
        charlasCargadas = await obtenerCharlasConSede();
        mostrarCharlas(charlasCargadas, "No hay charlas disponibles por el momento.");
    } catch (error) {
        document.getElementById("mensaje-ubicacion").textContent = error.message;
    }
}

function manejarBusquedaCharlas(evento) {
    const charlasFiltradas = filtrarCharlas(charlasCargadas, evento.target.value);

    mostrarCharlas(charlasFiltradas, "No se encontraron charlas para esa búsqueda.");
}

function mostrarCharlas(charlas, textoSinResultados) {
    const lista = document.getElementById("lista-charlas");

    lista.innerHTML = "";

    if (charlas.length === 0) {
        const aviso = document.createElement("li");
        aviso.textContent = textoSinResultados;
        lista.appendChild(aviso);
        return;
    }

    charlas.forEach(charla => {
        const elemento = document.createElement("li");

        if (charla.sede) {
            elemento.textContent =
                `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede: ${charla.sede.nombre} (${charla.sede.direccion})`;
            elemento.addEventListener("click", () => mostrarUbicacionEnMapa(charla.sede.direccion));
        } else {
            elemento.textContent =
                `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede no disponible`;
        }

        lista.appendChild(elemento);
    });
}

cargarCharlas();