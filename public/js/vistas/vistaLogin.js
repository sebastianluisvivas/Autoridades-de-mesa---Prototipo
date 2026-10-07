// Gestiona la interacción del formulario de acceso del administrador.

document.getElementById("form-login")
    .addEventListener("submit", manejarInicioSesion);

async function manejarInicioSesion(evento) {
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const mensaje = document.getElementById("mensaje-login");

    try {
        await iniciarSesion(usuario, contrasena);
        window.location.href = "admin.html";
    } catch (error) {
        mensaje.textContent = error.message;
    }
}