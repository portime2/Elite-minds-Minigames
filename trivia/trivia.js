// ===============================
// BANCO DE PREGUNTAS
// ===============================
const PREGUNTAS = [
  {
    pregunta: "¿Cuál es el sistema operativo de código abierto más popular en servidores?",
    opciones: ["Windows Server", "Linux", "macOS", "FreeBSD"],
    correcta: 1,
    categoria: "🐧 Sistemas Operativos",
    explicacion: "Linux domina la mayoría de los servidores web del mundo."
  },
  {
    pregunta: "¿Qué significa RAM?",
    opciones: [
      "Read Access Memory",
      "Random Access Memory",
      "Rapid Array Module",
      "Run Application Mode"
    ],
    correcta: 1,
    categoria: "💾 Hardware",
    explicacion: "RAM significa Random Access Memory."
  },
  {
    pregunta: "¿En qué capa del modelo OSI trabaja el protocolo IP?",
    opciones: [
      "Capa Física",
      "Capa de Enlace",
      "Capa de Red",
      "Capa de Transporte"
    ],
    correcta: 2,
    categoria: "🌐 Redes",
    explicacion: "IP pertenece a la Capa 3 (Red)."
  },
  {
    pregunta: "¿Qué dispositivo conecta varias computadoras dentro de una red local?",
    opciones: [
      "Router",
      "Switch",
      "Módem",
      "Firewall"
    ],
    correcta: 1,
    categoria: "🌐 Redes",
    explicacion: "El switch permite conectar equipos dentro de una LAN."
  },
  {
    pregunta: "¿Cuál es la extensión de un archivo de Microsoft Word?",
    opciones: [".xls", ".ppt", ".docx", ".txt"],
    correcta: 2,
    categoria: "📄 Ofimática",
    explicacion: "Los documentos modernos de Word usan la extensión .docx."
  },
  {
    pregunta: "¿Qué significa CPU?",
    opciones: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Control Program Unit",
      "Central Program Utility"
    ],
    correcta: 0,
    categoria: "💻 Hardware",
    explicacion: "CPU significa Unidad Central de Procesamiento."
  },
  {
    pregunta: "¿Cuál de estos es un navegador web?",
    opciones: [
      "Windows",
      "Google Chrome",
      "Ubuntu",
      "Excel"
    ],
    correcta: 1,
    categoria: "🌍 Internet",
    explicacion: "Google Chrome es uno de los navegadores más utilizados."
  },
  {
    pregunta: "¿Qué protocolo se utiliza para navegar de forma segura en Internet?",
    opciones: [
      "FTP",
      "HTTP",
      "HTTPS",
      "SMTP"
    ],
    correcta: 2,
    categoria: "🔒 Seguridad",
    explicacion: "HTTPS cifra la comunicación mediante SSL/TLS."
  },
  {
    pregunta: "¿Qué significa SSD?",
    opciones: [
      "Solid State Drive",
      "System Storage Disk",
      "Secure Storage Device",
      "Standard System Disk"
    ],
    correcta: 0,
    categoria: "💾 Hardware",
    explicacion: "SSD significa Solid State Drive."
  },
  {
    pregunta: "¿Qué empresa desarrolló Windows?",
    opciones: [
      "Apple",
      "Google",
      "Microsoft",
      "IBM"
    ],
    correcta: 2,
    categoria: "💻 Sistemas Operativos",
    explicacion: "Microsoft desarrolla el sistema operativo Windows."
  },
  {
    pregunta: "¿Qué dirección IP corresponde al localhost?",
    opciones: [
      "192.168.1.1",
      "127.0.0.1",
      "255.255.255.0",
      "8.8.8.8"
    ],
    correcta: 1,
    categoria: "🌐 Redes",
    explicacion: "127.0.0.1 representa el propio equipo (localhost)."
  },
  {
    pregunta: "¿Qué componente almacena los datos de forma permanente?",
    opciones: [
      "RAM",
      "Procesador",
      "Disco duro o SSD",
      "Tarjeta gráfica"
    ],
    correcta: 2,
    categoria: "💾 Hardware",
    explicacion: "El disco duro y el SSD almacenan la información permanentemente."
  },
  {
    pregunta: "¿Cuál de estos lenguajes se utiliza para dar estilo a una página web?",
    opciones: [
      "HTML",
      "Python",
      "CSS",
      "SQL"
    ],
    correcta: 2,
    categoria: "🌐 Desarrollo Web",
    explicacion: "CSS controla el diseño y la apariencia de las páginas web."
  },
  {
    pregunta: "¿Cuál es el propósito principal de un antivirus?",
    opciones: [
      "Crear páginas web",
      "Acelerar Internet",
      "Proteger el equipo contra malware",
      "Editar documentos"
    ],
    correcta: 2,
    categoria: "🛡 Seguridad",
    explicacion: "El antivirus detecta y elimina software malicioso."
  },
  {
    pregunta: "¿Qué significa la sigla URL?",
    opciones: [
      "Universal Resource Locator",
      "Uniform Resource Locator",
      "Universal Route Link",
      "Uniform Route Link"
    ],
    correcta: 1,
    categoria: "🌍 Internet",
    explicacion: "URL significa Uniform Resource Locator."
  }
];


// ===============================
// CONFIGURACIÓN
// ===============================
const TIEMPO_LIMITE = 15;

