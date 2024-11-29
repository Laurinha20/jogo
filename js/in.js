let jogadorAtual = 'Rigby'; // O jogador X começa
let jogoAtivo = true;
let numJogadas = 0;
let tabuleiro = ["", "", "", "", "", "", "", "", ""]; 
let jogarContraPC = false; 

// Função que captura a escolha de "Jogar contra a máquina"
const atualizarEscolhaJogo = () => {
  const radios = document.getElementsByName('jogarContraPC');
  for (let radio of radios) {
    if (radio.checked) {
      jogarContraPC = (radio.value === 'sim');
      break;
    }
  }
};

// Função para iniciar a jogada
const jogar = (id) => {
  if (!jogoAtivo) return; 
  const index = parseInt(id.replace("c", "")) - 1;

  // Se a célula já tiver valor (X ou O), não faz nada
  if (tabuleiro[index] !== "") return;

  // Preenche a célula com a imagem do jogador atual
  tabuleiro[index] = jogadorAtual;
  document.getElementById(id).src = `/img/${jogadorAtual}.png`;

  numJogadas++;

  // Verifica se há um vencedor
  if (verificarVitoria()) {
    document.getElementById("resultado").textContent = `Jogador ${jogadorAtual} venceu!`;
    jogoAtivo = false;
    return;
  }

  // Verifica se houve empate
  if (numJogadas === 9) {
    document.getElementById("resultado").textContent = "Deu velha!";
    jogoAtivo = false;
    return;
  }

  // Alterna entre os jogadores
  jogadorAtual = (jogadorAtual === 'Rigby') ? 'Mordecai' : 'Rigby';

  // Verifica se é o turno do computador
  if (jogarContraPC && jogadorAtual === 'Mordecai') {
    jogarContraPCFunc();
  }
};

// Função para verificar se há vitória
const verificarVitoria = () => {
  const combinacoes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ];

  for (let combo of combinacoes) {
    const [a, b, c] = combo;
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      return true;
    }
  }

  return false;
};

// Função para jogar contra o computador
const jogarContraPCFunc = () => {
  let jogadaPC = Math.floor(Math.random() * 9);
  while (tabuleiro[jogadaPC] !== "") {
    jogadaPC = Math.floor(Math.random() * 9);
  }

  tabuleiro[jogadaPC] = 'Mordecai';
  document.getElementById(`c${jogadaPC + 1}`).src = "/img/Mordecai.png";
  numJogadas++;

  if (verificarVitoria()) {
    document.getElementById("resultado").textContent = "O Mordecai venceu!";
    jogoAtivo = false;
  } else if (numJogadas === 9) {
    document.getElementById("resultado").textContent = "Deu velha!";
    jogoAtivo = false;
  } else {
    jogadorAtual = 'Rigby';
  }
};

// Função para reiniciar o jogo
const reiniciarJogo = () => {
  jogadorAtual = 'Rigby';
  jogoAtivo = true;
  numJogadas = 0;
  tabuleiro = ["", "", "", "", "", "", "", "", ""];

  for (let i = 1; i <= 9; i++) {
    document.getElementById(`c${i}`).src = "/img/transp.png";
  }

  document.getElementById("resultado").textContent = "";

  // Atualiza a escolha do jogo (se é contra a máquina ou não)
  atualizarEscolhaJogo();
};