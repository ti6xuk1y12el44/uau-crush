import { CHOCOLATES } from "../constants/chocolates";

export default function Piece({ type, r, c, cellSize, gapSize, isSelected, isDragging, dragOffset, isMatched, isNew, isHint, onPointerDown }) {
  const ch = CHOCOLATES[type];
  if (!ch) return null;

  const CELL = cellSize;
  const GAP = gapSize;
  const x = c * (CELL + GAP);
  const y = r * (CELL + GAP);
  const radius = Math.max(10, Math.round(CELL * 0.2));
  const pad = Math.max(2, Math.round(CELL * 0.05));

  const classes = [
    "piece",
    isSelected && "selected",
    isDragging && "dragging",
    isMatched && "matched",
    isNew && "dropping",
    isHint && "hint-glow",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      onPointerDown={onPointerDown}
      style={{
        left: isDragging ? x + dragOffset.x : x,
        top: isDragging ? y + dragOffset.y : y,
        width: CELL,
        height: CELL,
        borderRadius: radius,
        border: isSelected
          ? "3px solid #FFE082"
          : isHint
            ? "3px solid #7AE07A"
            : `2px solid ${ch.glow}50`,
        boxShadow: isDragging
          ? `0 16px 40px rgba(0,0,0,0.6), 0 0 30px ${ch.glow}80`
          : isSelected
            ? `0 0 24px ${ch.glow}90, 0 4px 8px rgba(0,0,0,0.3), inset 0 0 8px ${ch.glow}30`
            : isHint
              ? `0 0 20px #7AE07A80, 0 4px 8px rgba(0,0,0,0.3)`
              : `0 4px 8px rgba(0,0,0,0.4), 0 1px 0 ${ch.glow}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
        zIndex: isDragging ? 100 : isSelected ? 10 : 1,
        animationDelay: isNew ? `${c * 0.05}s` : "0s",
        overflow: "hidden",
        padding: pad,
        background: `
          radial-gradient(circle at 40% 30%, ${ch.glow}18 0%, transparent 50%),
          linear-gradient(145deg, #4a2818 0%, #3a1e10 50%, #2e150c 100%)
        `,
      }}
    >
      <img
        src={ch.img}
        alt={ch.name}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: Math.max(6, radius - 4),
          pointerEvents: "none",
          filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
        }}
      />
      {/* Shine overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: "40%",
        borderRadius: `${radius}px ${radius}px 50% 50%`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      {/* Color indicator */}
      <div style={{
        position: "absolute",
        bottom: 2, right: 2,
        width: Math.max(7, Math.round(CELL * 0.14)),
        height: Math.max(7, Math.round(CELL * 0.14)),
        borderRadius: "50%",
        background: ch.glow,
        opacity: 0.9,
        boxShadow: `0 0 6px ${ch.glow}`,
        pointerEvents: "none",
        border: "1.5px solid rgba(0,0,0,0.3)",
      }} />
    </div>
  );
}