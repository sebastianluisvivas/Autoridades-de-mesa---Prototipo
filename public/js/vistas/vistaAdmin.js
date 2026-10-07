// Gestiona la interfaz del administrador: listado y detalle de postulaciones.

if (!haySesionAdministrador()) {
    window.location.href = "login.html";
}

let postulacionSeleccionada = null;

document.getElementById("boton-aprobar")
    .addEventListener("click", manejarAprobacion);

document.getElementById("boton-rechazar")
    .addEventListener("click", manejarRechazo);

document.getElementById("boton-cerrar-sesion")
    .addEventListener("click", manejarCierreSesion);

cargarPostulaciones();

async function cargarPostulaciones() {
    const mensaje = document.getElementById("mensaje-admin");

    try {
        const postulaciones = await obtenerPostulacionesParaEvaluar();
        mostrarPostulaciones(postulaciones);
    } catch (error) {
        mensaje.textContent = error.message;
    }
}

function mostrarPostulaciones(postulaciones) {
    const cuerpo = document.getElementById("cuerpo-postulaciones");
    const mensaje = document.getElementById("mensaje-admin");

    cuerpo.innerHTML = "";

    if (postulaciones.length === 0) {
        mensaje.textContent = "No existen postulantes registrados.";
        return;
    }

    postulaciones.forEach(postulacion => {
        const fila = document.createElement("tr");

        [postulacion.apellido, postulacion.nombre, postulacion.dni,
         postulacion.distrito, postulacion.estado].forEach(valor => {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        const celdaAccion = document.createElement("td");
        const botonDetalle = document.createElement("button");
        botonDetalle.type = "button";
        botonDetalle.textContent = "Ver detalle";
        botonDetalle.addEventListener("click", () => mostrarDetallePostulacion(postulacion));
        celdaAccion.appendChild(botonDetalle);
        fila.appendChild(celdaAccion);

        cuerpo.appendChild(fila);
    });
}

function mostrarDetallePostulacion(postulacion) {
    postulacionSeleccionada = postulacion;
    const detalle = document.getElementById("detalle-postulacion");

    const campos = [
        ["Nombre y apellido", `${postulacion.nombre} ${postulacion.apellido}`],
        ["DNI", postulacion.dni],
        ["Fecha de nacimiento", postulacion.fechaNacimiento],
        ["Dirección", postulacion.direccion],
        ["Teléfono", postulacion.telefono],
        ["Correo", postulacion.correo],
        ["Distrito", postulacion.distrito],
        ["Fue autoridad de mesa", postulacion.autoridadPrevia === "si" ? "Sí" : "No"],
        ["Afiliación política", postulacion.afiliado === "si" ? postulacion.agrupacion : "No afiliado"],
        ["Charlas de interés", postulacion.nombresCharlas.length > 0
            ? postulacion.nombresCharlas.join(", ")
            : "Ninguna"],
        ["Estado", postulacion.estado]
    ];
    if (postulacion.estado === "rechazada") {
    campos.push(["Motivo del rechazo", postulacion.motivoRechazo]);
    }

    detalle.innerHTML = "";

    campos.forEach(([etiqueta, valor]) => {
        const termino = document.createElement("dt");
        const definicion = document.createElement("dd");
        termino.textContent = etiqueta;
        definicion.textContent = valor;
        detalle.append(termino, definicion);
    });

    document.getElementById("motivo-rechazo").value = "";
    document.getElementById("mensaje-evaluacion").textContent = "";

    document.getElementById("acciones-evaluacion").style.display =
        postulacion.estado === "pendiente" ? "block" : "none";

    document.getElementById("seccion-detalle").style.display = "block";
}

function manejarCierreSesion() {
    cerrarSesion();
    window.location.href = "login.html";
}

async function manejarAprobacion() {
    const mensaje = document.getElementById("mensaje-evaluacion");

    try {
        await aprobarPostulacion(postulacionSeleccionada);
        finalizarEvaluacion("Postulación aprobada correctamente.");
    } catch (error) {
        mensaje.textContent = error.message;
    }
}

async function manejarRechazo() {
    const motivo = document.getElementById("motivo-rechazo").value.trim();
    const mensaje = document.getElementById("mensaje-evaluacion");

    try {
        await rechazarPostulacion(postulacionSeleccionada, motivo);
        finalizarEvaluacion("Postulación rechazada correctamente.");
    } catch (error) {
        mensaje.textContent = error.message;
    }
}

function finalizarEvaluacion(textoConfirmacion) {
    document.getElementById("mensaje-evaluacion").textContent = textoConfirmacion;
    document.getElementById("seccion-detalle").style.display = "none";
    postulacionSeleccionada = null;
    cargarPostulaciones();
}