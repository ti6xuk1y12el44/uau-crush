import { LEVELS } from "../constants/levels";

export default function Levels({ maxLevel, bestScores, totalStars, onStart, onBack, onSettings }) {
  return (
    <>
      <h2 className="gold" style={{ fontSize: "1.5rem", letterSpacing: 3, margin: "0 0 2px" }}>Viagem pela Madeira</h2>
      <p className="lbl" style={{ margin: "0 0 6px", letterSpacing: 5 }}>Escolhe o destino</p>
      {totalStars > 0 ? (
        <p style={{ fontSize: "0.65rem", color: "#C9B89A", margin: "0 0 14px" }}>⭐ {totalStars} / {LEVELS.length * 3}</p>
      ) : (
        <div style={{ height: 14 }} />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 68px)", gap: 10, justifyContent: "center", padding: "0 12px" }}>
        {LEVELS.map((lv, i) => {
          const unlocked = i <= maxLevel;
          const current = i === maxLevel;
          const best = bestScores[i];
          return (
            <div key={i} className="level-circle" onClick={() => unlocked && onStart(i)} style={{
              background: current ? "linear-gradient(135deg,#D4A843,#B8860B)" : unlocked ? "rgba(44,26,14,0.8)" : "rgba(13,7,5,0.5)",
              borderColor: current ? "#F2C94C" : unlocked ? "#5a3a22" : "#1a0e08",
              color: current ? "#1a0e05" : unlocked ? "#EDE0D0" : "#2d1810",
              cursor: unlocked ? "pointer" : "default",
              opacity: unlocked ? 1 : 0.3,
              boxShadow: current ? "0 0 20px rgba(212,168,67,0.3)" : "none",
              animation: current ? "glowPulse 2s ease-in-out infinite" : "none",
            }}>
              <span style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: 1 }}>{i + 1}</span>
              {best ? (
                <span style={{ fontSize: "0.5rem", marginTop: 1 }}>{"⭐".repeat(best.stars)}</span>
              ) : unlocked ? (
                <span style={{ fontSize: "0.3rem", letterSpacing: 0.5, marginTop: 1, opacity: 0.6, textAlign: "center", maxWidth: 52, overflow: "hidden" }}>{lv.label}</span>
              ) : (
                <span style={{ fontSize: "0.5rem", marginTop: 1 }}>🔒</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="btn-g" onClick={onBack}>← Voltar</button>
        <button className="btn-g" onClick={onSettings}>⚙️</button>
      </div>
    </>
  );
}