// ==========================================
// BANCO DE PREGUNTAS
// ==========================================

const PREGUNTAS = [
    {
        categoria: "Sistemas Operativos",
        pregunta: "¿Cuál es el sistema operativo de código abierto más popular en servidores?",
        opciones: ["Windows", "Linux", "macOS", "Android"],
        correcta: 1
    },

    {
        categoria: "Hardware",
        pregunta: "¿Qué componente almacena temporalmente los datos que está utilizando el computador?",
        opciones: ["Disco duro", "RAM", "Procesador", "Tarjeta gráfica"],
        correcta: 1
    },

    {
        categoria: "Redes",
        pregunta: "¿En qué capa del modelo OSI opera principalmente el protocolo IP?",
        opciones: ["Capa física", "Capa de enlace", "Capa de red", "Capa de transporte"],
        correcta: 2
    },

    {
        categoria: "Programación",
        pregunta: "¿Qué lenguaje se utiliza principalmente para dar interactividad a una página web?",
        opciones: ["HTML", "CSS", "JavaScript", "SQL"],
        correcta: 2
    },

    {
        categoria: "Hardware",
        pregunta: "¿Qué significa CPU?",
        opciones: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        correcta: 0
    },

    {
        categoria: "Redes",
        pregunta: "¿Qué dispositivo permite conectar diferentes equipos dentro de una red local?",
        opciones: ["Switch", "Monitor", "Teclado", "Impresora"],
        correcta: 0
    },

    {
        categoria: "Programación",
        pregunta: "¿Qué etiqueta HTML se utiliza para crear un enlace?",
        opciones: ["<p>", "<a>", "<link>", "<url>"],
        correcta: 1
    },

    {
        categoria: "Bases de Datos",
        pregunta: "¿Qué lenguaje se utiliza para consultar bases de datos relacionales?",
        opciones: ["HTML", "CSS", "SQL", "PHP"],
        correcta: 2
    },

    {
        categoria: "Internet",
        pregunta: "¿Qué significa HTTP?",
        opciones: [
            "HyperText Transfer Protocol",
            "High Transfer Text Program",
            "Hyperlink Text Transfer Process",
            "Host Transfer Protocol"
        ],
        correcta: 0
    },

    {
        categoria: "Seguridad",
        pregunta: "¿Cuál de estos es un ejemplo de malware?",
        opciones: ["Antivirus", "Firewall", "Virus", "Router"],
        correcta: 2
    },

    {
        categoria: "Hardware",
        pregunta: "¿Cuál es la función principal de la tarjeta gráfica?",
        opciones: [
            "Procesar imágenes y gráficos",
            "Guardar archivos",
            "Conectar a Internet",
            "Controlar el teclado"
        ],
        correcta: 0
    },

    {
        categoria: "Programación",
        pregunta: "¿Qué significa HTML?",
        opciones: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correcta: 0
    },

    {
        categoria: "Redes",
        pregunta: "¿Qué identifica de forma lógica a un dispositivo dentro de una red?",
        opciones: ["Dirección IP", "Monitor", "CPU", "RAM"],
        correcta: 0
    },

    {
        categoria: "Sistemas Operativos",
        pregunta: "¿Cuál de estos sistemas operativos fue desarrollado por Microsoft?",
        opciones: ["Linux", "Windows", "Ubuntu", "Android"],
        correcta: 1
    },

    {
        categoria: "Seguridad",
        pregunta: "¿Qué elemento ayuda a proteger una red controlando el tráfico?",
        opciones: ["Firewall", "Monitor", "Teclado", "Memoria RAM"],
        correcta: 0
    }
];


// ==========================================
// VARIABLES DEL JUEGO
// ==========================================

let preguntasMezcladas = [];
let preguntaActual = 0;
let puntaje = 0;
let tiempo = 15;
let temporizador = null;
let respondida = false;

const TOTAL_PREGUNTAS = 10;


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const pantallaResultado = document.getElementById("pantalla-resultado");

