// Gestiona la visualización de ubicaciones mediante un mapa interactivo

function mostrarMapa(coordenadas) {
    const latitud = coordenadas.y;
    const longitud = coordenadas.x;

    const mapa = L.map("mapa").setView([latitud, longitud], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapa);

    L.marker([latitud, longitud])
        .addTo(mapa);
}