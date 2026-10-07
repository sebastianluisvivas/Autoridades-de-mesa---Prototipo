// Gestiona la presentación y actualización de la interfaz relacionada con las charlas.

function mostrarCharlas(charlas, sedes) {
    const lista = document.getElementById("lista-charlas");

    lista.innerHTML = "";

    if (charlas.length === 0) {
        const aviso = document.createElement("li");
        aviso.textContent = "No hay charlas disponibles por el momento.";
        lista.appendChild(aviso);
        return;
    }

    charlas.forEach(charla => {
        const sede = sedes.find(sede => sede.id === charla.sedeId);
        const elemento = document.createElement("li");

        if (sede) {
            elemento.textContent =
                `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede: ${sede.nombre}`;
            elemento.addEventListener("click", () => mostrarUbicacionEnMapa(sede.direccion));
        } else {
            elemento.textContent =
                `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede no disponible`;
        }

        lista.appendChild(elemento);
    });
}