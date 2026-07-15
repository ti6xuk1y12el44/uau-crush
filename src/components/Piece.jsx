import { CHOCOLATES } from "../constants/chocolates";
import { CELL, GAP } from "../constants/levels";

export default function Piece({ type, r, c, isSelected, isDragging, dragOffset, isMatched, isNew, isHint, onPointerDown }) {
  const ch = CHOCOLATES[type];
  if (!ch) return null;

  const x = c * (CELL + GAP);
  const y = r * (CELL + GAP);

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
        borderRadius: 14,
        border: isSelected ? "3px solid #FFF" : isHint ? "3px solid #4AE07A" : `2px solid ${ch.border}55`,
        boxShadow: isDragging
          ? `0 14px 44px rgba(0,0,0,0.7), 0 0 24px ${ch.glow}90`
          : isSelected
            ? `0 0 20px ${ch.glow}, 0 0 36px ${ch.glow}60`
            : isHint
              ? "0 0 18px #4AE07A80"
              : `0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
        zIndex: isDragging ? 100 : isSelected ? 10 : 1,
        animationDelay: isNew ? `${c * 0.04}s` : "0s",
        overflow: "hidden",
        padding: 4,
        background: "linear-gradient(145deg, #3a2518 0%, #2a1810 50%, #1e100a 100%)",
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
          borderRadius: 10,
          pointerEvents: "none",
          filter: "brightness(1.15) contrast(1.1)",
        }}
      />
    </div>
  );
}