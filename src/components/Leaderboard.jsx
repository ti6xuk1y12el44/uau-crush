import { useState, useEffect } from "react";
import { getLeaderboard } from "../engine/supabase";

export default function Leaderboard({ onClose }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard(100).then((data) => {
      setScores(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal-bx" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420, maxHeight: "85vh", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: "2rem", marginBottom: 4 }}>🏆</div>
          <h3 style={{
            fontSize: "1.5rem", fontWeight: 900, color: "#FFD666", margin: "0 0 4px",
            fontFamily: "'Fredoka One', sans-serif",
          }}>Top 100</h3>
          <p style={{ fontSize: "0.65rem", color: "#FFBB77", letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
            Melhores jogadores
          </p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", marginBottom: 12 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: "#FFBB77", fontSize: "0.9rem", fontWeight: 700 }}>
              A carregar... 🍫
            </div>
          ) : scores.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#A06030", fontSize: "0.85rem", fontWeight: 700 }}>
              Ainda não há scores. Sê o primeiro!
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {scores.map((s, i) => {
                const isTop3 = i < 3;
                const medals = ["🥇", "🥈", "🥉"];
                return (
                  <div key={s.id} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 12px", borderRadius: 14,
                    background: isTop3
                      ? `rgba(255,${200 - i * 40},${60 - i * 20},0.12)`
                      : "rgba(0,0,0,0.15)",
                    border: isTop3 ? `1px solid rgba(255,${200 - i * 40},60,0.25)` : "1px solid #3a1e10",
                  }}>
                    {/* Position */}
                    <div style={{
                      width: 32, textAlign: "center",
                      fontSize: isTop3 ? "1.3rem" : "0.85rem",
                      fontWeight: 900,
                      color: isTop3 ? "#FFD666" : "#A06030",
                      fontFamily: "'Fredoka One', sans-serif",
                    }}>
                      {isTop3 ? medals[i] : i + 1}
                    </div>

                    {/* Name + level */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: "0.85rem", fontWeight: 800, color: "#FFF8F0",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {s.player_name}
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "#A06030", fontWeight: 600 }}>
                        {s.level_name} {"⭐".repeat(s.stars)}
                      </div>
                    </div>

                    {/* Score */}
                    <div style={{
                      fontSize: isTop3 ? "1.1rem" : "0.95rem",
                      fontWeight: 900, color: "#FFD666",
                      fontFamily: "'Fredoka One', sans-serif",
                    }}>
                      {s.score.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button className="btn-g" onClick={onClose} style={{ width: "100%", textAlign: "center", padding: 12 }}>
          Fechar
        </button>
      </div>
    </div>
  );
}