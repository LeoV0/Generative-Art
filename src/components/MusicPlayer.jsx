import { useState, useRef, useEffect } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVertical, setIsVertical] = useState(false); // Pour le mode responsive
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audioRef.current.play();
      animateWave();
    }
    setIsPlaying(!isPlaying);
  };

  const animateWave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const time = Date.now() / 200;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x++) {
      const y = height / 2 + Math.sin(x * 0.3 + time) * 5;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    animationRef.current = requestAnimationFrame(animateWave);
  };

  // Ondulation statique au départ
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    for (let x = 0; x < width; x++) {
      ctx.lineTo(x, height / 2);
    }
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  // Responsive : bascule en colonne si l'écran est petit
  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 500); // seuil à ajuster si nécessaire
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        right: 220,
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        gap: 4,
        background: "rgba(255,255,255,0.65)",
        padding: "6px 10px",
        borderRadius: 8,
        border: "1px solid rgba(0,0,0,0.2)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Pochette avec icône play/pause */}
      <div style={{ position: "relative" }}>
        <img
          src="/SonicCD.jpg"
          alt="Cover"
          style={{ width: 80, height: 80, borderRadius: 8 }}
        />
        <button
          onClick={togglePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>

      {/* Ondulateur */}
      <canvas
        ref={canvasRef}
        width={100}
        height={40}
        style={{
          background: "transparent",
          marginLeft: isVertical ? 0 : 2,
          marginTop: isVertical ? 4 : 0,
        }}
      />

      {/* Titre */}
      <span
        style={{
          fontWeight: "bold",
          fontSize: 13,
          color: "black",
          marginLeft: isVertical ? 0 : 4,
          marginTop: isVertical ? 4 : 0,
          textAlign: isVertical ? "center" : "left",
        }}
      >
        Boards of Canada - Roygbiv
      </span>

      <audio ref={audioRef} src="/music/BoardsofCanada.mp3" preload="auto" />
    </div>
  );
};

export default MusicPlayer;
