// Gestiona la interfaz del administrador: listado y detalle de postulaciones.

if (!haySesionAdministrador()) {
    window.location.href = "login.html";
}

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

    detalle.innerHTML = "";

    campos.forEach(([etiqueta, valor]) => {
        const termino = document.createElement("dt");
        const definicion = document.createElement("dd");
        termino.textContent = etiqueta;
        definicion.textContent = valor;
        detalle.append(termino, definicion);
    });

    document.getElementById("seccion-detalle").style.display = "block";
}

function manejarCierreSesion() {
    cerrarSesion();
    window.location.href = "login.html";
}