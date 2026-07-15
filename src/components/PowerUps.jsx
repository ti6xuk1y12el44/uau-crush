export default function PowerUps({ powers, onUse, disabled }) {
  const items = [
    { key: "destroy", icon: "💥", label: "Tablete", desc: "Remove 1 peça" },
    { key: "shuffle", icon: "🔀", label: "Baralhar", desc: "Baralha tudo" },
    { key: "bomb", icon: "🔥", label: "Choco Quente", desc: "Limpa 1 tipo" },
  ];

  return (
    <div style={{
      display: "flex", gap: 10, marginTop: 12, justifyContent: "center",
    }}>
      {items.map((item) => {
        const count = powers[item.key] || 0;
        const canUse = count > 0 && !disabled;
        return (
          <button
            key={item.key}
            onClick={() => canUse && onUse(item.key)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 2, padding: "8px 14px", borderRadius: 16,
              background: canUse
                ? "linear-gradient(145deg, rgba(42,24,16,0.8), rgba(26,14,8,0.6))"
                : "rgba(13,7,5,0.4)",
              border: canUse ? "1px solid #3d2515" : "1px solid #1a0e0830",
              cursor: canUse ? "pointer" : "default",
              opacity: canUse ? 1 : 0.35,
              transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
              position: "relative",
              minWidth: 72,
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
            <span style={{ fontSize: "0.55rem", color: "#C9B89A", letterSpacing: 0.5, fontWeight: 600 }}>
              {item.label}
            </span>
            {/* Counter badge */}
            <div style={{
              position: "absolute", top: -4, right: -4,
              width: 20, height: 20, borderRadius: "50%",
              background: count > 0
                ? "linear-gradient(135deg, #D4A843, #B8860B)"
                : "#1a0e08",
              border: "1px solid #2a1a0e",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.6rem", fontWeight: 700,
              color: count > 0 ? "#1a0e05" : "#3d2515",
            }}>
              {count}
            </div>
          </button>
        );
      })}
    </div>
  );
}