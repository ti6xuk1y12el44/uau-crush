import { useEffect, useState } from "react";

const COLORS = ["#FFD666", "#FF8C42", "#E85D26", "#FF6B6B", "#7AE07A", "#FF69B4", "#4FC3F7", "#FFF176"];

function randomPiece() {
  return {
    id: Math.random(),
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    size: 6 + Math.random() * 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  };
}

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    const p = Array.from({ length: 60 }, randomPiece);
    setPieces(p);
    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, [active]);

  if (pieces.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000, overflow: "hidden" }}>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-5%",
            width: p.shape === "circle" ? p.size : p.size * 0.6,
            height: p.size,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            background: p.color,
            opacity: 0.9,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          25% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}