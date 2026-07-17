import { CHOCOLATES } from "../constants/chocolates";

export default function Piece({ type, r, c, cellSize, gapSize, isSelected, isDragging, dragOffset, isMatched, isNew, isHint, onPointerDown }) {
  const ch = CHOCOLATES[type];
  if (!ch) return null;

  const CELL = cellSize;
  const GAP = gapSize;
  const x = c * (CELL + GAP);
  const y = r * (CELL + GAP);
  const dotSize = Math.max(6, Math.round(CELL * 0.15));
  const radius = Math.max(8, Math.round(CELL * 0.22));

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
          ? "3px solid #FFF"
          : isHint
            ? "3px solid #4AE07A"
            : `2px solid ${ch.glow}35`,
        boxShadow: isDragging
          ? `0 14px 44px rgba(0,0,0,0.7), 0 0 28px ${ch.glow}90`
          : isSelected
            ? `0 0 20px ${ch.glow}, 0 0 40px ${ch.glow}50`
            : isHint
              ? "0 0 18px #4AE07A80"
              : `0 4px 12px rgba(0,0,0,0.35), 0 0 6px ${ch.glow}08`,
        zIndex: isDragging ? 100 : isSelected ? 10 : 1,
        animationDelay: isNew ? `${c * 0.04}s` : "0s",
        overflow: "hidden",
        padding: Math.max(2, Math.round(CELL * 0.05)),
        background: `radial-gradient(circle at 50% 40%, ${ch.glow}12 0%, #2a1a10 60%, #221510 100%)`,
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
          filter: "brightness(1.25) contrast(1.1) saturate(1.15)",
        }}
      />
      <div style={{
        position: "absolute",
        bottom: 2, right: 2,
        width: dotSize, height: dotSize,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${ch.glow} 40%, ${ch.glow}60 100%)`,
        opacity: 0.85,
        boxShadow: `0 0 ${dotSize}px ${ch.glow}80`,
        pointerEvents: "none",
        border: "1px solid rgba(0,0,0,0.3)",
      }} />
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, height: "35%",
        borderRadius: `${radius}px ${radius}px 50% 50%`,
        background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}