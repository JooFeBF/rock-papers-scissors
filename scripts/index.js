const singlePlayerButton = document.getElementById('single-player');
const multiPlayerButton = document.getElementById('multiplayer');

const gameSelector = document.getElementsByClassName('game-selector').item(0);

const GAME_OPTIONS = {
  SINGLE_PLAYER: 'single-player',
  MULTIPLAYER: 'multiplayer',
};

const WEAPONS = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
};

const PLAYER_WINS = {
  PLAYER_1: -1,
  PLAYER_2: 1,
  TIE: 0
}

let gameMode = GAME_OPTIONS.SINGLE_PLAYER;

const turnsSelectionForm = document.getElementsByClassName('turns-selection').item(0);
const gameBoard = document.getElementsByClassName('game').item(0);

singlePlayerButton.addEventListener('click', () => {
  gameMode = GAME_OPTIONS.SINGLE_PLAYER;
  gameSelector.style.display = 'none';
  turnsSelectionForm.style.display = 'flex';
});

multiPlayerButton.addEventListener('click', () => {
  gameMode = GAME_OPTIONS.MULTIPLAYER;
  gameSelector.style.display = 'none';
  turnsSelectionForm.style.display = 'flex';
})

const increaseTurnsButton = document.getElementById('increase-turns');
const decreaseTurnsButton = document.getElementById('decrease-turns');
const turnsInput = document.getElementById('turns-input');

let turns = 1;

increaseTurnsButton.addEventListener('click', (e) => {
  e.preventDefault();
  turns++;
  turnsInput.value = turns;
})

decreaseTurnsButton.addEventListener('click', (e) => {
  e.preventDefault();
  turns = Math.max(1, turns - 1);
  turnsInput.value = turns;
})

turnsSelectionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const turns = turnsInput.value;
  turnsSelectionForm.style.display = 'none';
  gameBoard.style.display = 'flex';
  turnsDisplay.innerText = turns;
})

let playerTurn = 1;

const weaponSection = document.getElementsByClassName('game__weapon-selection').item(0);
const weaponSelection = document.getElementsByClassName('game__weapons').item(0);

let player1Weapon = WEAPONS.ROCK;
let player2Weapon = WEAPONS.ROCK;

weaponSelection.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('game__weapon')) {
    if (gameMode === GAME_OPTIONS.SINGLE_PLAYER) {
      player1Weapon = target.id;
    } else {
      if (playerTurn === 1) {
        player1Weapon = target.id;
      } else {
        player2Weapon = target.id;
      }
    }
  }
})

const weaponSelectButton = document.getElementsByClassName('game__go').item(0);

const getWinner = (player1Weapon, player2Weapon) => {
  if (player1Weapon === player2Weapon) {
    return PLAYER_WINS.TIE;
  } else {
    if (player1Weapon === WEAPONS.ROCK) {
      if (player2Weapon === WEAPONS.PAPER) {
        return PLAYER_WINS.PLAYER_2;
      } else {
        return PLAYER_WINS.PLAYER_1;
      }
    } else if (player1Weapon === WEAPONS.PAPER) {
      if (player2Weapon === WEAPONS.SCISSORS) {
        return PLAYER_WINS.PLAYER_2;
      } else {
        return PLAYER_WINS.PLAYER_1;
      }
    } else {
      if (player2Weapon === WEAPONS.ROCK) {
        return PLAYER_WINS.PLAYER_2;
      } else {
        return PLAYER_WINS.PLAYER_1;
      }
    }
  }
}

const gameAnimationSection = document.getElementsByClassName('game-animation').item(0);

const animationRockLeft = document.getElementById('animation-rock-left');
const animationPaperLeft = document.getElementById('animation-paper-left');
const animationScissorsLeft = document.getElementById('animation-scissors-left');
const animationRockRight = document.getElementById('animation-rock-right');
const animationPaperRight = document.getElementById('animation-paper-right');
const animationScissorsRight = document.getElementById('animation-scissors-right');

