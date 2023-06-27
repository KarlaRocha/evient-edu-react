const ROWS = 3,
  COLUMNS = 3;

function createCellMatrix(cells) {
  let matrix = new Array(ROWS).fill(
    new Array(COLUMNS).fill({ id: -1, symbol: '', row: -1, column: -1 })
  );
  return cells.reduce((matrix, cell) => {
    let row = [...matrix[cell.row]];
    row.splice(cell.column, 1, cell);
    matrix.splice(cell.row, 1, row);
    return matrix;
  }, matrix);
}

function transposeMatrix(matrix) {
  let transpose = [];
  for (let i = 0; i < ROWS; i++) {
    let auxTranspose = [];
    for (let j = 0; j < COLUMNS; j++) {
      auxTranspose.push(matrix[j][i]);
    }
    transpose.push(auxTranspose);
  }
  return transpose;
}

function getRowWinners(matrix, symbol) {
  return matrix.reduce((winners, row) => {
    const allAreXs = row.every((r) => r.symbol === symbol);
    if (allAreXs) winners++;
    return winners;
  }, 0);
}

export function checkRowsForWinner(matrix, symbol) {
  const rowWinners = getRowWinners(matrix, symbol);
  return rowWinners > 0;
}

export function checkColumnsForWinner(matrix, symbol) {
  const transpose = transposeMatrix(matrix);
  const rowWinners = getRowWinners(transpose, symbol);
  return rowWinners > 0;
}

export function checkDescDiagonalWinner(matrix, symbol) {
  let counter = 0;
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][i].symbol === symbol) counter++;
  }
  return counter === ROWS;
}

export function checkAscDiagonalWinner(matrix, symbol) {
  let counter = 0;
  for (let i = 0, j = ROWS - 1; i < matrix.length; i++, j--) {
    if (matrix[j][i].symbol === symbol) counter++;
  }
  return counter === ROWS;
}

export function checkForWinner(cells, symbol) {
  const matrix = createCellMatrix(cells);
  return (
    checkRowsForWinner(matrix, symbol) ||
    checkColumnsForWinner(matrix, symbol) ||
    checkAscDiagonalWinner(matrix, symbol) ||
    checkDescDiagonalWinner(matrix, symbol)
  );
}
