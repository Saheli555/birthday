// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const instructionScreen = document.getElementById('instruction-screen');
const gameScreen = document.getElementById('game-screen');
const winningScreen = document.getElementById('winning-screen');
const surpriseScreen = document.getElementById('surprise-screen');

const startGameBtn = document.getElementById('start-game-btn');
const startRoundBtn = document.getElementById('start-round-btn');
const showSurpriseBtn = document.getElementById('show-surprise-btn');

const roundNumber = document.getElementById('round-number');
const resultText = document.getElementById('result-text');
const gameOptions = document.querySelectorAll('.game-option');

const backgroundMusic = document.getElementById('background-music');
const birthdayVideo = document.getElementById('birthday-video');

// Game Variables
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;

// Start Game
startGameBtn.addEventListener('click', () => {
  welcomeScreen.classList.add('hidden');
  instructionScreen.classList.remove('hidden');
  backgroundMusic.play();
});

// Start Round
startRoundBtn.addEventListener('click', () => {
  instructionScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
});

// Game Logic
gameOptions.forEach(option => {
  option.addEventListener('click', () => {
    const playerChoice = option.dataset.option;
    const computerChoice = getComputerChoice();
    const result = getRoundResult(playerChoice, computerChoice);

    resultText.innerHTML = `You chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
    updateScore(result);

    if (currentRound === 5 || playerScore === 3 || computerScore === 3) {
      endGame();
    } else {
      currentRound++;
      roundNumber.textContent = currentRound;
    }
  });
});

// Show Surprise
showSurpriseBtn.addEventListener('click', () => {
  winningScreen.classList.add('hidden');
  surpriseScreen.classList.remove('hidden');
  birthdayVideo.play();
});

// Helper Functions
function getComputerChoice() {
  const choices = ['✊', '✋', '✌️'];
  return choices[Math.floor(Math.random() * 3)];
}

function getRoundResult(player, computer) {
  if (player === computer) return "It's a tie!";
  if (
    (player === '✊' && computer === '✌️') ||
    (player === '✋' && computer === '✊') ||
    (player === '✌️' && computer === '✋')
  ) {
    playerScore++;
    return 'You win this round!';
  } else {
    computerScore++;
    return 'Computer wins this round!';
  }
}

function updateScore(result) {
  if (playerScore === 3) {
    resultText.innerHTML += '<br>🎉 You won the game! 🎉';
  } else if (computerScore === 3) {
    resultText.innerHTML += '<br>😢 Computer won the game. 😢';
  }
}

function endGame() {
  gameScreen.classList.add('hidden');
  if (playerScore === 3) {
    winningScreen.classList.remove('hidden');
  } else {
    resultText.innerHTML += '<br>Try again!';
    setTimeout(() => {
      resetGame();
      gameScreen.classList.remove('hidden');
    }, 2000);
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  currentRound = 1;
  roundNumber.textContent = currentRound;
  resultText.textContent = '';
}
