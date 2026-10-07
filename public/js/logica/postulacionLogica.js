// Contiene las reglas de negocio relacionadas con la inscripción de postulantes.



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

    const charlasInteres = datos.charlasInteres || [];

if (charlasInteres.length > 1) {
    const charlas = await obtenerCharlas();

    if (tieneCharlasSuperpuestas(charlasInteres, charlas)) {
        throw new Error("Seleccionaste charlas en el mismo día y horario. Elegí solo una de ellas.");
    }
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
        charlasInteres: charlasInteres,
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
function tieneCharlasSuperpuestas(idsSeleccionados, charlas) {
    const horarios = charlas
        .filter(charla => idsSeleccionados.includes(charla.id))
        .map(charla => `${charla.fecha} ${charla.hora}`);

    return new Set(horarios).size !== horarios.length;
}