const getLeftAnimation = (weapon) => {
  if (weapon === WEAPONS.ROCK) {
    return animationRockLeft;
  } else if (weapon === WEAPONS.PAPER) {
    return animationPaperLeft;
  } else {
    return animationScissorsLeft;
  }
}
const getRightAnimation = (weapon) => {
  if (weapon === WEAPONS.ROCK) {
    return animationRockRight;
  } else if (weapon === WEAPONS.PAPER) {
    return animationPaperRight;
  } else {
    return animationScissorsRight;
  }

}

const turnsDisplay = document.getElementById('turns');
const scorePlayer1 = document.getElementById('score-1');
const scorePlayer2 = document.getElementById('score-2');
const playerNumber = document.getElementById('player-number');

weaponSelectButton.addEventListener('click', (e) => {
  e.target.disabled = true;
  if (gameMode === GAME_OPTIONS.SINGLE_PLAYER) {
    player2Weapon = WEAPONS[Object.keys(WEAPONS)[Math.floor(Math.random() * 3)]];
    const result = getWinner(player1Weapon, player2Weapon);
    weaponSection.style.animation = 'fadeOut 1s';
    setTimeout(() => {
      weaponSection.style.display = 'none';
      gameAnimationSection.style.display = 'flex';
      setTimeout(() => {
        animationRockLeft.style.display = 'none';
        animationRockRight.style.display = 'none';
        const leftAnimation = getLeftAnimation(player1Weapon);
        const rightAnimation = getRightAnimation(player2Weapon);
        if (result === PLAYER_WINS.PLAYER_1) {
          leftAnimation.style.display = 'block';
          leftAnimation.style.animation = 'winLeft 1s';
          rightAnimation.style.display = 'block';
          rightAnimation.style.animation = 'loseFadeOutRight 1s';  
        } else if (result === PLAYER_WINS.PLAYER_2) {
          leftAnimation.style.display = 'block';
          leftAnimation.style.animation = 'loseFadeOutLeft 1s';
          rightAnimation.style.display = 'block';
          rightAnimation.style.animation = 'winRight 1s';  
        } else {
          leftAnimation.style.display = 'block';
          leftAnimation.style.animation = 'tieLeft 1s';
          rightAnimation.style.display = 'block';
          rightAnimation.style.animation = 'tieRight 1s';  
        }
        setTimeout(() => {
          scorePlayer1.innerText = result === PLAYER_WINS.PLAYER_1 ? parseInt(scorePlayer1.innerText) + 1 : scorePlayer1.innerText;
          scorePlayer2.innerText = result === PLAYER_WINS.PLAYER_2 ? parseInt(scorePlayer2.innerText) + 1 : scorePlayer2.innerText;
          if(scorePlayer1.innerText === turnsDisplay.innerText || scorePlayer2.innerText === turnsDisplay.innerText) {
            if(scorePlayer1.innerText === turnsDisplay.innerText) {
              alert('Player 1 wins!');
            }
            else {
              alert('Player 2 wins!');
            }
            scorePlayer1.innerText = 0;
            scorePlayer2.innerText = 0;
          }
          gameAnimationSection.style.display = 'none';
          weaponSection.style.display = 'flex';
          weaponSection.style.animationDelay = '1s';
          weaponSection.style.animation = 'fadeIn 1s';
          leftAnimation.style.display = 'none';
          leftAnimation.style.animation = '';
          rightAnimation.style.display = 'none';
          rightAnimation.style.animation = '';
          animationRockLeft.style.display = 'block';
          animationRockRight.style.display = 'block';
          if(parseInt(scorePlayer1.innerText) > parseInt(scorePlayer2.innerText)) {
            scorePlayer1.style.color = 'green';
            scorePlayer2.style.color = 'red';
          } else if(parseInt(scorePlayer1.innerText) < parseInt(scorePlayer2.innerText)) {
            scorePlayer2.style.color = 'green';
            scorePlayer1.style.color = 'red';
          } else {
            scorePlayer1.style.color = 'white';
            scorePlayer2.style.color = 'white';
          }
          e.target.disabled = false;
        }, 1000)
      }, 1000)
    }, 1000);
  } else {
    if (playerTurn === 1) {
      playerTurn = 2;
      playerNumber.innerText = '2';
      weaponSection.style.animation = 'fadeOut 1s';
      e.target.disabled = false;
    } else {
      playerTurn = 1;
      playerNumber.innerText = '1';
      const result = getWinner(player1Weapon, player2Weapon);
      weaponSection.style.animation = 'fadeOut 1s';
      setTimeout(() => {
      weaponSection.style.display = 'none';
      gameAnimationSection.style.display = 'flex';
      setTimeout(() => {
        animationRockLeft.style.display = 'none';
        animationRockRight.style.display = 'none';
        const leftAnimation = getLeftAnimation(player1Weapon);
        const rightAnimation = getRightAnimation(player2Weapon);
        if (result === PLAYER_WINS.PLAYER_1) {
          leftAnimation.style.display = 'block';
          leftAnimation.style.animation = 'winLeft 1s';
          rightAnimation.style.display = 'block';
          rightAnimation.style.animation = 'loseFadeOutRight 1s';  
        } else if (result === PLAYER_WINS.PLAYER_2) {
          leftAnimation.style.display = 'block';
          leftAnimation.style.animation = 'loseFadeOutLeft 1s';
          rightAnimation.style.display = 'block';
          rightAnimation.style.animation = 'winRight 1s';  
        } else {
          leftAnimation.style.display = 'block';
          leftAnimation.style.animation = 'tieLeft 1s';
          rightAnimation.style.display = 'block';
          rightAnimation.style.animation = 'tieRight 1s';  
        }
        setTimeout(() => {
          scorePlayer1.innerText = result === PLAYER_WINS.PLAYER_1 ? parseInt(scorePlayer1.innerText) + 1 : scorePlayer1.innerText;
          scorePlayer2.innerText = result === PLAYER_WINS.PLAYER_2 ? parseInt(scorePlayer2.innerText) + 1 : scorePlayer2.innerText;
          if(scorePlayer1.innerText === turnsDisplay.innerText || scorePlayer2.innerText === turnsDisplay.innerText) {
            if(scorePlayer1.innerText === turnsDisplay.innerText) {
              alert('Player 1 wins!');
            }
            else {
              alert('Player 2 wins!');
            }
            scorePlayer1.innerText = 0;
            scorePlayer2.innerText = 0;
          }
          gameAnimationSection.style.display = 'none';
          weaponSection.style.display = 'flex';
          weaponSection.style.animationDelay = '1s';
          weaponSection.style.animation = 'fadeIn 1s';
          leftAnimation.style.display = 'none';
          leftAnimation.style.animation = '';
          rightAnimation.style.display = 'none';
          rightAnimation.style.animation = '';
          animationRockLeft.style.display = 'block';
          animationRockRight.style.display = 'block';
          if(parseInt(scorePlayer1.innerText) > parseInt(scorePlayer2.innerText)) {
            scorePlayer1.style.color = 'green';
            scorePlayer2.style.color = 'red';
          } else if(parseInt(scorePlayer1.innerText) < parseInt(scorePlayer2.innerText)) {
            scorePlayer2.style.color = 'green';
            scorePlayer1.style.color = 'red';
          } else {
            scorePlayer1.style.color = 'white';
            scorePlayer2.style.color = 'white';
          }
          e.target.disabled = false;
        }, 1000)
      }, 1000)
    }, 1000);
    }
  }
});

const restartButton = document.getElementsByClassName('game__restart-button').item(0);

restartButton.addEventListener('click', (e) => {
  scorePlayer1.innerText = 0;
  scorePlayer2.innerText = 0;
  gameBoard.style.display = 'none';
  gameAnimationSection.style.display = 'none';

  gameSelector.style.display = 'flex';
})
