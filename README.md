# - TP Autoridad de mesa

# -Comentarios generales
(v 1.0) se irá mejorando:

# -Stack: 
HTML, CSS, JS

# -Persistencia: 
Archivo JSON del lado del servidor, json-server (una API tipo REST sobre ese JSON)


# -Requisitos para iniciar el proyecto:

1) Descargar e instalar node.js desde la pagina principal: https://nodejs.org/es/download "windows installer" → dejar todas las opciones por defecto e instalar.

2) Comprobar ejecutando node --version   Y   npm --version

3) Clonar el repositorio en tu pc

4) Instalar las dependencias faltantes ejecutando "npm install", en la carpeta .gitignore están los modulos de node.js, para evitar subirlos y agregar peso, cada uno debe agregarlas.

- Una vez instalado NodeJS, las dependencias faltantes y clonado el repositorio:

# Ejecución:
- "npm start" para ejecutar el script que tenemos en package.json
- Las dependencias del proyecto están declaradas en package.json y npm install las descarga automáticamente. 

## Aclaración:
Agregamos Node.js únicamente para ejecutar json-server, que nos proporciona una API REST local y permite persistir los datos en un db.json. 
Así separamos la interfaz del acceso a datos y cualquier integrante puede clonar el proyecto, ejecutar "npm install" y "npm start" para tener su propia instancia local


Al hacer npm veremos → start JSON Server started on PORT :3000
Quiere decir que efectivamente tenemos nuestra propia instancia corriendo en nuestro navegador, por lo tanto vamos a algún browser de nuestra pc y colocamos en la url lo siguiente:
http://localhost:3000


# Arquitectura estructura general:


El proyecto separa las responsabilidades en distintas capas:

Presentación: HTML y archivos JavaScript encargados de la interfaz.
Lógica de negocio: contiene las reglas y validaciones del sistema.
Acceso a datos: se comunica con la API proporcionada por json-server.
Persistencia: archivo data/db.json.

La comunicación entre la aplicación y los datos se realiza mediante una API REST local.

# Aclaración x2: 
La aplicación ES PRINCIPALMENTE HTML/CSS/JS; Node.js nos proporciona el entorno para ejecutar el servidor de persistencia.
