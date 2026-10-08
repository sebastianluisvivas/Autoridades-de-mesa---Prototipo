let mapa = null;
let marcador = null;

function mostrarMapa(coordenadas) {
    const posicion = [coordenadas.y, coordenadas.x];

    if (!mapa) {
        mapa = L.map("mapa");

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(mapa);
    }

    mapa.setView(posicion, 16);

    if (marcador) {
        marcador.setLatLng(posicion);
    } else {
        marcador = L.marker(posicion).addTo(mapa);
    }
}


async function mostrarUbicacionEnMapa(direccion) {
    const mensaje = document.getElementById("mensaje-ubicacion");

    mensaje.textContent = "Buscando ubicación...";

    try {
        const ubicacion = await obtenerUbicacionDireccion(direccion);

        mostrarMapa(ubicacion.coordenadas);

        mensaje.textContent = `Ubicación encontrada: ${ubicacion.direccion}`;

        return ubicacion;
    } catch (error) {
        mensaje.textContent = error.message;

        return null;
    }
}