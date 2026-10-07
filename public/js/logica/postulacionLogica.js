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

    validarFormatoDatos(datos);

    if (await existePostulacionConDni(datos.dni)) {
    throw new Error("Ya existe una postulación registrada con ese DNI.");
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

function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const yaCumplioEsteAnio =
        hoy.getMonth() > nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());

    if (!yaCumplioEsteAnio) {
        edad--;
    }

    return edad;
}

function validarFormatoDatos(datos) {
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/;

    if (!soloLetras.test(datos.nombre) || !soloLetras.test(datos.apellido)) {
        throw new Error("El nombre y el apellido solo pueden contener letras.");
    }

    if (!/^\d{7,8}$/.test(datos.dni)) {
        throw new Error("El DNI debe tener 7 u 8 números, sin puntos.");
    }

    const edad = calcularEdad(datos.fechaNacimiento);

    if (isNaN(edad) || edad > 100) {
        throw new Error("La fecha de nacimiento no es válida.");
    }

    if (edad < 18) {
        throw new Error("Debe ser mayor de 18 años para postularse.");
    }

    const telefonoSinSeparadores = datos.telefono.replace(/[\s-]/g, "");

    if (!/^\d{8,15}$/.test(telefonoSinSeparadores)) {
        throw new Error("El teléfono debe contener solo números (entre 8 y 15 dígitos).");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
        throw new Error("El correo electrónico no es válido.");
    }
}

async function existePostulacionConDni(dni) {  //evita que la misma persona se postule dos veces
    const postulaciones = await obtenerPostulaciones();

    return postulaciones.some(postulacion => postulacion.dni === dni);
}