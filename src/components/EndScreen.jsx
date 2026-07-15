import { calcStars } from "../engine/scoring";
import { LEVELS } from "../constants/levels";

export default function EndScreen({ isWin, score, level, levelConf, bestScore, onNext, onRetry, onLevels }) {
  const stars = calcStars(score, levelConf.target);
  const isNewRecord = isWin && (!bestScore || score >= bestScore.score);
  const hasNext = level < LEVELS.length - 1;

  return (
    <div style={{ textAlign: "center", animation: "slideIn 0.5s ease both", maxWidth: 400 }}>
      {/* Emoji */}
      <div style={{
        width: 80, height: 80, margin: "0 auto 16px",
        borderRadius: "50%",
        background: isWin
          ? "linear-gradient(145deg, rgba(212,168,67,0.15), rgba(212,168,67,0.05))"
          : "linear-gradient(145deg, rgba(232,68,58,0.1), rgba(150,45,34,0.05))",
        border: isWin ? "2px solid #D4A84330" : "2px solid #96221930",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2.8rem",
        boxShadow: isWin ? "0 0 30px rgba(212,168,67,0.1)" : "none",
      }}>
        {isWin ? "🎉" : "💔"}
      </div>

      <h2 className="gold" style={{ fontSize: "2.2rem", margin: "0 0 4px", letterSpacing: 3, fontWeight: 900 }}>
        {isWin ? "Nível Completo!" : "Sem jogadas!"}
      </h2>

      <div style={{
        width: 40, height: 2, margin: "8px auto 12px",
        background: "linear-gradient(90deg, transparent, #D4A843, transparent)",
      }} />

      <p className="lbl" style={{ margin: "0 0 20px", letterSpacing: 6, fontSize: "0.7rem" }}>{levelConf.label}</p>

      {/* Stars */}
      {isWin && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {[1, 2, 3].map((s) => (
            <span key={s} style={{
              fontSize: "3rem",
              animation: s <= stars ? `starPop 0.5s ${s * 0.25}s both` : "none",
              opacity: s <= stars ? 1 : 0.12,
              filter: s <= stars ? "drop-shadow(0 2px 12px rgba(242,201,76,0.5))" : "grayscale(1)",
            }}>⭐</span>
          ))}
        </div>
      )}

      {/* Score card */}
      <div style={{
        background: "linear-gradient(145deg, rgba(26,14,5,0.6), rgba(13,7,5,0.4))",
        borderRadius: 20, padding: "24px 44px", marginBottom: 28,
        border: "1px solid #2a1a0e",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}>
        <div className="lbl" style={{ fontSize: "0.55rem", marginBottom: 4 }}>Pontuação</div>
        <div style={{
          fontSize: "3.2rem", fontWeight: 900, margin: "4px 0",
          background: "linear-gradient(135deg, #F2C94C, #D4A843)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>{score}</div>
        <div style={{
          width: "100%", height: 4, borderRadius: 2, marginTop: 8, marginBottom: 8,
          background: "#0d0705", overflow: "hidden",
        }}>
          <div style={{
            width: `${Math.min(100, (score / levelConf.target) * 100)}%`,
            height: "100%", borderRadius: 2,
            background: score >= levelConf.target
              ? "linear-gradient(90deg, #4CAF50, #66BB6A)"
              : "linear-gradient(90deg, #B8860B, #D4A843)",
          }} />
        </div>
        <div style={{ fontSize: "0.7rem", color: "#8B7355", fontFamily: "'Inter', sans-serif" }}>
          Objetivo: {levelConf.target}
        </div>
        {bestScore && bestScore.score > score && (
          <div style={{ fontSize: "0.65rem", color: "#A08B70", marginTop: 8, fontFamily: "'Inter', sans-serif" }}>
            Recorde: {bestScore.score}
          </div>
        )}
        {isNewRecord && (
          <div style={{
            display: "inline-block", marginTop: 10, padding: "4px 14px", borderRadius: 12,
            background: "rgba(74,224,122,0.1)", border: "1px solid rgba(74,224,122,0.2)",
            fontSize: "0.65rem", color: "#4AE07A", fontFamily: "'Inter', sans-serif",
          }}>
            🏆 Novo recorde!
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn-p" onClick={isWin ? (hasNext ? onNext : onRetry) : onRetry} style={{
          fontSize: "1.1rem", padding: "16px 48px",
        }}>
          {isWin && hasNext ? "Próximo Nível" : "Tentar Outra Vez"}
        </button>
        <button className="btn-g" onClick={onLevels}>Mapa</button>
      </div>
    </div>
  );
}