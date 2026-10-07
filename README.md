# Portal de Autoridades de Mesa — Prototipo

Prototipo del TP de Ingeniería de Software (UNGS, 2026).

**Sitio publicado:** (link de Vercel)

## Tecnologías
HTML, CSS y JavaScript, sin frameworks ni dependencias que instalar.
- Mapa: Leaflet + OpenStreetMap.
- Normalización y geolocalización de direcciones: API de USIG.

## Cómo ejecutarlo localmente
No requiere instalar nada. Solo hace falta un servidor estático, por ejemplo:
- VS Code con la extensión **Live Server**: clic derecho en `index.html` → *Open with Live Server*.

## Acceso de administrador
- Usuario: `administrador123`
- Contraseña: `123`

## Persistencia
Los datos se guardan en el `localStorage` del navegador. La primera vez que se abre
el sitio se cargan datos de ejemplo (`js/repositorio/datosIniciales.js`).
Para restablecerlos: F12 → Aplicación → Local Storage → borrar las claves `autoridadesMesa_*`.

## Arquitectura
`js/` está separado en tres capas:
- `vistas/`: interacción con la interfaz.
- `logica/`: reglas de negocio y validaciones.
- `repositorio/`: acceso a datos (localStorage) y a la API externa (USIG).

Inicialmente la persistencia se implementó con json-server. Se migró a localStorage
para poder publicar el prototipo como sitio estático. Gracias a la separación en capas,
el cambio solo afectó a la carpeta `repositorio/`.