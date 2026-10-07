// Gestiona la presentación y actualización de la interfaz relacionada con las sedes.
if (!haySesionAdministrador()) {
    window.location.href = "login.html";
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

async function manejarRegistroSede(evento) {
    // Captura la interacción del usuario y muestra el resultado en la interfaz.

    evento.preventDefault();

    const nombre = document.getElementById("nombre-sede").value.trim();
    const direccion = document.getElementById("direccion-sede").value.trim();
    const mensaje = document.getElementById("mensaje");

    try {
        await registrarSede(nombre, direccion);

        mensaje.textContent = "Sede registrada correctamente.";

        document.getElementById("form-sede").reset();

        const sedes = await obtenerSedes();
        mostrarSedes(sedes);
        mostrarUbicacionEnMapa(direccion);

    } catch (error) {
        mensaje.textContent = error.message;
    }
}

document.getElementById("form-sede")
    .addEventListener("submit", manejarRegistroSede);


cargarSedes();