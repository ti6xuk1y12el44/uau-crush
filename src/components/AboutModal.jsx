export default function AboutModal({ onClose }) {
  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal-bx" onClick={(e) => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 4 }}>🍫</div>
          <h3 className="gold" style={{ fontSize: "1.3rem", fontWeight: "bold", margin: "0 0 4px", letterSpacing: 2 }}>UAU Cacau</h3>
          <p style={{ fontSize: "0.6rem", color: "#8B7355", letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>Desde 2014 • Ilha da Madeira</p>
        </div>

        <p style={{ fontSize: "0.78rem", color: "#C9B89A", lineHeight: 1.6, marginBottom: 16, textAlign: "center" }}>
          Chocolate artesanal com sabores típicos da Madeira — maracujá, poncha, vinho Madeira, mel de cana, ginja, banana e pitanga. Sem corantes nem conservantes.
        </p>

        <div style={{ background: "rgba(18,9,4,0.6)", borderRadius: 12, padding: 14, marginBottom: 16, border: "1px solid #2a1a0e" }}>
          <div style={{ fontSize: "0.65rem", color: "#8B7355", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Onde visitar</div>
          <div style={{ fontSize: "0.78rem", color: "#EDE0D0", lineHeight: 1.5 }}>
            📍 Rua da Queimada de Baixo, Funchal<br />
            📍 Mercado dos Lavradores, Loja 19
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            { val: "50+", lbl: "REFERÊNCIAS" },
            { val: "🥇", lbl: "MARACUJÁ" },
            { val: "100%", lbl: "NATURAL" },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: "rgba(18,9,4,0.6)", borderRadius: 10, padding: 10, border: "1px solid #2a1a0e", textAlign: "center" }}>
              <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#F2C94C" }}>{item.val}</div>
              <div style={{ fontSize: "0.5rem", color: "#8B7355", letterSpacing: 1 }}>{item.lbl}</div>
            </div>
          ))}
        </div>

        <button className="btn-g" onClick={onClose} style={{ width: "100%", textAlign: "center", padding: 10 }}>Fechar</button>
      </div>
    </div>
  );
}