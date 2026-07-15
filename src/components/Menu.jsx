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

      <div style={{ textAlign: "center", zIndex: 1, maxWidth: 500 }}>
        {/* Logo area */}
        <div style={{
          width: 80, height: 80, margin: "0 auto 16px",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #3a2518, #2a1810)",
          border: "2px solid #D4A84340",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(212,168,67,0.1)",
          fontSize: "2.8rem",
        }}>🍫</div>

        <h1 className="gold" style={{ fontSize: "3.2rem", fontWeight: 900, letterSpacing: 6, margin: "0 0 4px" }}>
          UAU CRUSH
        </h1>
        <div style={{
          width: 60, height: 2, margin: "0 auto 8px",
          background: "linear-gradient(90deg, transparent, #D4A843, transparent)",
        }} />
        <p style={{ fontSize: "0.7rem", letterSpacing: 10, textTransform: "uppercase", color: "#8B7355", margin: "0 0 6px", fontFamily: "'Inter', sans-serif" }}>
          by Uau Cacau
        </p>
        <p style={{ fontSize: "0.6rem", letterSpacing: 4, color: "#5a3a22", margin: "0 0 32px", fontFamily: "'Inter', sans-serif" }}>
          Ilha da Madeira 🏝️
        </p>

        {totalStars > 0 && (
          <div style={{
            display: "inline-block", padding: "6px 20px", borderRadius: 20,
            background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.15)",
            fontSize: "0.75rem", color: "#D4A843", marginBottom: 28, fontFamily: "'Inter', sans-serif",
          }}>
            ⭐ {totalStars} estrelas conquistadas
          </div>
        )}
        {totalStars === 0 && <div style={{ height: 20 }} />}

        {/* Chocolate showcase */}
        <div style={{
          display: "flex", gap: 8, justifyContent: "center", marginBottom: 40,
          flexWrap: "wrap", padding: "0 10px",
        }}>
          {CHOCOLATES.map((ch, i) => (
            <div key={i} style={{
              width: 56, height: 56, borderRadius: 14,
              background: "linear-gradient(145deg, #2a1810, #1e100a)",
              border: `2px solid ${ch.border}50`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.5), 0 0 12px ${ch.glow}15`,
              animation: `floatY ${2.5 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
              overflow: "hidden", padding: 3,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              <img src={ch.img} alt={ch.name} draggable={false} style={{
                width: "100%", height: "100%", objectFit: "contain",
                borderRadius: 10, filter: "brightness(1.2) contrast(1.1)",
              }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="btn-p" onClick={onPlay} style={{
          animation: "glowPulse 2.5s ease-in-out infinite",
          fontSize: "1.3rem", padding: "18px 64px", letterSpacing: 5,
        }}>
          Jogar
        </button>

        {/* Secondary buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="btn-g" onClick={onSettings}>⚙️ Definições</button>
          <button className="btn-g" onClick={onAbout}>🍫 Sobre</button>
        </div>

        <p style={{
          fontSize: "0.5rem", color: "#2a1810", marginTop: 32, letterSpacing: 3,
          fontFamily: "'Inter', sans-serif",
        }}>
          Chocolate artesanal desde 2014
        </p>
      </div>
    </>
  );
}