export function calcStars(score, target) {
  if (score >= target * 1.8) return 3;
  if (score >= target * 1.3) return 2;
  if (score >= target) return 1;
  return 0;
}

export function calcMatchPoints(matchCount, comboLevel) {
  const multiplier = 1 + (comboLevel - 1) * 0.5;
  const points = Math.round(matchCount * 12 * multiplier);
  return { points, multiplier };
}