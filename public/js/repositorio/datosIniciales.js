// Datos de ejemplo que se cargan en el navegador la primera vez que se abre el prototipo.

const DATOS_INICIALES = {
    usuarios: [
        { id: "1", usuario: "administrador123", contrasena: "123", rol: "administrador" }
    ],
    sedes: [
        { id: "1", nombre: "Sede Núñez", direccion: "Alcorta 7597, CABA" },
        { id: "2", nombre: "Sede San Miguel", direccion: "Av. Dr. Ricardo Balbín 1617, San Miguel" },
        { id: "3", nombre: "Sede La Boca", direccion: "Brandsen 805, CABA" }

    ],
    charlas: [
        {
            id: "1",
            nombre: "Charla introductoria para autoridades de mesa",
            tema: "Introducción al rol de autoridad de mesa",
            fecha: "2026-10-15",
            hora: "18:00",
            sedeId: "1"
        },
        {
            id: "2",
            nombre: "Capacitación sobre el proceso electoral",
            tema: "Procedimiento y responsabilidades durante la jornada electoral",
            fecha: "2026-10-20",
            hora: "18:00",
            sedeId: "2"
        },
        {
            id: "3",
            nombre: "Escrutinio y cierre de mesa",
            tema: "Conteo de votos y confección de actas",
            fecha: "2026-10-27",
            hora: "17:00",
            sedeId: "3"
        }
    ],
    postulaciones: [
        {
            id: "1",
            distrito: "José C. Paz",
            nombre: "Lucía",
            apellido: "Fernández",
            dni: "38456123",
            fechaNacimiento: "1995-04-12",
            direccion: "Av. Pte. Perón 2500",
            telefono: "1145678901",
            correo: "lucia.fernandez@mail.com",
            autoridadPrevia: "si",
            afiliado: "no",
            agrupacion: "",
            charlasInteres: ["1", "2"],
            estado: "pendiente"
        },
        {
            id: "2",
            distrito: "San Miguel",
            nombre: "Martín",
            apellido: "Gómez",
            dni: "40123789",
            fechaNacimiento: "1998-09-30",
            direccion: "Belgrano 1200",
            telefono: "1132145698",
            correo: "martin.gomez@mail.com",
            autoridadPrevia: "no",
            afiliado: "si",
            agrupacion: "Agrupación Ejemplo",
            charlasInteres: ["3"],
            estado: "pendiente"
        },
        {
            id: "3",
            distrito: "Malvinas Argentinas",
            nombre: "Carla",
            apellido: "Ruiz",
            dni: "35987654",
            fechaNacimiento: "1990-01-22",
            direccion: "Italia 845",
            telefono: "1167894512",
            correo: "carla.ruiz@mail.com",
            autoridadPrevia: "no",
            afiliado: "no",
            agrupacion: "",
            charlasInteres: [],
            estado: "pendiente"
        }
    ],
    notificaciones: []
};