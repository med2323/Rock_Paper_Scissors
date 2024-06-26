const choices = document.querySelectorAll('.choice');
const resultText = document.getElementById('result-text');
const userScoreText = document.getElementById('user-score');
const computerScoreText = document.getElementById('computer-score');
const finalResultText = document.getElementById('final-result');
const playAgainButton = document.getElementById('play-again');

let userScore = 0;
let computerScore = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => playRound(choice.id));
});

playAgainButton.addEventListener('click', resetGame);

function playRound(playerSelection) {
    const computerSelection = getComputerChoice();
    const result = getResult(playerSelection, computerSelection);

    if (result === "You win!") {
        userScore++;
        resultText.className = 'result win';
        resultText.innerHTML = `You chose ${playerSelection}, computer chose ${computerSelection}.<br>You win! 😊`;
    } else if (result === "You lose!") {
        computerScore++;
        resultText.className = 'result lose';
        resultText.innerHTML = `You chose ${playerSelection}, computer chose ${computerSelection}.<br>You lose! 😢`;
    } else {
        resultText.className = '';
        resultText.innerHTML = `You chose ${playerSelection}, computer chose ${computerSelection}.<br>It's a tie!`;
    }

    updateScores();

    if (userScore === 5 || computerScore === 5) {
        announceWinner();
    }
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function getResult(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

function updateScores() {
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
}

function announceWinner() {
    if (userScore === 5) {
        finalResultText.innerHTML = "Congratulations! You are the overall winner! 😊";
        finalResultText.className = 'result win';
    } else {
        finalResultText.innerHTML = "Sorry! The computer is the overall winner! 😢";
        finalResultText.className = 'result lose';
    }
    finalResultText.style.opacity = 1;

    choices.forEach(choice => {
        choice.disabled = true;
    });

    playAgainButton.style.display = 'block';
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    updateScores();
    resultText.innerHTML = '';
    finalResultText.innerHTML = '';
    finalResultText.style.opacity = 0;
    playAgainButton.style.display = 'none';

    choices.forEach(choice => {
        choice.disabled = false;
    });
}
