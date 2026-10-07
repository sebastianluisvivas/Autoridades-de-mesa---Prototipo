// Persistencia en el almacenamiento del navegador (localStorage)
// Centraliza la lectura y escritura para que los repositorios no repitan esta lógica

const PREFIJO_ALMACENAMIENTO = "autoridadesMesa_";

function leerColeccion(nombreColeccion) {
    try {
        const contenido = localStorage.getItem(PREFIJO_ALMACENAMIENTO + nombreColeccion);
        return contenido ? JSON.parse(contenido) : [];
    } catch (error) {
        throw new Error("No se pudieron leer los datos guardados en el navegador.");
    }
}

function guardarColeccion(nombreColeccion, elementos) {
    try {
        localStorage.setItem(PREFIJO_ALMACENAMIENTO + nombreColeccion, JSON.stringify(elementos));
    } catch (error) {
        throw new Error("No se pudieron guardar los datos en el navegador.");
    }
}

function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function inicializarAlmacenamiento() {
    Object.keys(DATOS_INICIALES).forEach(nombreColeccion => {
        const clave = PREFIJO_ALMACENAMIENTO + nombreColeccion;

        if (localStorage.getItem(clave) === null) {
            localStorage.setItem(clave, JSON.stringify(DATOS_INICIALES[nombreColeccion]));
        }
    });
}

inicializarAlmacenamiento();