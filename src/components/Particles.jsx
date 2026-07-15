export default function Particles({ particles }) {
  return particles.map((p) => (
    <div
      key={p.id}
      style={{
        position: "absolute",
        left: p.x,
        top: p.y,
        width: p.size,
        height: p.size,
        borderRadius: "50%",
        background: p.color,
        pointerEvents: "none",
        zIndex: 200,
        opacity: 0.9,
        animation: `particle${p.dir} ${p.duration}s ease-out forwards`,
      }}
    />
  ));
}