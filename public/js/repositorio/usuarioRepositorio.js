// Gestiona el acceso a los datos de los usuarios.

async function obtenerUsuarios() {
    return leerColeccion("usuarios");
}