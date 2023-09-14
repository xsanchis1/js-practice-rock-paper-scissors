
let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
    score = {
        wins: 0,
        ties: 0,
        losses:0
    }
  
};

updateScoreElement();

function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';
    
    if (randomNumber < 1/3 ) {
        computerMove = 'rock';
    }
    else if (randomNumber > 1/3 && randomNumber<2/3 ) {
        computerMove = 'paper';
    }
    else if (randomNumber > 2/3) {
        computerMove = 'scissors'; 
    }

    return computerMove;
}

document.querySelector('.js-rock-button').addEventListener('click', function () {
playGame('rock');
}); 

document.querySelector('.js-paper-button').addEventListener('click', function () {
playGame('paper');
}); 

document.querySelector('.js-scissors-button').addEventListener('click', function () {
playGame('scissors');
});

document.querySelector('.js-auto-play').addEventListener('click', function () {
autoPlay();
});

document.body.addEventListener('keydown', function (event) {
if (event.key === 'r') {
    playGame('rock');
}
else if (event.key === 'p') {
    playGame('paper');
}
else if (event.key === 's') {
    playGame('scissors');
}

});

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock'){

        if (computerMove === 'rock') {
            result = 'Tie'
        }
        else if (computerMove === 'paper') {
            result = 'You Lose'
        }
        else  {
            result = 'You Win.'
        }
    }


    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You Win.';
        }
        else if (computerMove === 'paper') {
            result = 'Tie';
        }
        else  {
            result = 'You Lose';
        }
    }


    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You Lose'
        }
        else if (computerMove === 'paper') {
            result = 'You Win.'
        }
        else  {
            result = 'Tie'
        }
    }

    if (result === 'You Win.') {
        score.wins += 1;
    }
    else if (result === 'Tie') {
        score.ties += 1;
    }
    else if (result === 'You Lose') {
        score.losses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('p.js-result').innerHTML = `${result}`;
    document.querySelector('p.js-moves').innerHTML = `You 
    <img class="img-choice" src="/RPS images/${playerMove}-emoji.png" alt=""></button> - 
    <img class="img-choice" src="/RPS images/${computerMove}-emoji.png" alt=""></button>
    Computer`;

    updateScoreElement();

}

function updateScoreElement() {
    document.querySelector('p.js-score').innerHTML = `Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    const playerMove = pickComputerMove();
    playGame(playerMove);

    if (!isAutoPlaying) {
        intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        } , 1000);
        isAutoPlaying = true;

        document.querySelector('.js-auto-play').innerHTML = 'Reset';
    }

    else{
        clearInterval(intervalId);
        isAutoPlaying = false;

        document.querySelector('.js-auto-play').innerHTML = 'Auto Play'

    }    
}
