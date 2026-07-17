import { COLS, ROWS } from "../constants/levels";

export function findMatches(board, mask) {
  const matched = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
  let count = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 2; c++) {
      if (mask && !mask[r][c]) continue;
      const t = board[r][c]; if (t < 0) continue;
      let len = 1;
      while (c + len < COLS && (!mask || mask[r][c + len]) && board[r][c + len] === t) len++;
      if (len >= 3) for (let i = 0; i < len; i++) { if (!matched[r][c + i]) count++; matched[r][c + i] = true; }
    }
  }

  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r < ROWS - 2; r++) {
      if (mask && !mask[r][c]) continue;
      const t = board[r][c]; if (t < 0) continue;
      let len = 1;
      while (r + len < ROWS && (!mask || mask[r + len][c]) && board[r + len][c] === t) len++;
      if (len >= 3) for (let i = 0; i < len; i++) { if (!matched[r + i][c]) count++; matched[r + i][c] = true; }
    }
  }

  return { matched, count };
}

export function findHint(board, mask) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (mask && !mask[r][c]) continue;
      if (c < COLS - 1 && (!mask || mask[r][c + 1])) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r][c + 1]] = [nb[r][c + 1], nb[r][c]];
        if (findMatches(nb, mask).count > 0) return [[r, c], [r, c + 1]];
      }
      if (r < ROWS - 1 && (!mask || mask[r + 1][c])) {
        const nb = board.map(x => [...x]);
        [nb[r][c], nb[r + 1][c]] = [nb[r + 1][c], nb[r][c]];
        if (findMatches(nb, mask).count > 0) return [[r, c], [r + 1, c]];
      }
    }
  }
  return null;
}