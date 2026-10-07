// Contiene las reglas de autenticación del administrador
// La sesión se guarda en sessionStorage porque es estado temporal del navegador
// no un dato del dominio: se pierde al cerrar la pestaña

const CLAVE_SESION = "sesionAdministrador";

async function iniciarSesion(nombreUsuario, contrasena) {
    if (!nombreUsuario || !contrasena) {
        throw new Error("Ingresá usuario y contraseña.");
    }

    const usuarios = await obtenerUsuarios();

    const usuario = usuarios.find(
        usuario => usuario.usuario === nombreUsuario && usuario.contrasena === contrasena
    );

    if (!usuario || usuario.rol !== "administrador") {
        throw new Error("Usuario o contraseña incorrectos.");
    }

    sessionStorage.setItem(CLAVE_SESION, usuario.id);
}

function cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION);
}

function haySesionAdministrador() {
    return sessionStorage.getItem(CLAVE_SESION) !== null;
}