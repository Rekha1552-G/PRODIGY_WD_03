let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let aiMode = false;

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const winLine = document.getElementById("winLine");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => cell.addEventListener("click", handleClick));

function setTwoPlayer() {
  aiMode = false;
  resetGame();
  statusText.innerText = "Player X's Turn";
  gameActive = true;
}

function playAI() {
  aiMode = true;
  resetGame();
  statusText.innerText = "Player X vs AI";
  gameActive = true;
}

function handleClick() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (aiMode && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 400);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].innerText = player;

  checkWinner();
}

function checkWinner() {
  for (let condition of winConditions) {
    let a = condition[0];
    let b = condition[1];
    let c = condition[2];

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      drawWinningLine(condition);

      statusText.innerText = "Player " + currentPlayer + " Wins!";
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.innerText = "Game Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = "Player " + currentPlayer + "'s Turn";
}

function aiMove() {
  let empty = [];

  board.forEach((cell, i) => {
    if (cell === "") empty.push(i);
  });

  let randomIndex = empty[Math.floor(Math.random() * empty.length)];

  makeMove(randomIndex, "O");
}

function drawWinningLine(condition) {
  const positions = {
    "0,1,2": "top:60px;left:0;width:100%;",
    "3,4,5": "top:186px;left:0;width:100%;",
    "6,7,8": "top:312px;left:0;width:100%;",
    "0,3,6": "left:60px;top:0;height:100%;width:6px;",
    "1,4,7": "left:186px;top:0;height:100%;width:6px;",
    "2,5,8": "left:312px;top:0;height:100%;width:6px;",
    "0,4,8": "top:0;left:0;width:100%;transform:rotate(45deg);",
    "2,4,6": "top:0;left:0;width:100%;transform:rotate(-45deg);",
  };

  winLine.style.cssText =
    "position:absolute;background:#10b981;" + positions[condition];
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";

  cells.forEach((cell) => {
    cell.innerText = "";
  });

  winLine.style.width = "0";
}
