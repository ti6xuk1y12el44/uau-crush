import { useState } from "react";
import { submitScore } from "../engine/supabase";

export default function SubmitScore({ score, level, levelName, stars, onDone }) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const trimmed = name.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    await submitScore(trimmed, score, level, levelName, stars);
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div style={{
        background: "rgba(74,224,122,0.1)", border: "1px solid rgba(74,224,122,0.25)",
        borderRadius: 16, padding: "12px 16px", textAlign: "center", marginBottom: 16,
      }}>
        <div style={{ fontSize: "0.85rem", color: "#7AE07A", fontWeight: 800 }}>
          ✅ Score submetido!
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(0,0,0,0.2)", border: "1px solid #5c3520",
      borderRadius: 16, padding: "14px 16px", marginBottom: 16,
    }}>
      <div style={{
        fontSize: "0.7rem", color: "#FFBB77", fontWeight: 700,
        letterSpacing: 2, textTransform: "uppercase", marginBottom: 8, textAlign: "center",
      }}>
        🏆 Entrar no Ranking
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="O teu nome..."
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 20))}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          maxLength={20}
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 12,
            border: "2px solid #5c3520", background: "rgba(0,0,0,0.3)",
            color: "#FFF8F0", fontSize: "0.9rem", fontWeight: 700,
            fontFamily: "'Nunito', sans-serif", outline: "none",
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!name.trim() || submitting}
          style={{
            padding: "10px 18px", borderRadius: 12, border: "none",
            background: name.trim()
              ? "linear-gradient(180deg, #FF8C42, #E85D26)"
              : "#3a1e10",
            color: name.trim() ? "#FFF" : "#5c3520",
            fontWeight: 800, fontSize: "0.85rem", cursor: name.trim() ? "pointer" : "default",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: name.trim() ? "0 3px 0 #9C3310" : "none",
            transition: "all 0.2s",
          }}
        >
          {submitting ? "..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}