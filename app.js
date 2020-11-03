var turns = 0;

const [X, E, O] = [1, 0, -1];

var board = [
  [E, E, E],
  [E, E, E],
  [E, E, E],
];

function sum(array) {
  var res = 0;
  for (var i = 0; i < array.length; i++) {
    res += array[i];
  }
  return res;
};

checkRows = () => {
  var rowSums = board.map(row => sum(row));
  return rowSums.includes(3)
  ? 'X'
  : rowSums.includes(-3)
  ? 'O'
  : null;
};

checkColumns = () => {
  var colSums = [0, 0, 0];
  for (var col = 0; col < 3; col++) {
    for (var row = 0; row < 3; row++) {
      colSums[col] += board[row][col];
    }
  }
  return colSums.includes(3)
  ? 'X'
  : colSums.includes(-3)
  ? 'O'
  : null;
};

checkDiagonals = () => {
  // major diagonals go from the top left to the bottom right,
  // whereas minor diagonals go from the top right to the bottom left.
  var majorDiagonalSum = board[0][0] + board[1][1] + board[2][2];
  var minorDiagnonalSum = board[0][2] + board[1][1] + board[2][0];
  return (majorDiagonalSum === 3 || minorDiagnonalSum === 3)
  ? 'X'
  : (majorDiagonalSum === -3 || minorDiagnonalSum === -3)
  ? 'O'
  : null;
};

checkBoard = () => {
  var winner = (checkRows() || checkColumns() || checkDiagonals());
  if (winner) {
    return winner;
  } else if (turns === 9) {
    return 'Nobody';
  }
};

updateBoard = (cell_id, nextMove) => {
  var [row, col] = [Number(cell_id[0]), Number(cell_id[1])];
  board[row][col] = nextMove;
};

move = (event) => {
  if (turns % 2 === 0) {
    var nextMove = X;
    var cellBackground = "background: blue";
  } else {
    var nextMove = O;
    var cellBackground = "background: red"
  }
  event.target.innerText = (nextMove === X) ? 'X' : 'O';
  event.target.setAttribute("style", cellBackground);
  ++turns;
  updateBoard(event.target.id, nextMove);
  var winner = checkBoard();
  if (winner) {
    document.getElementById("game-msg").innerText = `${winner} wins!`;
  }
}

// add event listeners to each cell
// each event listener writes X or O to the cell
var rows = document.getElementsByClassName("game_row");
for (var i = 0; i < rows.length; i++) {
  var cells = rows[i].children;
  for (var j = 0; j < cells.length; j++) {
    cells[j].addEventListener("click", (event) => {
      move(event)
    });
  }
}

resetGame = () => {
  board = [
    [E, E, E],
    [E, E, E],
    [E, E, E],
  ];
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].children;
    for (var j = 0; j < cells.length; j++) {
      cells[j].innerText = " ";
      cells[j].setAttribute("style", "background: white")
    }
  }
  document.getElementById("game-msg").innerText = `Play Tic-Tac-Toe!`;
  turns = 0;
};

// add event listener to reset-btn
var resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetGame);