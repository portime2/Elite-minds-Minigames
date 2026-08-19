// ==============================
// Piedra, Papel o Tijera
// ==============================

// Variables de estado
let puntosUsuario = 0;
let puntosPC = 0;

// Referencias al DOM
const mensaje = document.getElementById("mensaje");
const elecciones = document.getElementById("elecciones");
const marcadorUsuario = document.getElementById("puntos-jugador");
const marcadorPC = document.getElementById("puntos-computadora");

// Botones del juego
const botones = document.querySelectorAll(".boton-opcion");

// ==============================
// Función principal
// ==============================
function jugar(opcionUsuario) {

    // Opciones posibles
    const opciones = ["piedra", "papel", "tijera"];

    // La computadora elige una opción al azar
    const indexPC = Math.floor(Math.random() * 3);
    const opcionPC = opciones[indexPC];

    // ==========================
    // Determinar el ganador
    // ==========================
    if (opcionUsuario === opcionPC) {

        mensaje.innerText = "¡Es un empate! 🤝";

    } else if (

        (opcionUsuario === "piedra" && opcionPC === "tijera") ||
        (opcionUsuario === "papel" && opcionPC === "piedra") ||
        (opcionUsuario === "tijera" && opcionPC === "papel")

    ) {

        puntosUsuario++;
        mensaje.innerText = "¡Ganaste este punto! 🔥";

    } else {

        puntosPC++;
        mensaje.innerText = "¡La computadora ganó! 🤖";

    }

    // Actualizar la interfaz
    actualizarInterfaz(opcionUsuario, opcionPC);
}

// ==============================
// Actualizar la pantalla
// ==============================
function actualizarInterfaz(usuario, pc) {

    elecciones.innerText = `Elegiste: ${usuario} | PC eligió: ${pc}`;

    marcadorUsuario.innerText = puntosUsuario;
    marcadorPC.innerText = puntosPC;

}

// ==============================
// Eventos de los botones
// ==============================
botones.forEach(boton => {

    boton.addEventListener("click", () => {

        jugar(boton.id);

    });

});
