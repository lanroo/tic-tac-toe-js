// Dados iniciais
let square = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
};
let player= '';
let warning = '';
let playing = false;

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
});

// Funções
function itemClick(event) {
  let item = event.target.getAttribute('data-item');
  if (playing && square[item] === '') {
      square[item] = player;
      renderSquare();
      togglePlayer();
  }
}

function reset() {
  warning = '';

  let random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'x' : 'o';

  for (const i in square) {
     square[i] = '';
  }
  playing = true;

  document.querySelector('.player1 img').setAttribute('src', './imagens/smile.png');
  document.querySelector('.player2 img').setAttribute('src', './imagens/smile.png');
  renderSquare();
  renderInfo();
  removeanimationW();
}

function renderSquare() {
  for(let i in square){
      let item = document.querySelector(`div[data-item=${i}]`);
      item.innerHTML  = square[i];
  }

  checkGame();
}

function renderInfo() {
  document.querySelector('.vez').innerHTML = player;
  document.querySelector('.resultado').innerHTML = warning;
  
  if (player === 'x') {
      document.querySelector('.player2 img').setAttribute('src', './imagens/waiting.png');
      document.querySelector('.player1 img').setAttribute('src', './imagens/smile.png');
      checkGame();
  }
  if(player === 'o'){
      document.querySelector('.player1 img').setAttribute('src', './imagens/waiting.png');
      document.querySelector('.player2 img').setAttribute('src', './imagens/smile.png');
      checkGame();
  }
}

function togglePlayer() {
  player = (player === 'x') ? 'o' : 'x';
  renderInfo();
}

function checkGame() {
  if (checkWinnerFor('x')) {
      warning = 'Player 1 venceu!';
      playing = false;
      document.querySelector('.player1 img').setAttribute('src', './imagens/won.png');
      document.querySelector('.player2 img').setAttribute('src', './imagens/lost.png');
      animationWin()
  }else if (checkWinnerFor('o')) {
      warning = 'Player 2 venceu!';
      playing = false; 
      document.querySelector('.player1 img').setAttribute('src', './imagens/lost.png');
      document.querySelector('.player2 img').setAttribute('src', './imagens/won.png');
      animationWin();
  }else if (isFull()) {
      warning = 'EMPATOU!';
      playing = false;
      document.querySelector('.player1 img').setAttribute('src', './imagens/smile.png');
      document.querySelector('.player2 img').setAttribute('src', './imagens/smile.png');
      animationWin()
  }
}

function checkWinnerFor(player) {
  let pos = [
      'a1,a2,a3',
      'b1,b2,b3',
      'c1,c2,c3',

      'a1,b1,c1',
      'a2,b2,c2',
      'a3,b3,c3',

      'a1,b2,c3',
      'c1,b2,a3',
  ]; 

  for (let w in pos){
      let pArray = pos[w].split(',');
      let hasWon = pArray.every(option => square[option] === player);
      if (hasWon) {
          return true;
      }
  }

  return false;
}

function isFull() {
  for (const i in square) {
      if(square[i] === ''){
          return false;
      }
  }

  return true;
}

function animationWin() {
  document.querySelector('.player1 img').style.animationDuration = '3s';
  document.querySelector('.player1 img').style.animationName = 'slideinS';
  document.querySelector('.player1 img').style.animationIterationCount = 'infinite';
  document.querySelector('.player1 img').style.animationDirection = 'alternate';

  document.querySelector('.player2 img').style.animationDuration = '3s';
  document.querySelector('.player2 img').style.animationName = 'slideinS';
  document.querySelector('.player2 img').style.animationIterationCount = 'infinite';
  document.querySelector('.player2 img').style.animationDirection = 'alternate';


}

function removeanimationW() {
    document.querySelector('.player1 img').style.animationDuration = 'none';
    document.querySelector('.player1 img').style.animationName = 'none';
    document.querySelector('.player1 img').style.animationIterationCount = 'none';
    document.querySelector('.player1 img').style.animationDirection = 'none';

    document.querySelector('.player2 img').style.animationDuration = 'none';
    document.querySelector('.player2 img').style.animationName = 'none';
    document.querySelector('.player2 img').style.animationIterationCount = 'none';
    document.querySelector('.player2 img').style.animationDirection = 'none';
}