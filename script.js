const board = document.getElementById("board");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
const squares = document.querySelectorAll(".square");

let currentPlayer = "X";
let boardValues = ["", "", "", "", "", "", "", "", ""];

function checkWin() {
  if (
    (boardValues[0] !== "" && boardValues[0] === boardValues[1] && boardValues[1] === boardValues[2]) ||
    (boardValues[3] !== "" && boardValues[3] === boardValues[4] && boardValues[4] === boardValues[5]) ||
    (boardValues[6] !== "" && boardValues[6] === boardValues[7] && boardValues[7] === boardValues[8]) ||
    (boardValues[0] !== "" && boardValues[0] === boardValues[3] && boardValues[3] === boardValues[6]) ||
    (boardValues[1] !== "" && boardValues[1] === boardValues[4] && boardValues[4] === boardValues[7]) ||
    (boardValues[2] !== "" && boardValues[2] === boardValues[5] && boardValues[5] === boardValues[8]) ||
    (boardValues[0] !== "" && boardValues[0] === boardValues[4] && boardValues[4] === boardValues[8]) ||
    (boardValues[2] !== "" && boardValues[2] === boardValues[4] && boardValues[4] === boardValues[6])
  ) {
    message.textContent = `Player ${currentPlayer} won!`;
    resetButton.classList.remove("hidden");
  } else if (!boardValues.includes("")) {
    message.textContent = "It's a tie!";
    resetButton.classList.remove("hidden");
  }
}

function resetGame() {
  currentPlayer = "X";
  boardValues = ["", "", "", "", "", "", "", "", ""];
  message.textContent = "";
  resetButton.classList.add("hidden");
  squares.forEach((square) => {
    square.textContent = "";
    square.removeEventListener("click", handleClick);
    square.addEventListener("click", handleClick, { once: true });
    square.classList.remove("highlight");
  });
}

function handleClick(event) {
  const square = event.target;
  const index = square.dataset.index;
  boardValues[index] = currentPlayer;
  square.textContent = currentPlayer;
  square.removeEventListener("click", handleClick);
  if (checkWin()) {
    squares.forEach((square) => square.removeEventListener("click", handleClick));
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

resetButton.addEventListener("click", resetGame);

squares.forEach((square) => {
  square.addEventListener("click", handleClick, { once: true });
});
