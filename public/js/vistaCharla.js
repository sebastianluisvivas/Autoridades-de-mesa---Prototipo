// Gestiona la presentación y actualización de la interfaz relacionada con las charlas.

function mostrarCharlas(charlas, sedes) {
    const lista = document.getElementById("lista-charlas");

    lista.innerHTML = "";

    charlas.forEach(charla => {
        const sede = sedes.find(sede => sede.id === charla.sedeId);

        const elemento = document.createElement("li");
        elemento.addEventListener("click", () => {
         probarUbicacion(charla);
        });

        elemento.textContent =
            `${charla.nombre} - ${charla.fecha} ${charla.hora} - Sede: ${sede.nombre}`;

        lista.appendChild(elemento);
    });


    async function probarUbicacion(charla) {
    try {
        const ubicacion = await obtenerUbicacionCharla(charla);

        console.log("Respuesta de USIG:", ubicacion);

        const resultados = ubicacion.direccionesNormalizadas;

        const resultado = resultados[0];

        mostrarMapa(resultado.coordenadas);

        const lista = document.getElementById("lista-ubicaciones");

        lista.innerHTML = "";

        resultados.forEach((resultado, indice) => {
            const elemento = document.createElement("li");

            elemento.textContent =
                `${indice + 1}. ${resultado.direccion}`;

            lista.appendChild(elemento);

            console.log(
                `Resultado ${indice + 1}:`,
                resultado.direccion,
                resultado.coordenadas
            );
        });

    } catch (error) {
        console.error("Error al obtener ubicación:", error);
    }
}
}