const numActual = document.getElementById("num-actual");
const totalPreguntas = document.getElementById("total-preguntas");

const puntajeActual = document.getElementById("puntaje-actual");
const puntajeFinal = document.getElementById("puntaje-final");

const categoria = document.getElementById("categoria");
const preguntaTexto = document.getElementById("pregunta-texto");
const opciones = document.getElementById("opciones");

const feedback = document.getElementById("feedback");
const btnSiguiente = document.getElementById("btn-siguiente");

const tiempoDisplay = document.getElementById("tiempo");
const barraFill = document.getElementById("barra-fill");

const recordDisplay = document.getElementById("record-display");
const recordDisplayFinal = document.getElementById("record-display-final");

const mensajeResultado = document.getElementById("mensaje-resultado");
const resultadoEmoji = document.getElementById("resultado-emoji");


// ==========================================
// MEZCLAR ARRAY
// ==========================================

function mezclar(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}


// ==========================================
// MOSTRAR RÉCORD
// ==========================================

function obtenerRecord() {
    return Number(localStorage.getItem("recordTrivia")) || 0;
}

function actualizarRecord() {
    const record = obtenerRecord();

    recordDisplay.textContent = record;
    recordDisplayFinal.textContent = record;
}


// ==========================================
// INICIAR JUEGO
// ==========================================

function iniciarJuego() {

    preguntaActual = 0;
    puntaje = 0;

    // Mezclar las preguntas y seleccionar 10
    preguntasMezcladas = mezclar(PREGUNTAS).slice(0, TOTAL_PREGUNTAS);

    totalPreguntas.textContent = TOTAL_PREGUNTAS;
    puntajeActual.textContent = puntaje;

    pantallaInicio.classList.add("oculto");
    pantallaResultado.classList.add("oculto");
    pantallaJuego.classList.remove("oculto");

    mostrarPregunta();
}


// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

    respondida = false;

    clearInterval(temporizador);

    const pregunta = preguntasMezcladas[preguntaActual];

    numActual.textContent = preguntaActual + 1;

    categoria.textContent = pregunta.categoria;

    preguntaTexto.textContent = pregunta.pregunta;

    puntajeActual.textContent = puntaje;

    feedback.textContent = "";
    feedback.classList.add("oculto");

    btnSiguiente.classList.add("oculto");

    opciones.innerHTML = "";

    // Actualizar barra de progreso
    const progreso =
        ((preguntaActual + 1) / TOTAL_PREGUNTAS) * 100;

    barraFill.style.width = progreso + "%";


    // Crear opciones
    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.className = "opcion";

        boton.textContent = opcion;

        boton.onclick = () => seleccionarRespuesta(indice);

        opciones.appendChild(boton);
    });


    // Iniciar temporizador
    iniciarTemporizador();
}


// ==========================================
// TEMPORIZADOR
// ==========================================

function iniciarTemporizador() {

    tiempo = 15;

    tiempoDisplay.textContent = tiempo;

    temporizador = setInterval(() => {

        tiempo--;

        tiempoDisplay.textContent = tiempo;

        if (tiempo <= 0) {

            clearInterval(temporizador);

            tiempoAgotado();
        }

    }, 1000);
}


// ==========================================
// TIEMPO AGOTADO
// ==========================================

function tiempoAgotado() {

    if (respondida) return;

    respondida = true;

    const pregunta = preguntasMezcladas[preguntaActual];

    const botones = document.querySelectorAll(".opcion");

    botones.forEach((boton, indice) => {

        boton.disabled = true;

        if (indice === pregunta.correcta) {
            boton.classList.add("correcta");
        }

    });

    feedback.textContent =
        "⏰ ¡Tiempo agotado! La respuesta correcta era: " +
        pregunta.opciones[pregunta.correcta];

    feedback.classList.remove("oculto");

    mostrarBotonSiguiente();
}


