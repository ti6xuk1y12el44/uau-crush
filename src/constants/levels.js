export const COLS = 8;
export const ROWS = 8;

// Calcula o tamanho das peças com base na largura do ecrã
function calcSize() {
  const screenW = typeof window !== "undefined" ? window.innerWidth : 800;
  const maxBoardW = Math.min(screenW - 32, 520); // 16px padding de cada lado, max 520
  const gap = screenW < 500 ? 3 : 5;
  const cell = Math.floor((maxBoardW - gap * (COLS + 1)) / COLS);
  return { cell, gap };
}

const { cell, gap } = calcSize();

export let CELL = cell;
export let GAP = gap;
export let BOARD_PX = COLS * (CELL + GAP) + GAP;

// Recalcula quando a janela muda de tamanho
export function recalcSizes() {
  const { cell, gap } = calcSize();
  CELL = cell;
  GAP = gap;
  BOARD_PX = COLS * (CELL + GAP) + GAP;
  return { CELL, GAP, BOARD_PX };
}

export const LEVELS = [
  { target: 800, moves: 20, label: "Funchal" },
  { target: 1200, moves: 18, label: "Câmara de Lobos" },
  { target: 1600, moves: 18, label: "Ribeira Brava" },
  { target: 2200, moves: 16, label: "Ponta do Sol" },
  { target: 2800, moves: 16, label: "Calheta" },
  { target: 3500, moves: 15, label: "Porto Moniz" },
  { target: 4000, moves: 14, label: "São Vicente" },
  { target: 4800, moves: 14, label: "Santana" },
  { target: 5500, moves: 13, label: "Machico" },
  { target: 6200, moves: 12, label: "Santa Cruz" },
  { target: 7000, moves: 15, label: "Curral das Freiras" },
  { target: 7800, moves: 14, label: "Pico do Arieiro" },
  { target: 8500, moves: 13, label: "Pico Ruivo" },
  { target: 9500, moves: 12, label: "Levada do Caldeirão" },
  { target: 10500, moves: 12, label: "Mercado dos Lavradores" },
];