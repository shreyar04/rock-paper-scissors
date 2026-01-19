let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset");

const winSound = new Audio("click.mp3");
const drawSound = new Audio("draw.mp3");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const clearAnimation = () => {
  choices.forEach(choice => choice.classList.remove("win"));
};

const drawGame = () => {
  clearAnimation(); // ✅ remove previous glow
  drawSound.play();
  msg.innerText = "Game Draw! Play again";
  msg.style.backgroundColor = "#081b31";
};


const showWinner = (userWin, userChoice, compChoice) => {
  clearAnimation();

  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    winSound.play();
    document.getElementById(userChoice).classList.add("win");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You Lost! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
    document.getElementById(compChoice).classList.add("win");
  }
};

const playGame = (userChoice) => {
  clearAnimation(); // ✅ ALWAYS clear previous highlight

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      userWin = compChoice !== "paper";
    } else if (userChoice === "paper") {
      userWin = compChoice !== "scissors";
    } else {
      userWin = compChoice !== "rock";
    }

    showWinner(userWin, userChoice, compChoice);
  }
};


choices.forEach(choice => {
  choice.addEventListener("click", () => {
    playGame(choice.id);
  });
});

/* Reset Game */
resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  clearAnimation();
});
