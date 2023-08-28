'use strict';

//selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//starting conditions 
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//declaring outside scope
let scores,currentScore,activePlayer,playing;

// initializing function
const init = function(){
    scores = [0,0];
    currentScore  = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};

// calling while page load
init();

//function to switch playeyr
const switchPlayer =  function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer == 0? 1:0;
     //toggle
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
};

//when we click rolldice button 
btnRoll.addEventListener('click', function(){
if(playing){
const dice = Math.trunc(Math.random() *6)+ 1;
console.log(dice);
diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;

if(dice !== 1) {
//when not equl to 1 , keep on adding current score
currentScore += dice;
//current0El.textContent = currentScore;
document.getElementById(`current--${activePlayer}`).textContent = currentScore;

} else {
//switch to player 2
switchPlayer();
}
}
});

btnHold.addEventListener("click", function() {
    if(playing) {
    console.log("button clicked");
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
if(scores[activePlayer] >= 10) {
    playing = false;
    diceEl.classList.remove('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
} else {
switchPlayer();
}
}
});

// resetting game state
btnNew.addEventListener('click',init);