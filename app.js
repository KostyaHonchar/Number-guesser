/* 
GAME FUNCTIONS ****************
- Player must guess a number between a minimum and maximum
- Player gets a certain amount of guesses
- Notify player of guesses remaining in the game
- Notify the player of the correct answer if loose
- Let player choose to play again if loose
*/

// Game variables
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;
// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, "red");
  }

  // check if u won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, You Win!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(false,`Game over, you lost. The correct number was ${winningNum}.`);
    } else {
      guessInput.value = "";
      guessInput.style.borderColor = "red";
      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left.`,
        "red"
      );
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
