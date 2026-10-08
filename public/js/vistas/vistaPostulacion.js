// Gestiona la interacción y actualización de la interfaz del formulario de postulación.

document.getElementById("afiliado")
    .addEventListener("change", actualizarCampoAgrupacion);

document.getElementById("form-postulacion")
    .addEventListener("submit", manejarRegistroPostulacion);

async function manejarRegistroPostulacion(evento) {
    evento.preventDefault();

    const datos = {
        distrito: document.getElementById("distrito").value,
        nombre: document.getElementById("nombre-postulante").value.trim(),
        apellido: document.getElementById("apellido-postulante").value.trim(),
        dni: document.getElementById("dni-postulante").value.trim(),
        fechaNacimiento: document.getElementById("fecha-nacimiento").value,
        direccion: document.getElementById("direccion-postulante").value.trim(),
        telefono: document.getElementById("telefono-postulante").value.trim(),
        correo: document.getElementById("correo-postulante").value.trim(),
        autoridadPrevia: document.getElementById("autoridad-previa").value,
        afiliado: document.getElementById("afiliado").value,
        agrupacion: document.getElementById("agrupacion").value.trim(),
        charlasInteres: obtenerCharlasSeleccionadas()
    };

    const mensaje = document.getElementById("mensaje-postulacion");

    try {
        await registrarPostulacion(datos);

        mensaje.textContent = "Postulación registrada correctamente.";

        document.getElementById("form-postulacion").reset();

        actualizarCampoAgrupacion();

    } catch (error) {
        mensaje.textContent = error.message;
    }
}



    function mostrarCharlasDisponibles(charlas) {
    const contenedor = document.getElementById("charlas-interes");

    if (charlas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "No hay charlas disponibles por el momento.";
        contenedor.appendChild(aviso);
        return;
    }

    charlas.forEach(charla => {
        const etiqueta = document.createElement("label");
        const casilla = document.createElement("input");

        casilla.type = "checkbox";
        casilla.name = "charla-interes";
        casilla.value = charla.id;

        const nombreSede = charla.sede ? charla.sede.nombre : "Sede no disponible";
        etiqueta.append(casilla, ` ${charla.nombre} - ${charla.fecha} ${charla.hora} - ${nombreSede}`);
        contenedor.appendChild(etiqueta);
    });
}

function obtenerCharlasSeleccionadas() {
    const casillasMarcadas = document.querySelectorAll('input[name="charla-interes"]:checked');

    return Array.from(casillasMarcadas).map(casilla => casilla.value);
}

cargarCharlasDisponibles();

function actualizarCampoAgrupacion() {
    const afiliado = document.getElementById("afiliado").value;
    const campoAgrupacion = document.getElementById("campo-agrupacion");
    const agrupacion = document.getElementById("agrupacion");

    if (afiliado === "si") {
        campoAgrupacion.style.display = "block";
        agrupacion.required = true;
    } else {
        campoAgrupacion.style.display = "none";
        agrupacion.required = false;
        agrupacion.value = "";
    }
}

async function cargarCharlasDisponibles() {
    try {
        const charlas = await obtenerCharlasConSede();
        mostrarCharlasDisponibles(charlas);
    } catch (error) {
        document.getElementById("mensaje-postulacion").textContent =
            "No se pudieron cargar las charlas.";
    }
}
