import { CHOCOLATES } from "../constants/chocolates";
import { COLS, ROWS } from "../constants/levels";
import { findMatches } from "./matching";

const rand = () => Math.floor(Math.random() * CHOCOLATES.length);

export function createBoard() {
  const b = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      let t;
      do { t = rand(); } while (
        (c >= 2 && b[r][c - 1] === t && b[r][c - 2] === t) ||
        (r >= 2 && b[r - 1][c] === t && b[r - 2][c] === t)
      );
      b[r][c] = t;
    }
  return b;
}

export function removeFill(board, matched) {
  const nb = board.map(r => [...r]);
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (matched[r][c]) nb[r][c] = -1;

  for (let c = 0; c < COLS; c++) {
    let w = ROWS - 1;
    for (let r = ROWS - 1; r >= 0; r--)
      if (nb[r][c] >= 0) { nb[w][c] = nb[r][c]; if (w !== r) nb[r][c] = -1; w--; }
  }

  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (nb[r][c] < 0) nb[r][c] = rand();

  return nb;
}

export function hasValidMoves(board) {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (c < COLS - 1) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r][c + 1]] = [nb[r][c + 1], nb[r][c]];
        if (findMatches(nb).count > 0) return true;
      }
      if (r < ROWS - 1) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r + 1][c]] = [nb[r + 1][c], nb[r][c]];
        if (findMatches(nb).count > 0) return true;
      }
    }
  return false;
}

export function createValidBoard() {
  let b = createBoard();
  while (!hasValidMoves(b)) b = createBoard();
  return b;
}
export function shuffleBoard(board) {
  const flat = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      flat.push(board[r][c]);

  // Fisher-Yates shuffle
  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flat[i], flat[j]] = [flat[j], flat[i]];
  }

  const newBoard = [];
  for (let r = 0; r < ROWS; r++) {
    newBoard[r] = [];
    for (let c = 0; c < COLS; c++) {
      newBoard[r][c] = flat[r * COLS + c];
    }
  }
  return newBoard;
}

export function removeType(board, type) {
  const matched = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  let count = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (board[r][c] === type) { matched[r][c] = true; count++; }
  return { matched, count };
}