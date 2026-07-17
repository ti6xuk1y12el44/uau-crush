export default function AboutModal({ onClose }) {
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal-bx" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: "3rem", marginBottom: 6 }}>🍫</div>
          <h3 style={{
            fontSize: "1.6rem", fontWeight: 900, color: "#FFD666", margin: "0 0 4px",
            fontFamily: "'Fredoka One', sans-serif",
          }}>UAU Cacau</h3>
          <p style={{
            fontSize: "0.7rem", color: "#FFBB77", letterSpacing: 4,
            textTransform: "uppercase", margin: 0, fontWeight: 700,
          }}>Desde 2014 • Ilha da Madeira</p>
        </div>

        {/* Story */}
        <div style={{
          background: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 16,
          marginBottom: 16, border: "1px solid #5c3520",
        }}>
          <p style={{
            fontSize: "0.85rem", color: "#FFCCAA", lineHeight: 1.7, textAlign: "center",
            fontFamily: "'Nunito', sans-serif", fontWeight: 600,
          }}>
            Fundada por Tony Fernandes, mestre chocolateiro, a UAU Cacau cria chocolate artesanal
            com sabores únicos da Madeira — maracujá, poncha, vinho, mel de cana, ginja e muito mais.
            Tudo sem corantes nem conservantes. 🌿
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { val: "50+", lbl: "Sabores", icon: "🍬" },
            { val: "🥇", lbl: "Premiado", icon: "" },
            { val: "100%", lbl: "Natural", icon: "🌱" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, background: "rgba(0,0,0,0.2)", borderRadius: 14, padding: 12,
              border: "1px solid #5c3520", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#FFD666", fontFamily: "'Fredoka One', sans-serif" }}>
                {item.val}
              </div>
              <div style={{ fontSize: "0.55rem", color: "#FFBB77", letterSpacing: 1, fontWeight: 700, marginTop: 2 }}>
                {item.lbl}
              </div>
            </div>
          ))}
        </div>

        {/* Locations */}
        <div style={{
          background: "rgba(0,0,0,0.2)", borderRadius: 14, padding: 14,
          marginBottom: 16, border: "1px solid #5c3520",
        }}>
          <div style={{
            fontSize: "0.6rem", color: "#FFBB77", letterSpacing: 2,
            textTransform: "uppercase", marginBottom: 8, fontWeight: 700,
          }}>📍 Onde visitar</div>
          <div style={{ fontSize: "0.8rem", color: "#FFCCAA", lineHeight: 1.7, fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
            Rua da Queimada de Baixo, 11 — Funchal<br />
            Mercado dos Lavradores, Loja 19
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <a href="https://uaucacau.com" target="_blank" rel="noopener noreferrer" style={{
            flex: 1, textAlign: "center", padding: "10px", borderRadius: 14,
            background: "linear-gradient(180deg, #FF8C42, #E85D26)", color: "#FFF",
            textDecoration: "none", fontWeight: 800, fontSize: "0.8rem",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 3px 0 #9C3310",
          }}>🌐 Website</a>
          <a href="https://instagram.com/uaucacau.pt" target="_blank" rel="noopener noreferrer" style={{
            flex: 1, textAlign: "center", padding: "10px", borderRadius: 14,
            background: "linear-gradient(180deg, #E056A0, #C2185B)", color: "#FFF",
            textDecoration: "none", fontWeight: 800, fontSize: "0.8rem",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 3px 0 #7B1042",
          }}>📸 Instagram</a>
        </div>

        <button className="btn-g" onClick={onClose} style={{ width: "100%", textAlign: "center", padding: 12 }}>
          Fechar
        </button>
      </div>
    </div>
  );
}