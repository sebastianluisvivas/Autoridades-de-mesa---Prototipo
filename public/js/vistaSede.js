/* Gestiona la presentación y actualización de la interfaz relacionada con las sedes
La idea es que sedeView.js se ocupe de mostrar información en pantalla, pero no de decidir reglas de negocio ni de acceder directamente a db.json.

Por ahora tendrá una única responsabilidad: mostrar las sedes que recibe */



// Gestiona la presentación y actualización de la interfaz relacionada con las sedes.

function mostrarSedes(sedes) {
    const lista = document.getElementById("lista-sedes");

    lista.innerHTML = "";

    sedes.forEach(sede => {
        const elemento = document.createElement("li");

        elemento.textContent = `${sede.nombre} - ${sede.direccion}`;

        lista.appendChild(elemento);
    });
}