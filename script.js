// Получаем элементы DOM
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
const playerNamesModal = document.getElementById("playerNamesModal");
const resultModal = document.getElementById("resultModal");
const startGameButton = document.getElementById("startGame");
const playAgainButton = document.getElementById("playAgain");
const playerXInput = document.getElementById("playerX");
const playerOInput = document.getElementById("playerO");
const resultMessage = document.getElementById("resultMessage");
const playerXInfo = document.getElementById("playerXInfo");
const playerOInfo = document.getElementById("playerOInfo");

// Игровые переменные
let currentPlayer = "X";
let gameState = Array(9).fill("");
let playerXName = "";
let playerOName = "";
let playerXScore = 0; // Счет игрока X
let playerOScore = 0; // Счет игрока O

// Выигрышные комбинации
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // строки
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // столбцы
  [0, 4, 8],
  [2, 4, 6], // диагонали
];

// Показываем модальное окно для ввода имен при загрузке страницы
window.onload = () => (playerNamesModal.style.display = "flex");

// Начинаем игру после ввода имен
startGameButton.addEventListener("click", startGame);

// Обработка клика по ячейке
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// Сброс игры
resetButton.addEventListener("click", resetGame);

// Кнопка "Играть снова" в попапе
playAgainButton.addEventListener("click", playAgain);

// Функция для начала игры
function startGame() {
  playerXName = playerXInput.value || "Игрок X";
  playerOName = playerOInput.value || "Игрок O";
  playerNamesModal.style.display = "none";
  updatePlayersInfo(); // Обновляем информацию об игроках
}

// Функция для обработки клика по ячейке
function handleCellClick(event) {
  const index = event.target.getAttribute("data-index");

  if (gameState[index] || checkWin()) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    const winner = currentPlayer === "X" ? playerXName : playerOName;
    highlightWinningCells(); // Подсвечиваем выигрышную комбинацию
    updateScore(); // Обновляем счет
    showResult(`${winner} победил!`);
  } else if (isDraw()) {
    showResult("Ничья!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updatePlayersInfo(); // Обновляем информацию об игроках при смене хода
  }
}

// Функция для обновления информации об игроках
function updatePlayersInfo() {
  playerXInfo.textContent = `${playerXName} (X): ${playerXScore}`; // Имя и счет игрока X
  playerOInfo.textContent = `${playerOName} (O): ${playerOScore}`; // Имя и счет игрока O

  // Подсветка текущего игрока
  playerXInfo.classList.toggle("current-turn", currentPlayer === "X");
  playerOInfo.classList.toggle("current-turn", currentPlayer === "O");
}

function updateScore() {
  if (currentPlayer === "X") {
    playerXScore++; // Увеличиваем счет игрока X
  } else {
    playerOScore++; // Увеличиваем счет игрока O
  }
  updatePlayersInfo(); // Обновляем отображение счета
}

// Функция для подсветки выигрышной комбинации
function highlightWinningCells() {
  // Сначала убираем классы анимации, если они есть
  cells.forEach((cell) => cell.classList.remove("win"));

  // Добавляем небольшой таймаут, чтобы анимация сработала
  setTimeout(() => {
    winningConditions.forEach((condition) => {
      if (condition.every((index) => gameState[index] === currentPlayer)) {
        condition.forEach((index) => cells[index].classList.add("win"));
      }
    });
  }, 10); // 10 мс достаточно для сброса предыдущих анимаций
}

// Функция для проверки победы
function checkWin() {
  return winningConditions.some((condition) =>
    condition.every((index) => gameState[index] === currentPlayer)
  );
}

// Функция для проверки ничьей
function isDraw() {
  return !gameState.includes("") && !checkWin();
}

// Функция для отображения результата
function showResult(message) {
  resultMessage.textContent = message;
  resultModal.style.display = "flex";
}

// Функция для сброса игры
function resetGame() {
  gameState = Array(9).fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win", "draw");
  });
  currentPlayer = "X";
  updatePlayersInfo(); // Обновляем информацию об игроках
}

// Функция для игры снова
function playAgain() {
  resultModal.style.display = "none";
  resetGame();
}
