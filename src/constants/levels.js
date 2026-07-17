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

function parseMask(strings) {
  return strings.map(row => row.split("").map(c => c === "#"));
}

export const LEVELS = [
  {
    target: 600, moves: 20, label: "Funchal",
    mask: parseMask([
      "#######",
      "#######",
      "#######",
      "#######",
      "#######",
      "#######",
      "#######",
    ])
  },
  {
    target: 900, moves: 18, label: "Câmara de Lobos",
    mask: parseMask([
      "...#...",
      "..###..",
      ".#####.",
      "#######",
      ".#####.",
      "..###..",
      "...#...",
    ])
  },
  {
    target: 1200, moves: 18, label: "Ribeira Brava",
    mask: parseMask([
      "..###..",
      "..###..",
      "#######",
      "#######",
      "#######",
      "..###..",
      "..###..",
    ])
  },
  {
    target: 1600, moves: 20, label: "Ponta do Sol",
    mask: parseMask([
      ".##.##.",
      "#######",
      "#######",
      ".#####.",
      ".#####.",
      "..###..",
      "...#...",
    ])
  },
  {
    target: 2000, moves: 18, label: "Calheta",
    mask: parseMask([
      "#.....#",
      "##...##",
      ".##.##.",
      "..###..",
      ".##.##.",
      "##...##",
      "#.....#",
    ])
  },
  {
    target: 2500, moves: 18, label: "Porto Moniz",
    mask: parseMask([
      "..###..",
      ".#####.",
      "#######",
      "#######",
      "#######",
      ".#####.",
      "..###..",
    ])
  },
  {
    target: 3000, moves: 16, label: "São Vicente",
    mask: parseMask([
      "#######",
      "#######",
      "..###..",
      "..###..",
      "..###..",
      "..###..",
      "..###..",
    ])
  },
  {
    target: 3500, moves: 18, label: "Santana",
    mask: parseMask([
      "...#...",
      "..###..",
      "..###..",
      ".#####.",
      ".#####.",
      "#######",
      "#######",
    ])
  },
  {
    target: 4000, moves: 16, label: "Machico",
    mask: parseMask([
      "##...##",
      "##...##",
      "##...##",
      "##...##",
      "##.#.##",
      "#######",
      "#######",
    ])
  },
  {
    target: 4500, moves: 18, label: "Santa Cruz",
    mask: parseMask([
      "#..#..#",
      "##.#.##",
      ".#####.",
      "..###..",
      ".#####.",
      "##.#.##",
      "#..#..#",
    ])
  },
  {
    target: 5000, moves: 18, label: "Curral das Freiras",
    mask: parseMask([
      "#######",
      ".#####.",
      "..###..",
      "...#...",
      "..###..",
      ".#####.",
      "#######",
    ])
  },
  {
    target: 5500, moves: 16, label: "Pico do Arieiro",
    mask: parseMask([
      "...#...",
      "..###..",
      ".#####.",
      "#######",
      "#######",
      "#######",
      "#######",
    ])
  },
  {
    target: 6000, moves: 16, label: "Pico Ruivo",
    mask: parseMask([
      ".#####.",
      "#.###.#",
      "##.#.##",
      "#######",
      "##.#.##",
      "#.###.#",
      ".#####.",
    ])
  },
  {
    target: 7000, moves: 18, label: "Levada do Caldeirão",
    mask: parseMask([
      "###....",
      "####...",
      ".####..",
      "..####.",
      "...####",
      "....###",
      "....###",
    ])
  },
  {
    target: 8000, moves: 20, label: "Mercado dos Lavradores",
    mask: parseMask([
      ".#####.",
      "#######",
      "#######",
      "#######",
      "#######",
      "#######",
      ".#####.",
    ])
  },
];