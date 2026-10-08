// Gestiona la presentación y actualización de la interfaz relacionada con las charlas.

async function cargarCharlas() {
    try {
        const charlas = await obtenerCharlasConSede();
        mostrarCharlas(charlas);
    } catch (error) {
        document.getElementById("mensaje-ubicacion").textContent = error.message;
    }
}

function mostrarCharlas(charlas) {
    const lista = document.getElementById("lista-charlas");

    lista.innerHTML = "";

    if (charlas.length === 0) {
        const aviso = document.createElement("li");
        aviso.textContent = "No hay charlas disponibles por el momento.";
        lista.appendChild(aviso);
        return;
    }

    charlas.forEach(charla => {
        const elemento = document.createElement("li");

        if (charla.sede) {
            elemento.textContent =
                `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede: ${charla.sede.nombre}`;
            elemento.addEventListener("click", () => mostrarUbicacionEnMapa(charla.sede.direccion));
        } else {
            elemento.textContent =
                `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede no disponible`;
        }

        lista.appendChild(elemento);
    });
}

cargarCharlas();