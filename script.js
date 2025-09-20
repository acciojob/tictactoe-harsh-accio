let player1 = "";
let player2 = "";
let currentPlayer = "";
let board = Array(9).fill(null);

const setupDiv = document.getElementById("player-setup");
const gameDiv = document.getElementById("game-screen");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players!");
    return;
  }

  currentPlayer = player1;
  setupDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");
  messageDiv.textContent = `${currentPlayer}, you're up!`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = parseInt(cell.id) - 1;

  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer === player1 ? "X" : "O";
  cell.textContent = board[index];
  cell.classList.add("taken");

  if (checkWinner()) {
    messageDiv.textContent = `${currentPlayer}, congratulations you won!;
  } else if (board.every(cell => cell)) {
    messageDiv.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    messageDiv.textContent = `${currentPlayer}, you're up!`;
  }
}

function checkWinner() {
  const winningCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Highlight winning cells
      cells[a].style.backgroundColor = "violet";
      cells[b].style.backgroundColor = "violet";
      cells[c].style.backgroundColor = "violet";
      return true;
    }
  }

  return false;
}
