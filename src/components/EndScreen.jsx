import { calcStars } from "../engine/scoring";

export default function EndScreen({ isWin, score, level, levelConf, bestScore, onNext, onRetry, onLevels }) {
  const stars = calcStars(score, levelConf.target);
  const isNewRecord = isWin && (!bestScore || score >= bestScore.score);

  return (
    <div style={{ textAlign: "center", animation: "slideIn 0.4s ease both" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: 8 }}>{isWin ? "🎉" : "💔"}</div>
      <h2 className="gold" style={{ fontSize: "2rem", margin: "0 0 4px", letterSpacing: 3 }}>
        {isWin ? "Nível Completo!" : "Sem jogadas!"}
      </h2>
      <p className="lbl" style={{ margin: "0 0 20px", letterSpacing: 5 }}>{levelConf.label}</p>

      {isWin && (
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
          {[1, 2, 3].map((s) => (
            <span key={s} style={{
              fontSize: "2.8rem",
              animation: s <= stars ? `starPop 0.5s ${s * 0.25}s both` : "none",
              opacity: s <= stars ? 1 : 0.15,
              filter: s <= stars ? "drop-shadow(0 2px 8px rgba(242,201,76,0.5))" : "grayscale(1)",
            }}>⭐</span>
          ))}
        </div>
      )}

      <div style={{ background: "rgba(13,7,5,0.5)", borderRadius: 16, padding: "20px 40px", marginBottom: 24, border: "1px solid #2a1a0e" }}>
        <div className="lbl" style={{ fontSize: "0.5rem" }}>Pontuação</div>
        <div style={{ fontSize: "2.8rem", fontWeight: "bold", color: "#F2C94C", margin: "4px 0" }}>{score}</div>
        <div style={{ fontSize: "0.65rem", color: "#8B7355" }}>Objetivo: {levelConf.target}</div>
        {bestScore && bestScore.score > score && (
          <div style={{ fontSize: "0.6rem", color: "#C9B89A", marginTop: 6 }}>Recorde: {bestScore.score}</div>
        )}
        {isNewRecord && (
          <div style={{ fontSize: "0.6rem", color: "#4AE07A", marginTop: 6 }}>🏆 Novo recorde!</div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn-p" onClick={isWin ? onNext : onRetry}>
          {isWin ? "Próximo" : "Repetir"}
        </button>
        <button className="btn-g" onClick={onLevels}>Níveis</button>
      </div>
    </div>
  );
}