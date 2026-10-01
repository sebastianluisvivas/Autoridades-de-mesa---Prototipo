// Gestiona el acceso a los datos de las sedes mediante la API de json-server
//La responsabilidad de este archivo será hablar con /sedes
/*por ej más adelante tendremos

obtenerSedes()
guardarSede()

Pero no va a decidir si una sede es válida o si puede registrarse. Eso corresponde a la lógica.
*/


// Gestiona el acceso a los datos de las sedes mediante la API de json-server.

const API_URL = "http://localhost:3000/sedes";

async function obtenerSedes() {     //hace peticion y devuelve los datos que json-server obtiene de db.json
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las sedes.");
    }
    return await respuesta.json();
}