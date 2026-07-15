import { COLS, ROWS } from "../constants/levels";

export function findMatches(board) {
  const matched = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  let count = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 2; c++) {
      const t = board[r][c]; if (t < 0) continue;
      let len = 1;
      while (c + len < COLS && board[r][c + len] === t) len++;
      if (len >= 3) for (let i = 0; i < len; i++) { if (!matched[r][c + i]) count++; matched[r][c + i] = true; }
    }
  }

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 2; r++) {
      const t = board[r][c]; if (t < 0) continue;
      let len = 1;
      while (r + len < ROWS && board[r + len][c] === t) len++;
      if (len >= 3) for (let i = 0; i < len; i++) { if (!matched[r + i][c]) count++; matched[r + i][c] = true; }
    }
  }

  return { matched, count };
}

export function findHint(board) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (c < COLS - 1) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r][c + 1]] = [nb[r][c + 1], nb[r][c]];
        if (findMatches(nb).count > 0) return [[r, c], [r, c + 1]];
      }
      if (r < ROWS - 1) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r + 1][c]] = [nb[r + 1][c], nb[r][c]];
        if (findMatches(nb).count > 0) return [[r, c], [r + 1, c]];
      }
    }
  }
  return null;
}