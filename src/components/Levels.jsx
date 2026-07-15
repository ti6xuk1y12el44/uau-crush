import { LEVELS } from "../constants/levels";

export default function Levels({ maxLevel, bestScores, totalStars, onStart, onBack, onSettings }) {
  return (
    <>
      <h2 className="gold" style={{ fontSize: "1.8rem", letterSpacing: 4, margin: "0 0 4px", fontWeight: 900 }}>Viagem pela Madeira</h2>
      <p className="lbl" style={{ margin: "0 0 8px", letterSpacing: 6, fontSize: "0.7rem" }}>Escolhe o destino</p>
      {totalStars > 0 ? (
        <p style={{ fontSize: "0.7rem", color: "#C9B89A", margin: "0 0 20px", fontFamily: "'Inter', sans-serif" }}>⭐ {totalStars} / {LEVELS.length * 3}</p>
      ) : (
        <div style={{ height: 20 }} />
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 72px)", gap: 14, justifyContent: "center", padding: "0 12px" }}>
        {LEVELS.map((lv, i) => {
          const unlocked = i <= maxLevel;
          const current = i === maxLevel;
          const best = bestScores[i];
          return (
            <div key={i} onClick={() => unlocked && onStart(i)} style={{
              width: 72, height: 72, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
              background: current
                ? "linear-gradient(145deg, #F2C94C, #D4A843, #B8860B)"
                : unlocked
                  ? "radial-gradient(circle at 40% 35%, #3a2518, #261710)"
                  : "radial-gradient(circle, #1a0e08 0%, #120905 100%)",
              border: current
                ? "2px solid #F2C94C"
                : unlocked
                  ? "2px solid #5a3a2280"
                  : "2px solid #2a1a0e50",
              color: current ? "#1a0e05" : unlocked ? "#EDE0D0" : "#3d2515",
              cursor: unlocked ? "pointer" : "default",
              opacity: unlocked ? 1 : 0.5,
              boxShadow: current
                ? "0 0 24px rgba(212,168,67,0.4), 0 4px 16px rgba(0,0,0,0.3)"
                : unlocked
                  ? "0 4px 12px rgba(0,0,0,0.3)"
                  : "none",
              animation: current ? "glowPulse 2s ease-in-out infinite" : "none",
              transition: "all 0.2s",
              fontFamily: "'Playfair Display', serif",
            }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 900, lineHeight: 1 }}>{i + 1}</span>
              {best ? (
                <span style={{ fontSize: "0.55rem", marginTop: 2 }}>{"⭐".repeat(best.stars)}</span>
              ) : unlocked ? (
                <span style={{
                  fontSize: "0.35rem", letterSpacing: 0.5, marginTop: 2,
                  opacity: current ? 0.8 : 0.5, textAlign: "center",
                  maxWidth: 56, overflow: "hidden",
                  fontFamily: "'Inter', sans-serif", fontWeight: 600,
                }}>{lv.label}</span>
              ) : (
                <span style={{ fontSize: "0.7rem", marginTop: 2, opacity: 0.6 }}>🔒</span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        <button className="btn-g" onClick={onBack} style={{ padding: "10px 24px" }}>← Voltar</button>
        <button className="btn-g" onClick={onSettings} style={{ padding: "10px 24px" }}>⚙️</button>
      </div>
    </>
  );
}