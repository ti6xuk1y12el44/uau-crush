import Leaderboard from "./components/Leaderboard";
import SubmitScore from "./components/SubmitScore";
import { useState, useEffect, useCallback, useRef } from "react";
import { LEVELS, COLS, ROWS, recalcSizes } from "./constants/levels";
import { CHOCOLATES } from "./constants/chocolates";
import { createValidBoard, removeFill, hasValidMoves, shuffleBoard, removeType } from "./engine/board";
import { findMatches, findHint } from "./engine/matching";
import { calcStars, calcMatchPoints } from "./engine/scoring";
import { playMatch, playCombo, playSwap, playInvalid, playSelect, playWin, playLose, playPowerUp, playStar } from "./engine/sounds";
import { loadProgress, saveProgress, clearProgress } from "./engine/storage";
import Piece from "./components/Piece";
import Particles from "./components/Particles";
import Menu from "./components/Menu";
import Levels from "./components/Levels";
import EndScreen from "./components/EndScreen";
import SettingsModal from "./components/SettingsModal";
import AboutModal from "./components/AboutModal";
import PauseModal from "./components/PauseModal";
import PowerUps from "./components/PowerUps";
import Confetti from "./components/Confetti";
import Tutorial from "./components/Tutorial";

export default function App() {
  const [sizes, setSizes] = useState(() => recalcSizes());
  useEffect(() => {
    const onResize = () => setSizes(recalcSizes());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const { CELL, GAP, BOARD_PX } = sizes;

  const saved = useRef(loadProgress());

  const [screen, setScreen] = useState("menu");
  const [level, setLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(saved.current?.maxLevel || 0);
  const [board, setBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [selected, setSelected] = useState(null);
  const [cascading, setCascading] = useState(false);
  const [combo, setCombo] = useState(0);
  const [particles, setParticles] = useState([]);
  const [floats, setFloats] = useState([]);
  const [newCells, setNewCells] = useState(new Set());
  const [shake, setShake] = useState(false);
  const [matchedCells, setMatchedCells] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hint, setHint] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [paused, setPaused] = useState(false);
  const [bestScores, setBestScores] = useState(saved.current?.bestScores || {});
  const [totalStars, setTotalStars] = useState(0);
  const [settings, setSettings] = useState(saved.current?.settings || { haptics: true, animations: true, showHints: true, sound: true });
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [powers, setPowers] = useState({ destroy: 3, shuffle: 2, bomb: 1 });
  const [activePower, setActivePower] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTutorial, setShowTutorial] = useState(() => !loadProgress());
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const dragStart = useRef(null);
  const pIdRef = useRef(0);
  const fIdRef = useRef(0);
  const hintTimer = useRef(null);

  const mask = LEVELS[level]?.mask || null;

  const snd = useCallback((fn) => { if (settings.sound) fn(); }, [settings.sound]);

  useEffect(() => { saveProgress(maxLevel, bestScores, settings); }, [maxLevel, bestScores, settings]);

  useEffect(() => {
    if (displayScore === score) return;
    const diff = score - displayScore;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 12));
    const t = setTimeout(() => setDisplayScore((p) => (diff > 0 ? Math.min(p + step, score) : Math.max(p - step, score))), 30);
    return () => clearTimeout(t);
  }, [score, displayScore]);

  useEffect(() => {
    if (screen !== "playing" || cascading || paused || !settings.showHints) return;
    if (hintTimer.current) clearTimeout(hintTimer.current);
    setShowHint(false);
    hintTimer.current = setTimeout(() => {
      const h = findHint(board, mask);
      if (h) { setHint(h); setShowHint(true); }
    }, 60000);
    return () => { if (hintTimer.current) clearTimeout(hintTimer.current); };
  }, [board, selected, cascading, screen, paused, settings.showHints, mask]);

  useEffect(() => {
    let t = 0;
    Object.values(bestScores).forEach((v) => { t += v.stars; });
    setTotalStars(t);
  }, [bestScores]);

  const vib = useCallback((ms = 15) => { if (settings.haptics && navigator.vibrate) navigator.vibrate(ms); }, [settings.haptics]);

  const spawnParticles = useCallback((positions, type) => {
    if (!settings.animations) return;
    const ch = CHOCOLATES[type] || CHOCOLATES[0];
    const newP = [];
    positions.forEach(({ r, c }) => {
      for (let i = 0; i < 4; i++) {
        newP.push({ id: ++pIdRef.current, x: c * (CELL + GAP) + CELL / 2 + (Math.random() - 0.5) * 10, y: r * (CELL + GAP) + CELL / 2 + (Math.random() - 0.5) * 10, size: 4 + Math.random() * 6, color: ch.glow, dir: Math.floor(Math.random() * 8), duration: 0.4 + Math.random() * 0.4 });
      }
    });
    setParticles((prev) => [...prev, ...newP]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => !newP.includes(p))), 900);
  }, [settings.animations, CELL, GAP]);

  const spawnFloat = useCallback((r, c, text, sub) => {
    const id = ++fIdRef.current;
    setFloats((prev) => [...prev, { id, x: c * (CELL + GAP), y: r * (CELL + GAP), text, sub }]);
    setTimeout(() => setFloats((prev) => prev.filter((f) => f.id !== id)), 1000);
  }, [CELL, GAP]);

  const startLevel = useCallback((lvl) => {
    const lvMask = LEVELS[lvl]?.mask || null;
    setBoard(createValidBoard(lvMask));
    setScore(0); setDisplayScore(0); setMoves(LEVELS[lvl].moves);
    setLevel(lvl); setSelected(null); setCascading(false); setCombo(0);
    setParticles([]); setFloats([]); setNewCells(new Set()); setMatchedCells(null);
    setDragging(null); setHint(null); setShowHint(false); setPaused(false);
    setActivePower(null); setShowConfetti(false);
    setPowers({ destroy: 3, shuffle: 2, bomb: 1 });
    setScreen("playing");
  }, []);

  const processCascade = useCallback((brd, sc, cmb, mvs) => {
    const { matched, count } = findMatches(brd, mask);
    if (count === 0) {
      setCascading(false); setCombo(0); setMatchedCells(null);
      if (!hasValidMoves(brd, mask)) setBoard(createValidBoard(mask));
      if (mvs <= 0) {
        const st = calcStars(sc, LEVELS[level].target);
        if (st > 0) {
          setMaxLevel((prev) => Math.max(prev, level + 1));
          setBestScores((prev) => {
            const old = prev[level];
            if (!old || sc > old.score) return { ...prev, [level]: { score: sc, stars: st } };
            return prev;
          });
          snd(playWin); setShowConfetti(true);
          setTimeout(() => setScreen("win"), 400);
        } else {
          snd(playLose);
          setTimeout(() => setScreen("lose"), 400);
        }
      }
      return;
    }
    setMatchedCells(matched);
    const newCmb = cmb + 1;
    const { points, multiplier } = calcMatchPoints(count, newCmb);
    const newSc = sc + points;
    setScore(newSc); setCombo(newCmb);
    if (newCmb >= 3) snd(playCombo); else snd(playMatch);

    let cr = 0, cc = 0, n = 0, tp = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (matched[r][c]) { cr += r; cc += c; n++; tp = brd[r][c]; }
    if (n > 0) {
      spawnFloat(cr / n, cc / n, `+${points}`, newCmb > 1 ? `COMBO ×${multiplier.toFixed(1)}` : null);
      spawnParticles(Array.from({ length: Math.min(n, 6) }, (_, i) => ({ r: Math.floor(cr / n) + ((i % 2) * 2 - 1), c: Math.floor(cc / n) + ((i % 3) - 1) })), tp);
      vib(newCmb > 1 ? 30 : 15);
    }
    if (newCmb >= 3) { setShake(true); setTimeout(() => setShake(false), 300); }

    const prevStars = calcStars(sc - points, LEVELS[level].target);
    const newStars = calcStars(newSc, LEVELS[level].target);
    if (newStars > prevStars) snd(playStar);

    setTimeout(() => {
      const nb = removeFill(brd, matched, mask);
      setBoard(nb); setMatchedCells(null);
      const nc = new Set();
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) if (matched[r][c]) nc.add(`${r}-${c}`);
      setNewCells(nc);
      setTimeout(() => { setNewCells(new Set()); processCascade(nb, newSc, newCmb, mvs); }, 300);
    }, 400);
  }, [level, mask, spawnFloat, spawnParticles, vib, snd]);

  const doSwap = useCallback((r1, c1, r2, c2) => {
    if (cascading) return;
    if (mask && (!mask[r1][c1] || !mask[r2][c2])) return;
    setShowHint(false); setHint(null);
    const nb = board.map((r) => [...r]);
    [nb[r1][c1], nb[r2][c2]] = [nb[r2][c2], nb[r1][c1]];
    if (findMatches(nb, mask).count === 0) {
      setBoard(nb); vib(8); snd(playInvalid);
      setTimeout(() => { const rv = nb.map((r) => [...r]); [rv[r1][c1], rv[r2][c2]] = [rv[r2][c2], rv[r1][c1]]; setBoard(rv); }, 200);
      return;
    }
    snd(playSwap);
    const nm = moves - 1; setMoves(nm); setBoard(nb); vib(15);
    setTimeout(() => { setCascading(true); processCascade(nb, score, 0, nm); }, 250);
  }, [board, moves, score, cascading, mask, processCascade, vib, snd]);

  const handleUsePower = useCallback((key) => {
    if (cascading || screen !== "playing") return;
    if (key === "shuffle") {
      setPowers((p) => ({ ...p, shuffle: p.shuffle - 1 }));
      setBoard(shuffleBoard(board, mask));
      vib(20); snd(playPowerUp);
      setShowHint(false); setHint(null);
      return;
    }
    if (key === "destroy" || key === "bomb") { setActivePower(key); setSelected(null); snd(playSelect); }
  }, [cascading, screen, board, mask, vib, snd]);

  const handlePowerClick = useCallback((r, c) => {
    if (!activePower) return false;
    if (mask && !mask[r][c]) return false;
    if (activePower === "destroy") {
      setPowers((p) => ({ ...p, destroy: p.destroy - 1 }));
      const nb = board.map((row) => [...row]);
      const type = nb[r][c];
      spawnParticles([{ r, c }], type);
      spawnFloat(r, c, "+50", "💥");
      setScore((s) => s + 50);
      nb[r][c] = -1;
      const filled = removeFill(nb, Array.from({ length: ROWS }, (_, ri) => Array.from({ length: COLS }, (_, ci) => ri === r && ci === c)), mask);
      setBoard(filled); vib(20); snd(playPowerUp); setActivePower(null);
      setTimeout(() => {
        if (findMatches(filled, mask).count > 0) { setCascading(true); processCascade(filled, score + 50, 0, moves); }
      }, 300);
      return true;
    }
    if (activePower === "bomb") {
      setPowers((p) => ({ ...p, bomb: p.bomb - 1 }));
      const type = board[r][c];
      const { matched, count } = removeType(board, type, mask);
      if (count > 0) {
        setMatchedCells(matched);
        const pts = count * 15;
        setScore((s) => s + pts);
        spawnFloat(r, c, `+${pts}`, "🔥 BOOM");
        const positions = [];
        for (let ri = 0; ri < ROWS; ri++) for (let ci = 0; ci < COLS; ci++) if (matched[ri][ci]) positions.push({ r: ri, c: ci });
        spawnParticles(positions.slice(0, 8), type);
        vib(40); snd(playPowerUp);
        setTimeout(() => {
          const nb = removeFill(board, matched, mask);
          setBoard(nb); setMatchedCells(null); setActivePower(null);
          setTimeout(() => { setCascading(true); processCascade(nb, score + pts, 0, moves); }, 300);
        }, 400);
      }
      return true;
    }
    return false;
  }, [activePower, board, score, moves, mask, spawnParticles, spawnFloat, vib, processCascade, snd]);

  const handlePointerDown = useCallback((r, c, e) => {
    if (cascading || screen !== "playing" || paused) return;
    if (mask && !mask[r][c]) return;
    e.preventDefault();
    if (activePower) { handlePowerClick(r, c); return; }
    snd(playSelect);
    dragStart.current = { r, c, startX: e.clientX || 0, startY: e.clientY || 0, hasMoved: false };
    setDragging({ r, c }); setDragOffset({ x: 0, y: 0 }); setSelected({ r, c });
  }, [cascading, screen, paused, mask, activePower, handlePowerClick, snd]);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      if (!dragStart.current) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const dx = cx - dragStart.current.startX, dy = cy - dragStart.current.startY;
      const mx = CELL + GAP;
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) dragStart.current.hasMoved = true;
      if (Math.abs(dx) > Math.abs(dy)) setDragOffset({ x: Math.max(-mx, Math.min(mx, dx)), y: 0 });
      else setDragOffset({ x: 0, y: Math.max(-mx, Math.min(mx, dy)) });
    };
    const onUp = (e) => {
      if (!dragStart.current) { setDragging(null); return; }
      const ds = dragStart.current;
      const cx = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
      const cy = e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0;
      const dx = cx - ds.startX, dy = cy - ds.startY;
      setDragging(null); setDragOffset({ x: 0, y: 0 });
      if (!ds.hasMoved || (Math.abs(dx) < 15 && Math.abs(dy) < 15)) {
        if (selected && !(selected.r === ds.r && selected.c === ds.c)) {
          const dr = Math.abs(selected.r - ds.r), dc = Math.abs(selected.c - ds.c);
          if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) { doSwap(selected.r, selected.c, ds.r, ds.c); setSelected(null); }
          else setSelected({ r: ds.r, c: ds.c });
        }
        dragStart.current = null; return;
      }
      let nr = ds.r, nc = ds.c;
      if (Math.abs(dx) > Math.abs(dy)) nc = dx > 0 ? ds.c + 1 : ds.c - 1;
      else nr = dy > 0 ? ds.r + 1 : ds.r - 1;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) { setSelected(null); doSwap(ds.r, ds.c, nr, nc); }
      dragStart.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); window.removeEventListener("pointercancel", onUp); };
  }, [dragging, selected, doSwap, CELL, GAP]);

  const levelConf = LEVELS[level] || LEVELS[0];
  const pct = Math.min(100, (score / levelConf.target) * 100);
  const starsNow = calcStars(score, levelConf.target);
  const isMobile = CELL < 50;
  const handleReset = () => { setMaxLevel(0); setBestScores({}); setTotalStars(0); setShowSettings(false); clearProgress(); setScreen("menu"); };

  return (
    <div id="app">
      <Confetti active={showConfetti} />
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      {showSettings && <SettingsModal settings={settings} setSettings={setSettings} totalStars={totalStars} maxLevel={maxLevel} onReset={handleReset} onClose={() => setShowSettings(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}

      {screen === "menu" && <Menu totalStars={totalStars} onPlay={() => setScreen("levels")} onSettings={() => setShowSettings(true)} onAbout={() => setShowAbout(true)} onLeaderboard={() => setShowLeaderboard(true)} />}      {screen === "levels" && <Levels maxLevel={maxLevel} bestScores={bestScores} totalStars={totalStars} onStart={startLevel} onBack={() => setScreen("menu")} onSettings={() => setShowSettings(true)} />}
      {(screen === "win" || screen === "lose") && (
        <EndScreen isWin={screen === "win"} score={score} level={level} levelConf={levelConf} bestScore={bestScores[level]}
          onNext={() => { setShowConfetti(false); if (level < LEVELS.length - 1) startLevel(level + 1); else startLevel(level); }}
          onRetry={() => { setShowConfetti(false); startLevel(level); }}
          onLevels={() => { setShowConfetti(false); setScreen("levels"); }} />
      )}

      {screen === "playing" && (
        <>
          {paused && <PauseModal level={level} levelConf={levelConf} score={score} moves={moves} onResume={() => setPaused(false)} onRestart={() => startLevel(level)} onExit={() => { setPaused(false); setScreen("levels"); }} />}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: BOARD_PX, marginBottom: isMobile ? 2 : 8, padding: "2px 0" }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: isMobile ? "0.45rem" : "0.6rem", color: "#FFBB77", fontWeight: 700, letterSpacing: 1 }}>JOGADAS</div>
              <div style={{ fontSize: isMobile ? "1.4rem" : "1.6rem", fontWeight: 900, color: moves <= 5 ? "#FF6B6B" : moves <= 10 ? "#FFB347" : "#FFF8F0", animation: moves <= 3 ? "shimmer .5s ease-in-out infinite" : "none" }}>{moves}</div>
            </div>
            <div style={{ textAlign: "center", flex: 2 }}>
              <div style={{ fontSize: isMobile ? "0.45rem" : "0.6rem", color: "#FFBB77", fontWeight: 700, letterSpacing: 1 }}>PONTOS</div>
              <div style={{ fontSize: isMobile ? "1.6rem" : "2rem", fontWeight: 900, color: "#FFD666", fontFamily: "'Fredoka One', sans-serif" }}>{displayScore}</div>
            </div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: isMobile ? "0.45rem" : "0.6rem", color: "#FFBB77", fontWeight: 700, letterSpacing: 1 }}>ALVO</div>
              <div style={{ fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 800, color: "#FFBB77" }}>{levelConf.target}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, width: BOARD_PX, marginBottom: isMobile ? 4 : 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 6, overflow: "hidden", background: "rgba(0,0,0,0.3)", border: "1px solid #5c3520" }}>
              <div className="progress-bar" style={{ width: `${pct}%`, height: "100%", background: pct >= 100 ? "linear-gradient(90deg, #4CAF50, #66BB6A)" : "linear-gradient(90deg, #E85D26, #FF8C42, #FFD666)", boxShadow: pct >= 100 ? "0 0 8px rgba(76,175,80,0.5)" : "0 0 6px rgba(255,140,66,0.3)" }} />
            </div>
            <div style={{ display: "flex", gap: 1 }}>
              {[1, 2, 3].map((s) => (
                <span key={s} style={{ fontSize: isMobile ? "0.7rem" : "0.9rem", opacity: s <= starsNow ? 1 : 0.2, filter: s <= starsNow ? "drop-shadow(0 1px 3px rgba(255,200,60,0.5))" : "grayscale(1)", transition: "opacity 0.3s" }}>⭐</span>
              ))}
            </div>
          </div>

          {activePower && (
            <div style={{ marginBottom: 4, padding: "4px 12px", borderRadius: 20, background: "rgba(122,224,122,0.12)", border: "1px solid rgba(122,224,122,0.3)", fontSize: isMobile ? "0.6rem" : "0.7rem", color: "#7AE07A", display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
              <span>👆 Toca num chocolate</span>
              <button onClick={() => setActivePower(null)} style={{ background: "none", border: "1px solid #7AE07A40", borderRadius: 8, color: "#7AE07A", cursor: "pointer", padding: "1px 6px", fontSize: "0.5rem" }}>✕</button>
            </div>
          )}

          <div className={`board${shake ? " shake" : ""}`} style={{ width: BOARD_PX, height: ROWS * (CELL + GAP) + GAP, padding: GAP, touchAction: "none", cursor: activePower ? "crosshair" : "default" }}>
            {/* Cell backgrounds - only for active cells */}
            {[...Array(ROWS)].map((_, r) => [...Array(COLS)].map((_, c) => {
              if (mask && !mask[r][c]) return null;
              return <div key={`bg-${r}-${c}`} className="cell-bg" style={{ left: c * (CELL + GAP), top: r * (CELL + GAP), width: CELL, height: CELL }} />;
            }))}

            {/* Pieces - only for active cells */}
            {board.map((row, r) => row.map((type, c) => {
              if (type < 0) return null;
              if (mask && !mask[r][c]) return null;
              return (
                <Piece key={`${r}-${c}`} type={type} r={r} c={c} cellSize={CELL} gapSize={GAP}
                  isSelected={selected?.r === r && selected?.c === c}
                  isDragging={dragging?.r === r && dragging?.c === c}
                  dragOffset={dragging?.r === r && dragging?.c === c ? dragOffset : { x: 0, y: 0 }}
                  isMatched={matchedCells?.[r]?.[c]}
                  isNew={newCells.has(`${r}-${c}`)}
                  isHint={showHint && hint && ((hint[0][0] === r && hint[0][1] === c) || (hint[1][0] === r && hint[1][1] === c))}
                  onPointerDown={(e) => handlePointerDown(r, c, e)}
                />
              );
            }))}

            <Particles particles={particles} />

            {floats.map((f) => (
              <div key={f.id} className="float-score" style={{ left: f.x, top: f.y }}>
                {f.text}
                {f.sub && <div className="float-sub">{f.sub}</div>}
              </div>
            ))}
          </div>

          {combo > 1 && <div className="combo-badge">🔥 ×{(1 + (combo - 1) * 0.5).toFixed(1)}</div>}

          <div style={{ display: "flex", gap: 6, marginTop: isMobile ? 4 : 10, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <PowerUps powers={powers} onUse={handleUsePower} disabled={cascading || paused} />
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: isMobile ? 4 : 8 }}>
            <button className="btn-g" onClick={() => setPaused(true)} style={{ padding: isMobile ? "5px 10px" : "8px 16px", fontSize: isMobile ? "0.6rem" : "0.75rem" }}>⏸</button>
            <button className="btn-g" onClick={() => setShowSettings(true)} style={{ padding: isMobile ? "5px 10px" : "8px 16px", fontSize: isMobile ? "0.6rem" : "0.75rem" }}>⚙️</button>
          </div>

          {showHint && !cascading && <div className="hint-txt">💡 Dica</div>}
        </>
      )}
    </div>
  );
}