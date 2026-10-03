// Contiene las reglas de negocio relacionadas con la inscripción de postulantes.

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

async function registrarPostulacion(datos) {
    // Valida los datos necesarios y solicita al repositorio
    // que registre la postulación.

    if (
        !datos.distrito ||
        !datos.nombre ||
        !datos.apellido ||
        !datos.dni ||
        !datos.fechaNacimiento ||
        !datos.direccion ||
        !datos.telefono ||
        !datos.correo ||
        !datos.autoridadPrevia ||
        !datos.afiliado
    ) {
        throw new Error("Todos los campos obligatorios deben estar completos.");
    }

    if (datos.afiliado === "si" && !datos.agrupacion) {
        throw new Error("Debe indicar la agrupación política.");
    }

    const postulacion = {
        distrito: datos.distrito,
        nombre: datos.nombre,
        apellido: datos.apellido,
        dni: datos.dni,
        fechaNacimiento: datos.fechaNacimiento,
        direccion: datos.direccion,
        telefono: datos.telefono,
        correo: datos.correo,
        autoridadPrevia: datos.autoridadPrevia,
        afiliado: datos.afiliado,
        agrupacion: datos.agrupacion || "",
        charlaInteres: datos.charlaInteres || "",
        estado: "pendiente"
    };

    return await guardarPostulacion(postulacion);
    }


    

    async function cargarCharlasDisponibles() {
    try {
        const charlas = await obtenerCharlas();
        mostrarCharlasDisponibles(charlas);
    } catch (error) {
        console.error("No se pudieron cargar las charlas:", error);
    }
}