// ===============================
// ESTADO DEL JUEGO
// ===============================
let estado = {
  indice: 0,
  puntaje: 0,
  respondida: false,
  temporizadorId: null,
  preguntasMezcladas: []
};

// ===============================
// MEZCLAR PREGUNTAS
// ===============================
function mezclar(arr) {
  const copia = [...arr];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

// ===============================
// INICIAR JUEGO
// ===============================
function iniciarJuego() {

  estado.indice = 0;
  estado.puntaje = 0;
  estado.respondida = false;

  estado.preguntasMezcladas = mezclar(PREGUNTAS).slice(0, 10);

  document.getElementById("puntaje-actual").textContent = "0";

  mostrarPantalla("pantalla-juego");
  mostrarPregunta();
}

// ===============================
// CAMBIAR PANTALLAS
// ===============================
function mostrarPantalla(idVisible) {

  [
    "pantalla-inicio",
    "pantalla-juego",
    "pantalla-resultado"
  ].forEach(id => {

    document.getElementById(id).classList.toggle(
      "oculto",
      id !== idVisible
    );

  });

}

// ===============================
// MOSTRAR PREGUNTA
// ===============================
function mostrarPregunta() {
document.getElementById("feedback").classList.add("oculto");
  if (estado.indice >= estado.preguntasMezcladas.length) {
    terminarJuego();
    return;
  }

  estado.respondida = false;

  const p = estado.preguntasMezcladas[estado.indice];

  document.getElementById("num-actual").textContent =
    estado.indice + 1;

  document.getElementById("categoria").textContent =
    p.categoria;

  document.getElementById("pregunta-texto").textContent =
    p.pregunta;

  const progreso =
    ((estado.indice) /
      estado.preguntasMezcladas.length) * 100;

  document.getElementById("barra-fill").style.width =
    progreso + "%";

  const contenedor =
    document.getElementById("opciones");

  contenedor.innerHTML =
    p.opciones.map((op, i) =>

      `<button class="opcion"
          onclick="responder(${i})">

          <span class="letra">
            ${"ABCD"[i]}
          </span>

          ${op}

      </button>`

    ).join("");

  document.getElementById("btn-siguiente")
    .classList.add("oculto");

  iniciarTemporizador();

}

// ===============================
// RESPONDER
// ===============================
function responder(indiceElegido) {

  if (estado.respondida) return;

  estado.respondida = true;

  clearInterval(estado.temporizadorId);

  const p = estado.preguntasMezcladas[estado.indice];

  const botones =
    document.querySelectorAll(".opcion");

  botones.forEach(btn => btn.disabled = true);

  if (indiceElegido === p.correcta) {

    botones[indiceElegido]
      .classList.add("correcto");

    estado.puntaje += 100;

    mostrarFeedback(true, p.explicacion);

  } else {

    if (indiceElegido >= 0) {

      botones[indiceElegido]
        .classList.add("incorrecto");

    }

    botones[p.correcta]
      .classList.add("correcto");

    mostrarFeedback(false, p.explicacion);

  }

  document.getElementById("puntaje-actual")
    .textContent = estado.puntaje;

  document.getElementById("btn-siguiente")
    .classList.remove("oculto");

}

// ===============================
// SIGUIENTE PREGUNTA
// ===============================
function siguientePregunta() {

    estado.indice++;

    if (estado.indice >= estado.preguntasMezcladas.length) {
        terminarJuego();
        return;
    }

    mostrarPregunta();
}

// ===============================
// TEMPORIZADOR
// ===============================
function iniciarTemporizador() {

  let tiempo = TIEMPO_LIMITE;

  const el = document.getElementById("tiempo");

  el.style.color = "";

  el.textContent = tiempo;

  clearInterval(estado.temporizadorId);

  estado.temporizadorId = setInterval(() => {

    tiempo--;

    el.textContent = tiempo;

    if (tiempo <= 10)
      el.style.color = "#facc15";

    if (tiempo <= 5)
      el.style.color = "#ef4444";

    if (tiempo <= 0) {

      clearInterval(estado.temporizadorId);

      responder(-1);

    }

  }, 1000);

}

// ===============================
// FEEDBACK
// ===============================
function mostrarFeedback(correcto, texto) {

    const mensaje = document.getElementById("feedback");

    mensaje.classList.remove("oculto");

    mensaje.innerHTML =
        (correcto ? "✅ Correcto<br>" : "❌ Incorrecto<br>") +
        texto;


}

// ===============================
// FINALIZAR JUEGO
// ===============================
function terminarJuego() {

    clearInterval(estado.temporizadorId);

    guardarRecord(estado.puntaje);

    document.getElementById("puntaje-final").textContent = estado.puntaje;

    document.getElementById("record").textContent =
        localStorage.getItem("trivia-record") || 0;

    mostrarPantalla("pantalla-resultado");
}

// ===============================
// GUARDAR RÉCORD
// ===============================
function guardarRecord(puntaje) {

  const record = localStorage.getItem("trivia-record") || 0;

document.getElementById("record-display").textContent = record;
document.getElementById("record-display-final").textContent = record;

  if (puntaje > record) {

    localStorage.setItem(
      "trivia-record",
      puntaje
    );

  }

}

// ===============================
// REINICIAR JUEGO
// ===============================
function reiniciarJuego() {

  iniciarJuego();

}
