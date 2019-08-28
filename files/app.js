/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////
var scores, roundScores, activePlayers, dice, gamePlaying;
init();





document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        //2. Display the result
        var diceDome = document.querySelector('.dice');
        console.log(diceDome);
        diceDome.style.display = 'block';


        diceDome.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled number was NOT a 1 
        if (dice !== 1) {
            //Add score
            roundScores += dice;
            document.querySelector('#current-' + activePlayers).textContent = roundScores;

        } else {
            nextPlayer();
        }

    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayers] += roundScores;
        //Update the UI
        document.querySelector('#score-' + activePlayers).textContent = scores[activePlayers];
        //Check if the player has won the game
        if (scores[activePlayers] >= 100) {
            document.querySelector('#name-' + activePlayers).textContent = 'Winner';
            document.querySelector('.dice'), style.display = 'none';
            document.querySelector('.player-' + activePlayers + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayers + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }

    }
});

function nextPlayer() {
    //Next Player
    activePlayers === 0 ? activePlayers = 1 : activePlayers = 0; //ternary operator
    roundScores = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0]; //score array to store scores of both the players
    roundScores = 0;
    activePlayers = 0;
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
//document.querySelector('#current-' + activePlayers).innerHTML = '<em>' + dice + '</em>';
//dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);
//document.querySelector('#current-'+activePlayers).textContent = dice;