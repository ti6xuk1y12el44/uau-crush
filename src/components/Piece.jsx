import { CHOCOLATES } from "../constants/chocolates";

export default function Piece({ type, r, c, cellSize, gapSize, isSelected, isDragging, dragOffset, isMatched, isNew, isHint, onPointerDown }) {
  const ch = CHOCOLATES[type];
  if (!ch) return null;

  const CELL = cellSize;
  const GAP = gapSize;
  const x = c * (CELL + GAP);
  const y = r * (CELL + GAP);
  const radius = Math.max(6, Math.round(CELL * 0.18));
  const isSmall = CELL < 50;

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
          ? "2px solid #FFE082"
          : isHint
            ? "2px solid #7AE07A"
            : `1.5px solid ${ch.glow}40`,
        boxShadow: isDragging
          ? `0 12px 32px rgba(0,0,0,0.6), 0 0 24px ${ch.glow}80`
          : isSelected
            ? `0 0 20px ${ch.glow}90, 0 3px 6px rgba(0,0,0,0.3)`
            : isHint
              ? `0 0 16px #7AE07A80, 0 3px 6px rgba(0,0,0,0.3)`
              : `0 3px 6px rgba(0,0,0,0.35)`,
        zIndex: isDragging ? 100 : isSelected ? 10 : 1,
        animationDelay: isNew ? `${c * 0.05}s` : "0s",
        overflow: "hidden",
        padding: isSmall ? 1 : 2,
        background: `
          radial-gradient(circle at 40% 30%, ${ch.glow}20 0%, transparent 60%),
          linear-gradient(145deg, #4a2818 0%, #3a1e10 100%)
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
          objectFit: "cover",
          borderRadius: Math.max(4, radius - 2),
          pointerEvents: "none",
          filter: "brightness(1.35) contrast(1.15) saturate(1.2)",
        }}
      />
      {/* Shine - só no desktop */}
      {!isSmall && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: "35%",
          borderRadius: `${radius}px ${radius}px 50% 50%`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}