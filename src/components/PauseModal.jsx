export default function PauseModal({ level, levelConf, score, moves, onResume, onRestart, onExit }) {
  return (
    <div className="modal-ov" onClick={onResume}>
      <div className="modal-bx" onClick={(e) => e.stopPropagation()}>
        <h3 className="gold" style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 0 4px", textAlign: "center", letterSpacing: 2 }}>Pausa</h3>
        <p className="lbl" style={{ margin: "0 0 20px", textAlign: "center", letterSpacing: 5 }}>
          Nível {level + 1} — {levelConf.label}
        </p>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: "0.5rem", color: "#8B7355" }}>PONTOS</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#F2C94C" }}>{score}</div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontSize: "0.5rem", color: "#8B7355" }}>JOGADAS</div>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#EDE0D0" }}>{moves}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button className="btn-p" onClick={onResume} style={{ width: "100%", padding: 12, textAlign: "center" }}>Continuar</button>
          <button className="btn-g" onClick={onRestart} style={{ width: "100%", textAlign: "center", padding: 10 }}>Recomeçar</button>
          <button className="btn-g" onClick={onExit} style={{ width: "100%", textAlign: "center", padding: 10 }}>Sair</button>
        </div>
      </div>
    </div>
  );
}