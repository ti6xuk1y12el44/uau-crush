import { useState } from "react";

const STEPS = [
  { emoji: "👆", title: "Arrasta", text: "Arrasta um chocolate para cima, baixo, esquerda ou direita para trocá-lo com o vizinho." },
  { emoji: "🍫🍫🍫", title: "Combina 3+", text: "Junta 3 ou mais chocolates iguais em linha e eles desaparecem!" },
  { emoji: "⭐", title: "Ganha Estrelas", text: "Atinge o objetivo de pontos para ganhar até 3 estrelas por nível." },
  { emoji: "💥", title: "Power-ups", text: "Usa a Tablete para destruir 1 peça, o Baralhar para misturar tudo, ou o Choco Quente para eliminar um tipo inteiro." },
  { emoji: "🗺️", title: "Viaja pela Madeira", text: "Cada nível é uma localidade da ilha. Desbloqueia todas!" },
];

export default function Tutorial({ onClose }) {
  const [step, setStep] = useState(0);
  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(20,8,4,0.94)",
      zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{
        background: "linear-gradient(170deg, #5c3520, #3a1e10)",
        borderRadius: 28, padding: "32px 28px", maxWidth: 340, width: "90%",
        border: "3px solid #8B5E3C", textAlign: "center",
        boxShadow: "0 0 0 3px #2e120c, 0 24px 48px rgba(0,0,0,0.5)",
        animation: "modalFade 0.3s ease both",
      }}>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i === step ? "#FFD666" : i < step ? "#FF8C42" : "#3a1e10",
              border: "1px solid #5c3520",
              transition: "all 0.3s",
            }} />
          ))}
        </div>

        <div style={{ fontSize: "3rem", marginBottom: 12 }}>{s.emoji}</div>
        <h3 style={{
          fontSize: "1.4rem", fontWeight: 900, color: "#FFD666", margin: "0 0 8px",
          fontFamily: "'Fredoka One', sans-serif",
        }}>{s.title}</h3>
        <p style={{
          fontSize: "0.9rem", color: "#FFCCAA", lineHeight: 1.6, marginBottom: 24,
          fontFamily: "'Nunito', sans-serif", fontWeight: 600,
        }}>{s.text}</p>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {step > 0 && (
            <button className="btn-g" onClick={() => setStep(step - 1)} style={{ padding: "10px 20px" }}>
              ← Anterior
            </button>
          )}
          <button className="btn-p" onClick={() => {
            if (isLast) onClose();
            else setStep(step + 1);
          }} style={{ padding: "12px 32px", fontSize: "1rem" }}>
            {isLast ? "Jogar! 🎮" : "Seguinte →"}
          </button>
        </div>

        {!isLast && (
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#7a4a30",
            cursor: "pointer", marginTop: 16, fontSize: "0.75rem",
            fontFamily: "'Nunito', sans-serif", fontWeight: 700,
          }}>
            Saltar tutorial
          </button>
        )}
      </div>
    </div>
  );
}