// ==========================================
// SELECCIONAR RESPUESTA
// ==========================================

function seleccionarRespuesta(indice) {

    if (respondida) return;

    respondida = true;

    clearInterval(temporizador);

    const pregunta = preguntasMezcladas[preguntaActual];

    const botones = document.querySelectorAll(".opcion");

    botones.forEach(boton => {
        boton.disabled = true;
    });


    // RESPUESTA CORRECTA
    if (indice === pregunta.correcta) {

        puntaje++;

        puntajeActual.textContent = puntaje;

        botones[indice].classList.add("correcta");

        feedback.textContent = "✅ ¡Respuesta correcta!";

        feedback.classList.remove("oculto");

    }

    // RESPUESTA INCORRECTA
    else {

        botones[indice].classList.add("incorrecta");

        botones[pregunta.correcta].classList.add("correcta");

        feedback.textContent =
            "❌ Incorrecto. La respuesta correcta era: " +
            pregunta.opciones[pregunta.correcta];

        feedback.classList.remove("oculto");
    }


    mostrarBotonSiguiente();
}


// ==========================================
// MOSTRAR BOTÓN SIGUIENTE
// ==========================================

function mostrarBotonSiguiente() {

    btnSiguiente.classList.remove("oculto");

    // Si es la última pregunta
    if (preguntaActual === TOTAL_PREGUNTAS - 1) {

        btnSiguiente.textContent = "Ver Resultado 🏆";

    } else {

        btnSiguiente.textContent = "Siguiente →";
    }
}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

    if (!respondida) return;

    // Si ya terminó las 10 preguntas
    if (preguntaActual >= TOTAL_PREGUNTAS - 1) {

        finalizarJuego();

        return;
    }

    preguntaActual++;

    mostrarPregunta();
}


// ==========================================
// FINALIZAR JUEGO
// ==========================================

function finalizarJuego() {

    clearInterval(temporizador);

    pantallaJuego.classList.add("oculto");

    pantallaResultado.classList.remove("oculto");

    // Mostrar puntaje
    puntajeFinal.textContent = puntaje;


    // Obtener récord anterior
    let record = obtenerRecord();


    // Si superó el récord
    if (puntaje > record) {

        record = puntaje;

        localStorage.setItem(
            "recordTrivia",
            record
        );

        mensajeResultado.textContent =
            "🎉 ¡Nuevo récord! Has conseguido tu mejor puntuación.";

        resultadoEmoji.textContent = "🏆";

    }

    // Puntaje perfecto
    else if (puntaje === TOTAL_PREGUNTAS) {

        mensajeResultado.textContent =
            "🔥 ¡Puntuación perfecta! ¡Excelente trabajo!";

        resultadoEmoji.textContent = "👑";

    }

    // Buen resultado
    else if (puntaje >= 7) {

        mensajeResultado.textContent =
            "👏 ¡Muy bien! Tienes buenos conocimientos de sistemas.";

        resultadoEmoji.textContent = "🥇";

    }

    // Resultado medio
    else if (puntaje >= 5) {

        mensajeResultado.textContent =
            "👍 ¡Buen trabajo! Sigue practicando para mejorar.";

        resultadoEmoji.textContent = "🥈";

    }

    // Resultado bajo
    else {

        mensajeResultado.textContent =
            "💪 Puedes mejorar. ¡Inténtalo nuevamente!";

        resultadoEmoji.textContent = "📚";
    }


    // Mostrar récord actualizado
    recordDisplayFinal.textContent = record;
    recordDisplay.textContent = record;
}


// ==========================================
// REINICIAR JUEGO
// ==========================================

function reiniciarJuego() {

    clearInterval(temporizador);

    pantallaResultado.classList.add("oculto");

    pantallaInicio.classList.remove("oculto");

    actualizarRecord();
}


// ==========================================
// INICIALIZAR RÉCORD
// ==========================================

actualizarRecord();

}
