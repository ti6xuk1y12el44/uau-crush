import SubmitScore from "./SubmitScore";
import { calcStars } from "../engine/scoring";
import { LEVELS } from "../constants/levels";

export default function EndScreen({ isWin, score, level, levelConf, bestScore, onNext, onRetry, onLevels }) {
  const stars = calcStars(score, levelConf.target);
  const isNewRecord = isWin && (!bestScore || score >= bestScore.score);
  const hasNext = level < LEVELS.length - 1;
  const pct = Math.min(100, (score / levelConf.target) * 100);

  return (
    <div style={{ textAlign: "center", animation: "slideIn 0.5s ease both", maxWidth: 400, width: "90%" }}>
      {/* Icon */}
      <div style={{
        width: 90, height: 90, margin: "0 auto 16px",
        borderRadius: "50%",
        background: isWin
          ? "linear-gradient(145deg, #FF8C42, #E85D26)"
          : "linear-gradient(145deg, #5c3520, #3a1e10)",
        border: isWin ? "3px solid #FFD666" : "3px solid #5c3520",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "3rem",
        boxShadow: isWin
          ? "0 0 0 3px #9C3310, 0 0 30px rgba(255,140,66,0.3), 0 8px 24px rgba(0,0,0,0.3)"
          : "0 8px 24px rgba(0,0,0,0.3)",
      }}>
        {isWin ? "🎉" : "💔"}
      </div>

      <h2 style={{
        fontSize: "2rem", margin: "0 0 4px", letterSpacing: 2, fontWeight: 900,
        color: "#FFD666", fontFamily: "'Fredoka One', sans-serif",
      }}>
        {isWin ? "Nível Completo!" : "Sem jogadas!"}
      </h2>

      <p style={{
        fontSize: "0.8rem", color: "#FFBB77", letterSpacing: 4,
        textTransform: "uppercase", margin: "0 0 16px", fontWeight: 700,
      }}>{levelConf.label}</p>

      {/* Stars */}
      {isWin && (
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
          {[1, 2, 3].map((s) => (
            <span key={s} style={{
              fontSize: "3.2rem",
              animation: s <= stars ? `starPop 0.5s ${s * 0.25}s both` : "none",
              opacity: s <= stars ? 1 : 0.15,
              filter: s <= stars ? "drop-shadow(0 3px 12px rgba(255,200,60,0.6))" : "grayscale(1)",
            }}>⭐</span>
          ))}
        </div>
      )}

      {/* Score card */}
      <div style={{
        background: "rgba(0,0,0,0.25)", borderRadius: 20, padding: "20px 24px",
        marginBottom: 20, border: "2px solid #5c3520",
      }}>
        {/* Score */}
        <div style={{ fontSize: "0.6rem", color: "#FFBB77", fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>PONTUAÇÃO</div>
        <div style={{
          fontSize: "3rem", fontWeight: 900, margin: "0 0 8px",
          color: "#FFD666", fontFamily: "'Fredoka One', sans-serif",
        }}>{score}</div>

        {/* Progress bar */}
        <div style={{ height: 8, borderRadius: 8, background: "rgba(0,0,0,0.3)", marginBottom: 8, overflow: "hidden", border: "1px solid #3a1e10" }}>
          <div style={{
            width: `${pct}%`, height: "100%", borderRadius: 8,
            background: pct >= 100
              ? "linear-gradient(90deg, #4CAF50, #66BB6A)"
              : "linear-gradient(90deg, #E85D26, #FF8C42, #FFD666)",
            transition: "width 0.8s ease",
          }} />
        </div>
        <div style={{ fontSize: "0.75rem", color: "#A06030", fontWeight: 700 }}>
          Objetivo: {levelConf.target}
        </div>

        {/* Best score */}
        {bestScore && (
          <div style={{
            marginTop: 12, padding: "8px 16px", borderRadius: 12,
            background: "rgba(0,0,0,0.15)", border: "1px solid #3a1e10",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: "0.7rem", color: "#A06030", fontWeight: 700 }}>🏆 Melhor</span>
            <span style={{ fontSize: "0.9rem", color: "#FFD666", fontWeight: 900, fontFamily: "'Fredoka One', sans-serif" }}>
              {Math.max(score, bestScore.score)}
            </span>
            <span style={{ fontSize: "0.7rem" }}>
              {"⭐".repeat(Math.max(stars, bestScore.stars))}
            </span>
          </div>
        )}

        {isNewRecord && (
          <div style={{
            display: "inline-block", marginTop: 12, padding: "6px 18px", borderRadius: 20,
            background: "linear-gradient(180deg, #4CAF50, #388E3C)",
            fontSize: "0.75rem", color: "#FFF", fontWeight: 800,
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 3px 0 #2E7D32",
            animation: "comboSlide 0.4s ease both",
          }}>
            🏆 NOVO RECORDE!
          </div>
        )}
      </div>

      {isWin && (
        <SubmitScore
        score={score}
        level={level}
        levelName={levelConf.label}
        stars={stars}
        onDone={() => {}}
      />
    )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn-p" onClick={isWin ? (hasNext ? onNext : onRetry) : onRetry} style={{
          fontSize: "1.1rem", padding: "14px 40px",
        }}>
          {isWin && hasNext ? "Próximo →" : "Tentar Outra Vez"}
        </button>
        <button className="btn-g" onClick={onLevels} style={{ padding: "12px 24px" }}>🗺️ Mapa</button>
      </div>
    </div>
  );
}