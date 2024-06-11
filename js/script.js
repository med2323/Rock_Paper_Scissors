const choices = document.querySelectorAll('.choice');
const resultText = document.getElementById('result-text');
const roundText = document.getElementById('round');
const userScoreText = document.getElementById('user-score');
const computerScoreText = document.getElementById('computer-score');
const finalResultText = document.getElementById('final-result');
const resetButton = document.getElementById('reset');

let userScore = 0;
let computerScore = 0;
let round = 1;

choices.forEach(choice => {
    choice.addEventListener('click', playGame);
});

resetButton.addEventListener('click', resetGame);

function playGame(event) {
    if (round > 5) return;

    const userChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const result = getResult(userChoice, computerChoice);

    // Clear previous result class
    resultText.className = '';

    resultText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;
    
    if (result === "You win!") {
        userScore++;
        resultText.classList.add('result', 'win');
    } else if (result === "You lose!") {
        computerScore++;
        resultText.classList.add('result', 'lose');
    } else {
        resultText.classList.add('result', 'tie');
    }
    
    updateScores();
    round++;
    
    if (round > 5) {
        determineOverallWinner();
    }
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "You win!";
    } else {
        return "You lose!";
    }
}

function updateScores() {
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
    roundText.textContent = round;
}

function determineOverallWinner() {
    if (userScore > computerScore) {
        finalResultText.textContent = "Congratulations! You are the overall winner!";
        finalResultText.classList.add('success');
    } else if (userScore < computerScore) {
        finalResultText.textContent = "Sorry! The computer is the overall winner!";
        finalResultText.classList.add('failure');
    } else {
        finalResultText.textContent = "It's a tie overall!";
        finalResultText.classList.add('tie');
    }
    finalResultText.style.opacity = 1; 
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    round = 1;
    resultText.textContent = '';
    resultText.className = '';
    finalResultText.textContent = '';
    finalResultText.className = '';
    finalResultText.style.opacity = 0;
    updateScores();
}
