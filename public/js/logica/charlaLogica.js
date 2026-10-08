// Contiene las reglas de negocio relacionadas con las charlas.

// Devuelve las charlas con los datos de su sede, para que las vistas no tengan que resolver ids.
async function obtenerCharlasConSede() {
    const charlas = await obtenerCharlas();
    const sedes = await obtenerSedes();

    return charlas.map(charla => ({
        ...charla,
        sede: sedes.find(sede => sede.id === charla.sedeId) || null
    }));
}


// Pasa el texto a minúsculas y le quita las tildes, para comparar sin importar cómo se escribió.
function normalizarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarCharlas(charlas, textoBusqueda) {
    const busqueda = normalizarTexto(textoBusqueda.trim());

    if (!busqueda) {
        return charlas;
    }

    return charlas.filter(charla => {
        const campos = [charla.nombre, charla.tema];

        if (charla.sede) {
            campos.push(charla.sede.nombre, charla.sede.direccion);
        }

        return campos.some(campo => normalizarTexto(campo).includes(busqueda));
    });
}