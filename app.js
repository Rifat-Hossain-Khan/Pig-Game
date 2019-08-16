/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, previousDice, winningScore;

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // let dice = 6;

    // 2. Display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1

    if (dice !== 1) {
      if (dice === 6 && previousDice === dice) {
        roundScore = 0;
        scores[activePlayer] = 0;
        document.querySelector(
          '#current-' + activePlayer
        ).textContent = roundScore;
        document.querySelector('#score-' + activePlayer).textContent =
          scores[activePlayer];
        nextPlayer();
      } else {
        //Add score
        // console.log(activePlayer);
        // console.log(dice, previousDice);

        previousDice = dice;
        roundScore += dice;
        document.querySelector(
          '#current-' + activePlayer
        ).textContent = roundScore;
      }
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    //Add current score to GLOBAL Score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

const nextPlayer = _ => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
  previousDice = 0;
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  previousDice = 0;
  gamePlaying = true;
  winningScore = prompt('Set the winning score!');
  // console.log(winningScore);

  // document.querySelector('#current-' + activePlayer).textContent = dice;

  // let x = document.querySelector('#score-0').textContent;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
