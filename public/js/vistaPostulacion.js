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
        charlaInteres: document.getElementById("charla-interes").value
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