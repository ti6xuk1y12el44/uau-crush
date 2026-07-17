import { CHOCOLATES } from "../constants/chocolates";

export default function Menu({ totalStars, onPlay, onSettings, onAbout }) {
  return (
    <>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(25)].map((_, i) => (
          <div key={i} className="amb" style={{
            width: 3 + Math.random() * 5, height: 3 + Math.random() * 5,
            background: i % 3 === 0 ? "#FFD666" : i % 3 === 1 ? "#FF8C42" : "#FFA060",
            opacity: 0.04 + Math.random() * 0.06,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animation: `floatY ${3 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }} />
        ))}
      </div>

      <div style={{ textAlign: "center", zIndex: 1, maxWidth: 500 }}>
        {/* Logo */}
        <div style={{
          width: 100, height: 100, margin: "0 auto 16px",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #6B3A1E, #4a2818)",
          border: "4px solid #8B5E3C",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 0 3px #2e120c, 0 8px 24px rgba(0,0,0,0.4), 0 0 30px rgba(255,200,60,0.1)",
          fontSize: "3.2rem",
        }}>🍫</div>

        <h1 className="gold" style={{
          fontSize: "3.5rem", fontWeight: 900, letterSpacing: 4, margin: "0 0 4px",
          fontFamily: "'Fredoka One', sans-serif",
        }}>
          UAU CRUSH
        </h1>
        <p style={{
          fontSize: "0.85rem", letterSpacing: 6, textTransform: "uppercase",
          color: "#FFBB77", margin: "0 0 4px",
          fontWeight: 700, textShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}>
          by Uau Cacau
        </p>
        <p style={{
          fontSize: "0.7rem", letterSpacing: 4, color: "#A06030",
          margin: "0 0 32px", fontWeight: 600,
        }}>
          Ilha da Madeira 🏝️
        </p>

        {totalStars > 0 && (
          <div style={{
            display: "inline-block", padding: "8px 24px", borderRadius: 30,
            background: "linear-gradient(180deg, #5c3520, #4a2818)",
            border: "2px solid #7a4a30",
            fontSize: "0.85rem", color: "#FFD08A", marginBottom: 28,
            fontWeight: 700, boxShadow: "0 3px 0 #2e1a0e, 0 4px 8px rgba(0,0,0,0.2)",
          }}>
            ⭐ {totalStars} estrelas
          </div>
        )}
        {totalStars === 0 && <div style={{ height: 20 }} />}

        {/* Chocolate showcase */}
        <div style={{
          display: "flex", gap: 10, justifyContent: "center", marginBottom: 40,
          flexWrap: "wrap", padding: "0 10px",
        }}>
          {CHOCOLATES.map((ch, i) => (
            <div key={i} style={{
              width: 58, height: 58, borderRadius: 14,
              background: `
                radial-gradient(circle at 40% 30%, ${ch.glow}20, transparent 60%),
                linear-gradient(145deg, #4a2818, #3a1e10)
              `,
              border: `2px solid ${ch.glow}40`,
              boxShadow: `0 4px 8px rgba(0,0,0,0.3), 0 0 8px ${ch.glow}10`,
              animation: `floatY ${2.5 + i * 0.35}s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
              overflow: "hidden", padding: 4,
            }}>
              <img src={ch.img} alt={ch.name} draggable={false} style={{
                width: "100%", height: "100%", objectFit: "contain",
                borderRadius: 10, filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
              }} />
            </div>
          ))}
        </div>

        {/* Play button */}
        <button className="btn-p" onClick={onPlay} style={{
          animation: "glowPulse 2s ease-in-out infinite",
          fontSize: "1.5rem", padding: "18px 80px", letterSpacing: 4,
        }}>
          JOGAR
        </button>

        {/* Secondary buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
          <button className="btn-g" onClick={onSettings}>⚙️ Definições</button>
          <button className="btn-g" onClick={onAbout}>🍫 Sobre</button>
        </div>
      </div>
    </>
  );
}