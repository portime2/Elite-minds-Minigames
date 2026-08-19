const CATEGORIAS = {
    'Programación': ['javascript','variable','funcion','objeto','arreglo','bucle','clase','herencia','polimorfismo','depuracion'],
    'Tecnología':   ['computadora','algoritmo','navegador','framework','biblioteca','interfaz','componente','servidor','protocolo','seguridad'],
    'Juegos':       ['ahorcado','ajedrez','domino','ruleta','blackjack','solitario','tetris','puzle','laberinto','aventura'],
    'Ciencia':      ['galaxia','protena','neurona','fotosntesis','gravitacion','electron','molecula','isotopo','hidrogeno','carbono']
  };
  const MAX_ERRORES = 6;
  let palabraSecreta='', letrasAdivinadas=[], letrasIncorrectas=[], juegoTerminado=false;
  let ganadas=0, perdidas=0, racha=0;
  let pistaUsada=false;
  let categoriaActual='';
  
  const canvas=document.getElementById('lienzo');
  const ctx=canvas.getContext('2d');
  
  // ── CANVAS ──────────────────────────────────────
  function dibujarAhorcado(errores, estado) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const color = estado==='gano'?'#4ade80':estado==='perdio'?'#f87171':'#c4b5fd';
    ctx.strokeStyle='#7c3aed'; ctx.lineWidth=4;
    const L=(x1,y1,x2,y2)=>{ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()};
    L(20,310,280,310); L(60,310,60,20); L(60,20,175,20); L(175,20,175,58);
    ctx.strokeStyle=color; ctx.lineWidth=3; ctx.lineCap='round';
    if(errores>=1){ctx.beginPath();ctx.arc(175,85,27,0,Math.PI*2);ctx.stroke();}
    if(errores>=2) L(175,112,175,205);
    if(errores>=3) L(175,130,128,178);
    if(errores>=4) L(175,130,222,178);
    if(errores>=5) L(175,205,130,270);
    if(errores>=6) L(175,205,220,270);
    // Cara
    if(estado==='perdio'&&errores>=1){
      ctx.fillStyle='#f87171';
      [[162,80],[185,80]].forEach(([x,y])=>{
        ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
      });
      ctx.beginPath();ctx.arc(175,95,12,0,Math.PI);ctx.stroke();
    }
    if(estado==='gano'&&errores<MAX_ERRORES){
      ctx.fillStyle='#4ade80';
      [[162,80],[185,80]].forEach(([x,y])=>{
        ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();
      });
      ctx.beginPath();ctx.arc(175,92,12,Math.PI,0);ctx.stroke();
    }
  }
  
  // ── JUEGO ────────────────────────────────────────
  function iniciarJuego(){
    const cats=Object.keys(CATEGORIAS);
    categoriaActual=cats[Math.floor(Math.random()*cats.length)];
    const arr=CATEGORIAS[categoriaActual];
    palabraSecreta=arr[Math.floor(Math.random()*arr.length)];
    letrasAdivinadas=[]; letrasIncorrectas=[]; juegoTerminado=false; pistaUsada=false;
    document.getElementById('categoriaLabel').textContent=categoriaActual;
    document.getElementById('longPalabra').textContent=palabraSecreta.length+' letras';
    document.getElementById('subtitulo').textContent='¡Adivina la palabra!';
    const msg=document.getElementById('mensaje'); msg.textContent=''; msg.className='';
    document.getElementById('listaIncorrectas').textContent='';
    document.getElementById('btnPista').disabled=false;
    canvas.className='';
    crearVidas(); crearTeclado(); renderizarPalabra(); dibujarAhorcado(0,'');
  }
  
  function crearVidas(){
    const bar=document.getElementById('vidaBar'); bar.innerHTML='';
    for(let i=0;i<MAX_ERRORES;i++){
      const d=document.createElement('div');
      d.className='vida activa'; d.id='vida'+i; bar.appendChild(d);
    }
  }
  
  function actualizarVidas(){
    for(let i=0;i<MAX_ERRORES;i++){
      const v=document.getElementById('vida'+i);
      if(v) v.className='vida'+(i>=letrasIncorrectas.length?' activa':'');
    }
  }
  
  function renderizarPalabra(nuevaLetra=''){
    const display=document.getElementById('palabraDisplay'); display.innerHTML='';
    for(const l of palabraSecreta){
      const s=document.createElement('span');
      s.className='letra-slot'+(letrasAdivinadas.includes(l)&&l===nuevaLetra?' nueva':'');
      s.textContent=letrasAdivinadas.includes(l)?l.toUpperCase():'_';
      display.appendChild(s);
    }
  }
  
  function crearTeclado(){
    const t=document.getElementById('teclado'); t.innerHTML='';
    for(const l of 'abcdefghijklmnopqrstuvwxyz'){
      const b=document.createElement('button');
      b.className='tecla'; b.textContent=l.toUpperCase(); b.dataset.letra=l;
      b.onclick=()=>seleccionarLetra(l,b); t.appendChild(b);
    }
  }
  
  function seleccionarLetra(letra,btn){
    if(juegoTerminado||letrasAdivinadas.includes(letra)||letrasIncorrectas.includes(letra)) return;
    btn.classList.add('usada');
    if(palabraSecreta.includes(letra)){
      letrasAdivinadas.push(letra); btn.classList.add('correcto');
      renderizarPalabra(letra);
    } else {
      letrasIncorrectas.push(letra); btn.classList.add('incorrecto');
      document.getElementById('listaIncorrectas').textContent=
        letrasIncorrectas.map(l=>l.toUpperCase()).join(', ');
      actualizarVidas();
      dibujarAhorcado(letrasIncorrectas.length,'');
      renderizarPalabra();
    }
    verificarEstado();
  }
  
  function verificarEstado(){
    const ok=[...palabraSecreta].every(l=>letrasAdivinadas.includes(l));
    const msg=document.getElementById('mensaje');
    if(ok){
      juegoTerminado=true; ganadas++; racha++;
      msg.textContent='🎉 ¡Ganaste! +1 punto'; msg.className='gano';
      canvas.className='gano'; dibujarAhorcado(letrasIncorrectas.length,'gano');
    } else if(letrasIncorrectas.length>=MAX_ERRORES){
      juegoTerminado=true; perdidas++; racha=0;
      [...palabraSecreta].forEach(l=>{if(!letrasAdivinadas.includes(l)) letrasAdivinadas.push(l);});
      renderizarPalabra();
      msg.textContent='💀 Era: '+palabraSecreta.toUpperCase(); msg.className='perdio';
      canvas.className='perdio'; dibujarAhorcado(MAX_ERRORES,'perdio');
    }
    document.getElementById('cntGanadas').textContent=ganadas;
    document.getElementById('cntPerdidas').textContent=perdidas;
    document.getElementById('cntRacha').textContent=racha;
  }
  
  function darPista(){
    if(juegoTerminado||pistaUsada) return;
    pistaUsada=true;
    document.getElementById('btnPista').disabled=true;
    // Revelar letra no adivinada y penalizar
    const ocultas=[...new Set([...palabraSecreta])].filter(l=>!letrasAdivinadas.includes(l));
    if(!ocultas.length) return;
    const pista=ocultas[Math.floor(Math.random()*ocultas.length)];
    letrasAdivinadas.push(pista);
    // Penalizar: agregar fallo fantasma
    if(letrasIncorrectas.length<MAX_ERRORES-1){
      letrasIncorrectas.push('?');
      document.getElementById('listaIncorrectas').textContent=
        letrasIncorrectas.filter(l=>l!=='?').map(l=>l.toUpperCase()).join(', ');
      actualizarVidas();
      dibujarAhorcado(letrasIncorrectas.length,'');
    }
    renderizarPalabra(pista);
    verificarEstado();
  }
  
  document.addEventListener('keydown',(e)=>{
    const l=e.key.toLowerCase();
    if(!/^[a-z]$/.test(l)) return;
    const b=document.querySelector(`.tecla[data-letra="${l}"]`);
    if(b&&!b.classList.contains('usada')) seleccionarLetra(l,b);
  });
  
  iniciarJuego();