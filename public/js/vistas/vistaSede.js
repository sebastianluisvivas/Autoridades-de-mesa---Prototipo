// Gestiona la presentación y actualización de la interfaz relacionada con las sedes.

if (!haySesionAdministrador()) {
    window.location.href = "login.html";
}

// Dirección confirmada por USIG; mientras sea null no se puede guardar la sede.
let direccionVerificada = null;

document.getElementById("boton-buscar-direccion")
    .addEventListener("click", manejarBusquedaDireccion);

document.getElementById("direccion-sede")
    .addEventListener("input", invalidarDireccionVerificada);

document.getElementById("form-sede")
    .addEventListener("submit", manejarRegistroSede);

async function cargarSedes() {
    try {
        const sedes = await obtenerSedesOrdenadas();
        mostrarSedes(sedes);
    } catch (error) {
        document.getElementById("mensaje").textContent = error.message;
    }
}

function mostrarSedes(sedes) {
    const lista = document.getElementById("lista-sedes");

    lista.innerHTML = "";

    sedes.forEach(sede => {
        const elemento = document.createElement("li");

        elemento.textContent = `${sede.nombre} - ${sede.direccion}`;
        elemento.addEventListener("click", () => mostrarUbicacionEnMapa(sede.direccion));

        lista.appendChild(elemento);
    });
}

async function manejarBusquedaDireccion() {
    const direccion = document.getElementById("direccion-sede").value.trim();

    const ubicacion = await mostrarUbicacionEnMapa(direccion);

    direccionVerificada = ubicacion ? ubicacion.direccion : null;
    document.getElementById("boton-guardar-sede").disabled = !ubicacion;
}

function invalidarDireccionVerificada() {
    direccionVerificada = null;
    document.getElementById("boton-guardar-sede").disabled = true;
}

async function manejarRegistroSede(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre-sede").value.trim();
    const mensaje = document.getElementById("mensaje");

    try {
        await registrarSede(nombre, direccionVerificada);

        mensaje.textContent = "Sede registrada correctamente.";

        document.getElementById("form-sede").reset();
        invalidarDireccionVerificada();

        await cargarSedes();
    } catch (error) {
        mensaje.textContent = error.message;
    }
}

cargarSedes();