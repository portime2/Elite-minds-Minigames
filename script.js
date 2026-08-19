// Validación del Login en index.html
const loginForm = document.getElementById('loginForm');
if (loginForm) {
loginForm.addEventListener('submit', function(e) {
e.preventDefault(); // Evita que recargue la página por defecto
const usuarioInput = document.getElementById('usuario').value;
const passwordInput = document.getElementById('password').value;
const errorMsg = document.getElementById('errorMsg');
// Credenciales de ejemplo (puedes cambiarlas a tu gusto)
const usuarioValido = "admin";
const passwordValido = "12345";
if (usuarioInput === usuarioValido && passwordInput === passwordValido) {
// Si coincide, redirige a la página principal
window.location.href = "principal.html";
} else {
// Muestra mensaje de error
errorMsg.style.display = "block";
}
});
}
// Función para capturar el clic en las tarjetas y pasar a la página de detalle
function cargarDetalle(nombreModulo) {
// Guardamos el nombre del módulo en el almacenamiento local del navegador
localStorage.setItem('moduloSeleccionado', nombreModulo);
// Redirigimos a la página de detalle
window.location.href = "detalle.html";
}