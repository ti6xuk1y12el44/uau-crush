export const COLS = 7;
export const ROWS = 7;

function calcSize() {
  const screenW = typeof window !== "undefined" ? window.innerWidth : 800;
  const maxBoardW = Math.min(screenW - 32, 520);
  const gap = screenW < 500 ? 4 : 5;
  const cell = Math.floor((maxBoardW - gap * (COLS + 1)) / COLS);
  return { cell, gap };
}

const { cell, gap } = calcSize();

export let CELL = cell;
export let GAP = gap;
export let BOARD_PX = COLS * (CELL + GAP) + GAP;

export function recalcSizes() {
  const { cell, gap } = calcSize();
  CELL = cell;
  GAP = gap;
  BOARD_PX = COLS * (CELL + GAP) + GAP;
  return { CELL, GAP, BOARD_PX };
}

export const LEVELS = [
  { target: 600, moves: 20, label: "Funchal" },
  { target: 900, moves: 18, label: "Câmara de Lobos" },
  { target: 1200, moves: 18, label: "Ribeira Brava" },
  { target: 1600, moves: 16, label: "Ponta do Sol" },
  { target: 2000, moves: 16, label: "Calheta" },
  { target: 2500, moves: 15, label: "Porto Moniz" },
  { target: 3000, moves: 14, label: "São Vicente" },
  { target: 3500, moves: 14, label: "Santana" },
  { target: 4000, moves: 13, label: "Machico" },
  { target: 4500, moves: 12, label: "Santa Cruz" },
  { target: 5000, moves: 15, label: "Curral das Freiras" },
  { target: 5500, moves: 14, label: "Pico do Arieiro" },
  { target: 6000, moves: 13, label: "Pico Ruivo" },
  { target: 7000, moves: 12, label: "Levada do Caldeirão" },
  { target: 8000, moves: 12, label: "Mercado dos Lavradores" },
];