export default function PowerUps({ powers, onUse, disabled }) {
  const items = [
    { key: "destroy", icon: "💥", label: "Tablete" },
    { key: "shuffle", icon: "🔀", label: "Baralhar" },
    { key: "bomb", icon: "🔥", label: "Choco Quente" },
  ];

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center" }}>
      {items.map((item) => {
        const count = powers[item.key] || 0;
        const canUse = count > 0 && !disabled;
        return (
          <button
            key={item.key}
            onClick={() => canUse && onUse(item.key)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: 30,
              background: canUse
                ? "linear-gradient(145deg, rgba(42,24,16,0.8), rgba(26,14,8,0.6))"
                : "rgba(13,7,5,0.3)",
              border: canUse ? "1px solid #3d251540" : "1px solid #1a0e0820",
              cursor: canUse ? "pointer" : "default",
              opacity: canUse ? 1 : 0.3,
              transition: "all 0.2s",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
            <span style={{ fontSize: "0.6rem", color: "#A08B70", fontWeight: 600 }}>{item.label}</span>
            <span style={{
              fontSize: "0.6rem", fontWeight: 700,
              color: count > 0 ? "#D4A843" : "#3d2515",
              background: count > 0 ? "rgba(212,168,67,0.12)" : "transparent",
              padding: "2px 6px", borderRadius: 10,
              minWidth: 18, textAlign: "center",
            }}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}