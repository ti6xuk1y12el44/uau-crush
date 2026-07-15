import { CHOCOLATES } from "../constants/chocolates";

export default function Menu({ totalStars, onPlay, onSettings, onAbout }) {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="amb" style={{
            width: 2 + Math.random() * 4, height: 2 + Math.random() * 4,
            background: i % 4 === 0 ? "#D4A843" : i % 4 === 1 ? "#6B4226" : i % 4 === 2 ? "#F2C94C" : "#8B5E3C",
            opacity: 0.04 + Math.random() * 0.08,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animation: `floatY ${3 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }} />
        ))}
      </div>

      <div style={{ textAlign: "center", zIndex: 1, maxWidth: 520 }}>
        <div style={{
          width: 90, height: 90, margin: "0 auto 20px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #3a2518, #2a1810)",
          border: "2px solid #D4A84325",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(212,168,67,0.08)",
          fontSize: "3rem",
        }}>🍫</div>

        <h1 className="gold" style={{ fontSize: "3.4rem", fontWeight: 900, letterSpacing: 8, margin: "0 0 6px" }}>
          UAU CRUSH
        </h1>
        <div style={{ width: 80, height: 2, margin: "0 auto 10px", background: "linear-gradient(90deg, transparent, #D4A843, transparent)" }} />
        <p style={{ fontSize: "0.75rem", letterSpacing: 10, textTransform: "uppercase", color: "#8B7355", margin: "0 0 4px", fontFamily: "'Inter', sans-serif" }}>
          by Uau Cacau
        </p>
        <p style={{ fontSize: "0.65rem", letterSpacing: 5, color: "#5a3a22", margin: "0 0 36px", fontFamily: "'Inter', sans-serif" }}>
          Ilha da Madeira 🏝️
        </p>

        {totalStars > 0 && (
          <div style={{
            display: "inline-block", padding: "8px 24px", borderRadius: 24,
            background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.12)",
            fontSize: "0.8rem", color: "#D4A843", marginBottom: 32, fontFamily: "'Inter', sans-serif",
          }}>
            ⭐ {totalStars} estrelas conquistadas
          </div>
        )}
        {totalStars === 0 && <div style={{ height: 24 }} />}

        <div style={{
          display: "flex", gap: 12, justifyContent: "center", marginBottom: 44,
          flexWrap: "wrap", padding: "0 10px",
        }}>
          {CHOCOLATES.map((ch, i) => (
            <div key={i} style={{
              width: 64, height: 64, borderRadius: 16,
              background: `radial-gradient(circle at 50% 40%, ${ch.glow}10, #2a1810 70%)`,
              border: `2px solid ${ch.glow}30`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.4), 0 0 12px ${ch.glow}10`,
              animation: `floatY ${2.5 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
              overflow: "hidden", padding: 5,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              <img src={ch.img} alt={ch.name} draggable={false} style={{
                width: "100%", height: "100%", objectFit: "contain",
                borderRadius: 10, filter: "brightness(1.3) contrast(1.1) saturate(1.15)",
              }} />
            </div>
          ))}
        </div>

        <button className="btn-p" onClick={onPlay} style={{
          animation: "glowPulse 2.5s ease-in-out infinite",
          fontSize: "1.35rem", padding: "20px 72px", letterSpacing: 6,
          borderRadius: 60,
        }}>
          Jogar
        </button>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 24 }}>
          <button className="btn-g" onClick={onSettings} style={{ padding: "10px 24px" }}>⚙️ Definições</button>
          <button className="btn-g" onClick={onAbout} style={{ padding: "10px 24px" }}>🍫 Sobre</button>
        </div>

        <p style={{ fontSize: "0.5rem", color: "#2a1810", marginTop: 36, letterSpacing: 3, fontFamily: "'Inter', sans-serif" }}>
          Chocolate artesanal desde 2014
        </p>
      </div>
    </>
  );
}