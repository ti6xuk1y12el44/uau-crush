const KEY = "uau-crush-save";

export function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (!data) return null;
    return {
      maxLevel: data.maxLevel || 0,
      bestScores: data.bestScores || {},
      settings: data.settings || { haptics: true, animations: true, showHints: true },
    };
  } catch {
    return null;
  }
}

export function saveProgress(maxLevel, bestScores, settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ maxLevel, bestScores, settings }));
  } catch {}
}

export function clearProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}