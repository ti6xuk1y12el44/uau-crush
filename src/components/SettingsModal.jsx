export default function SettingsModal({ settings, setSettings, totalStars, maxLevel, onReset, onClose }) {
  const items = [
    { key: "haptics", label: "Vibração", desc: "Feedback ao combinar" },
    { key: "animations", label: "Animações", desc: "Partículas e efeitos" },
    { key: "showHints", label: "Dicas automáticas", desc: "Mostrar jogada após 60s" },
  ];

  return (
    <div className="modal-ov" onClick={onClose}>
      <div className="modal-bx" onClick={(e) => e.stopPropagation()}>
        <h3 className="gold" style={{ fontSize: "1.3rem", fontWeight: "bold", margin: "0 0 20px", textAlign: "center", letterSpacing: 2 }}>
          Definições
        </h3>

        {items.map((item) => (
          <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #2a1a0e" }}>
            <div>
              <div style={{ fontSize: "0.9rem", color: "#EDE0D0", fontWeight: "bold" }}>{item.label}</div>
              <div style={{ fontSize: "0.6rem", color: "#8B7355", marginTop: 2 }}>{item.desc}</div>
            </div>
            <div
              className="toggle-track"
              onClick={() => setSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
              style={{
                background: settings[item.key] ? "linear-gradient(135deg,#D4A843,#B8860B)" : "#1C0F08",
                border: `1px solid ${settings[item.key] ? "#D4A843" : "#3d2515"}`,
              }}
            >
              <div
                className="toggle-thumb"
                style={{
                  background: settings[item.key] ? "#FFF" : "#5a3a22",
                  transform: settings[item.key] ? "translateX(22px)" : "translateX(0)",
                }}
              />
            </div>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #2a1a0e", marginTop: 16, paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: "0.85rem", color: "#EDE0D0" }}>Progresso</span>
            <span style={{ fontSize: "0.7rem", color: "#8B7355" }}>{totalStars}⭐ • Nível {maxLevel + 1}</span>
          </div>
          <button
            className="btn-g"
            onClick={() => { if (confirm("Apagar todo o progresso?")) onReset(); }}
            style={{ width: "100%", color: "#E8443A", borderColor: "#5a2219", fontSize: "0.75rem", padding: 10, textAlign: "center" }}
          >
            Apagar progresso
          </button>
        </div>

        <button className="btn-g" onClick={onClose} style={{ width: "100%", marginTop: 12, textAlign: "center", padding: 10 }}>
          Fechar
        </button>
      </div>
    </div>
  );
}