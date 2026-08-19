
const WINS=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board=['','','','','','','','',''],cp='X',go=false;
const score={X:0,O:0,e:0};
const statusEl=document.getElementById('status');
const cells=document.querySelectorAll('.cell');
function updateScore(){document.getElementById('sx').textContent=score.X;document.getElementById('so').textContent=score.O;document.getElementById('se').textContent=score.e;}
function checkWinner(){
  for(const[a,b,c]of WINS){
    if(board[a]&&board[a]===board[b]&&board[a]===board[c]){
      go=true;score[board[a]]++;updateScore();
      statusEl.textContent='🏆 ¡Ganó '+board[a]+'!';
      [a,b,c].forEach(i=>cells[i].classList.add('win'));return;
    }
  }
  if(board.every(v=>v)){go=true;score.e++;updateScore();statusEl.textContent='🤝 ¡Empate!';}
}
cells.forEach(c=>c.addEventListener('click',e=>{
  const i=+e.target.dataset.index;
  if(board[i]||go)return;
  board[i]=cp;e.target.textContent=cp;
  e.target.classList.add(cp.toLowerCase(),'taken');
  checkWinner();
  if(!go){cp=cp==='X'?'O':'X';statusEl.textContent='Turno de '+cp;}
}));
document.getElementById('restart').addEventListener('click',()=>{
  board=['','','','','','','','',''];cp='X';go=false;
  statusEl.textContent='Turno de X';
  cells.forEach(c=>{c.textContent='';c.className='cell';});
});
