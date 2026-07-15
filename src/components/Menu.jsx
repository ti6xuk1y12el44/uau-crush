import { CHOCOLATES } from "../constants/chocolates";

export default function Menu({ totalStars, onPlay, onSettings, onAbout }) {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} className="amb" style={{
            width: 3 + Math.random() * 3, height: 3 + Math.random() * 3,
            background: i % 3 === 0 ? "#D4A843" : i % 3 === 1 ? "#6B4226" : "#F2C94C",
            opacity: 0.06 + Math.random() * 0.08,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animation: `floatY ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }} />
        ))}
      </div>

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: "3.8rem", marginBottom: 10, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}>🍫</div>
        <h1 className="gold" style={{ fontSize: "2.8rem", fontWeight: "bold", letterSpacing: 4, margin: "0 0 2px" }}>UAU CRUSH</h1>
        <p style={{ fontSize: "0.65rem", letterSpacing: 8, textTransform: "uppercase", color: "#6B4226", margin: "0 0 8px" }}>by Uau Cacau • Madeira</p>
        {totalStars > 0 ? (
          <p style={{ fontSize: "0.7rem", color: "#C9B89A", margin: "0 0 28px" }}>⭐ {totalStars} estrelas conquistadas</p>
        ) : (
          <div style={{ height: 28 }} />
        )}

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 36, flexWrap: "wrap", padding: "0 20px" }}>
          {CHOCOLATES.map((ch, i) => (
            <div key={i} style={{
              width: 52, height: 52, borderRadius: 12,
              border: `2px solid ${ch.border}`,
              boxShadow: `0 4px 12px rgba(0,0,0,0.4), 0 0 10px ${ch.glow}20`,
              animation: `floatY ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              overflow: "hidden",
              background: "#2a1810",
            }}>
              <img src={ch.img} alt={ch.name} draggable={false} style={{
                width: "100%", height: "100%", objectFit: "contain",
                filter: "brightness(1.15) contrast(1.1)",
              }} />
            </div>
          ))}
        </div>

        <button className="btn-p" onClick={onPlay} style={{ animation: "glowPulse 2s ease-in-out infinite" }}>Jogar</button>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 24 }}>
          <button className="btn-g" onClick={onSettings} style={{ padding: "8px 20px", fontSize: "0.7rem" }}>⚙️ Definições</button>
          <button className="btn-g" onClick={onAbout} style={{ padding: "8px 20px", fontSize: "0.7rem" }}>🍫 Sobre</button>
        </div>

        <p style={{ fontSize: "0.55rem", color: "#3d2211", marginTop: 24, letterSpacing: 2 }}>Chocolate artesanal da Ilha da Madeira 🏝️</p>
      </div>
    </>
  );
}