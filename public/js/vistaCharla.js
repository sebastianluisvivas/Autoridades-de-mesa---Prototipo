// Gestiona la presentación y actualización de la interfaz relacionada con las charlas.

function mostrarCharlas(charlas) {
    const lista = document.getElementById("lista-charlas");

    lista.innerHTML = "";

    charlas.forEach(charla => {
        const elemento = document.createElement("li");

        elemento.textContent =
            `${charla.nombre} - ${charla.fecha} ${charla.hora}`;

        lista.appendChild(elemento);
    });
}