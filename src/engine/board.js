import { CHOCOLATES } from "../constants/chocolates";
import { COLS, ROWS } from "../constants/levels";
import { findMatches } from "./matching";

const rand = () => Math.floor(Math.random() * CHOCOLATES.length);

export function createBoard(mask) {
  const b = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (mask && !mask[r][c]) { b[r][c] = -2; continue; }
      let t;
      do { t = rand(); } while (
        (c >= 2 && b[r][c - 1] >= 0 && b[r][c - 1] === t && b[r][c - 2] >= 0 && b[r][c - 2] === t) ||
        (r >= 2 && b[r - 1][c] >= 0 && b[r - 1][c] === t && b[r - 2][c] >= 0 && b[r - 2][c] === t)
      );
      b[r][c] = t;
    }
  return b;
}

export function removeFill(board, matched, mask) {
  const nb = board.map(r => [...r]);
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (matched[r][c]) nb[r][c] = -1;

  // Gravity — only in active cells
  for (let c = 0; c < COLS; c++) {
    let w = ROWS - 1;
    // Find bottom-most active row
    while (w >= 0 && mask && !mask[w][c]) w--;
    for (let r = w; r >= 0; r--) {
      if (mask && !mask[r][c]) continue;
      if (nb[r][c] >= 0) {
        if (w !== r) { nb[w][c] = nb[r][c]; nb[r][c] = -1; }
        // Find next active row up
        w--;
        while (w >= 0 && mask && !mask[w][c]) w--;
      }
    }
    // Fill remaining active cells from top
    while (w >= 0) {
      if (mask && !mask[w][c]) { w--; continue; }
      nb[w][c] = rand();
      w--;
    }
  }

  return nb;
}

export function hasValidMoves(board, mask) {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (mask && !mask[r][c]) continue;
      if (c < COLS - 1 && (!mask || mask[r][c + 1])) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r][c + 1]] = [nb[r][c + 1], nb[r][c]];
        if (findMatches(nb, mask).count > 0) return true;
      }
      if (r < ROWS - 1 && (!mask || mask[r + 1][c])) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r + 1][c]] = [nb[r + 1][c], nb[r][c]];
        if (findMatches(nb, mask).count > 0) return true;
      }
    }
  return false;
}

export function createValidBoard(mask) {
  let b = createBoard(mask);
  let attempts = 0;
  while (!hasValidMoves(b, mask) && attempts < 100) {
    b = createBoard(mask);
    attempts++;
  }
  return b;
}

export function shuffleBoard(board, mask) {
  const flat = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (!mask || mask[r][c]) flat.push(board[r][c]);

  for (let i = flat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flat[i], flat[j]] = [flat[j], flat[i]];
  }

  const newBoard = board.map(r => [...r]);
  let idx = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (!mask || mask[r][c]) newBoard[r][c] = flat[idx++];

  return newBoard;
}

export function removeType(board, type, mask) {
  const matched = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  let count = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if ((!mask || mask[r][c]) && board[r][c] === type) { matched[r][c] = true; count++; }
  return { matched, count };
}