import { useEffect, useRef } from "react";

const TechArt = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // taille initiale
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Résolution de référence pour le scale texte
    const BASE_WIDTH = 1920;
    const BASE_HEIGHT = 1080;

    const colors = {
      white: "#ffffff",
      offWhite: "#f5f5f5",
      black: "#1a1a1a",
      blue: "#4a9eff",
      lightBlue: "#85c1ff",
      darkBlue: "#2b5fa8",
      gray: "#666666",
      lightGray: "#d4d4d4",
      red: "#ff3838",
      darkRed: "#a82b2b",
    };

    // Tableau pour stocker les positions des carrés bleus
    let blueSquares = [];
    let frameCount = 0; // Compteur pour contrôler la vitesse

    // Fonctions de dessin
    function drawGrid() {
      ctx.strokeStyle = colors.lightGray + "80"; // Grille plus visible
      ctx.lineWidth = 1;
      const spacing = 40;

      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.fillStyle = colors.gray + "30";
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          if (Math.random() > 0.85) {
            ctx.fillRect(x - 1, y - 1, 2, 2);
          }
        }
      }

      // Gestion de la vitesse avec un compteur
      frameCount++;
      if (frameCount % 60 === 0) {
        const x =
          Math.floor(Math.random() * (canvas.width / (spacing * 4))) *
          (spacing * 4);
        const y =
          Math.floor(Math.random() * (canvas.height / (spacing * 4))) *
          (spacing * 4);
        blueSquares.push({ x, y, life: 120 }); // (2 secondes)
      }

      // Dessiner et mettre à jour les carrés bleus
      ctx.fillStyle = colors.blue + "40";
      ctx.filter = "blur(2px)";
      blueSquares = blueSquares.filter((square) => {
        if (square.life > 0) {
          ctx.fillRect(square.x, square.y, spacing, spacing);
          square.life--; // Réduire la durée de vie
          return true;
        }
        return false;
      });
      ctx.filter = "none";
    }

    function drawSkyBox() {
      const skyGradient = ctx.createLinearGradient(400, 100, 900, 400);
      skyGradient.addColorStop(0, colors.lightBlue + "dd");
      skyGradient.addColorStop(0.5, colors.blue + "cc");
      skyGradient.addColorStop(1, colors.darkBlue + "dd");

      ctx.fillStyle = skyGradient;
      ctx.fillRect(400, 100, 500, 300);

      ctx.fillStyle = colors.white + "40";
      ctx.filter = "blur(30px)";
      ctx.fillRect(480, 140, 120, 80);
      ctx.fillRect(650, 200, 150, 100);
      ctx.fillRect(550, 280, 100, 60);
      ctx.filter = "none";
    }

    function drawMainStructure() {
      ctx.save();

      ctx.strokeStyle = colors.black;
      ctx.lineWidth = 1;

      const lineCount = 100;
      const pulse = Math.sin(Date.now() / 500) * 50 + 100; // Pulsing effect
      for (let i = 0; i < lineCount; i++) {
        const angle = (Math.PI * 2 * i) / lineCount;
        const length = pulse + Math.sin(i * 0.5) * 300;
        const startRadius = 40;

        const x1 = centerX + Math.cos(angle) * startRadius;
        const y1 = centerY + Math.sin(angle) * startRadius;
        const x2 = centerX + Math.cos(angle) * length;
        const y2 = centerY + Math.sin(angle) * length;

        ctx.globalAlpha = 0.12 + Math.sin(i * 0.3) * 0.08;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }

    function drawBlackElements() {
      ctx.fillStyle = colors.black;
      ctx.fillRect(50, 250, 300, 20);
      ctx.fillRect(50, 350, 180, 120);
      ctx.fillRect(20, 150, 10, 180);
      ctx.fillRect(35, 150, 4, 180);
      ctx.fillRect(15, 50, 3, 100);
      ctx.fillRect(25, 50, 3, 100);
      ctx.fillRect(35, 50, 3, 100);
      ctx.fillRect(100, canvas.height - 150, 250, 15);
      ctx.fillRect(canvas.width - 350, canvas.height - 100, 200, 12);
    }

    function drawTechnicalLines() {
      ctx.strokeStyle = colors.black;
      ctx.lineWidth = 1;

      for (let i = 0; i < 12; i++) {
        const y = 80 + i * 45;
        ctx.beginPath();
        ctx.moveTo(200, y);
        ctx.lineTo(300, y);
        ctx.stroke();

        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(195, y - 3);
          ctx.lineTo(195, y + 3);
          ctx.moveTo(192, y);
          ctx.lineTo(198, y);
          ctx.stroke();
        }
      }

      ctx.strokeStyle = colors.black + "60";
      for (let i = 0; i < 15; i++) {
        const x = 100 + i * 80;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - 200);
        ctx.lineTo(x + 100, canvas.height - 50);
        ctx.stroke();
      }

      ctx.strokeStyle = colors.gray + "40";
      ctx.lineWidth = 0.5;
    }

    function drawFrames() {
      ctx.strokeStyle = colors.gray;
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(centerX - 280, centerY - 220, 560, 440);
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(centerX - 150, centerY - 120, 300, 240);
      ctx.strokeRect(canvas.width - 450, 120, 300, 250);
      ctx.setLineDash([]);
      ctx.strokeStyle = colors.black;
      ctx.strokeRect(220, 180, 100, 50);
      ctx.strokeRect(220, 250, 65, 30);
      ctx.strokeStyle = colors.gray + "80";
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.arc(canvas.width - 250, 300, 60, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(180, canvas.height - 180, 50, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawMarkers() {
      ctx.strokeStyle = colors.black;
      ctx.lineWidth = 1.5;

      const drawCross = (x, y, size) => {
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
        ctx.stroke();
      };

      const drawTarget = (x, y, size) => {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.stroke();
        drawCross(x, y, size / 3);
      };

      drawCross(centerX - 220, 120, 8);
      drawCross(centerX + 250, 140, 8);
      drawCross(200, canvas.height - 120, 8);
      drawCross(canvas.width - 200, 350, 8);
      drawTarget(canvas.width - 180, 280, 25);
      drawTarget(150, canvas.height - 200, 20);
    }

    function drawText() {
      const scale = Math.min(
        canvas.width / BASE_WIDTH,
        canvas.height / BASE_HEIGHT
      );

      ctx.fillStyle = colors.black;
      ctx.font = `bold ${100 * scale}px Arial, sans-serif`;
      const text = "GENERATIVE ART";
      const x = 50;
      const y = centerY + 140;
      ctx.fillText(text, x, y + 50);

      ctx.fillStyle = colors.black;
      ctx.font = `bold ${68 * scale}px Arial, sans-serif`;
      ctx.fillText("NEXUS.", 420, 80);

      ctx.font = `${11 * scale}px Arial, sans-serif`;
      ctx.fillStyle = colors.gray;

      const labels = [
        { text: "A", x: 80, y: 30 },
        { text: "B", x: centerX - 20, y: 40 },
        { text: "F", x: canvas.width - 100, y: 30 },
        { text: "G", x: canvas.width - 150, y: canvas.height - 50 },
        { text: "C", x: 120, y: canvas.height - 80 },
        { text: "D", x: centerX - 50, y: canvas.height - 60 },
      ];

      ctx.font = `${14 * scale}px Arial, sans-serif`;
      labels.forEach(({ text, x, y }) => {
        ctx.fillText(text, x, y);
      });

      ctx.font = `${10 * scale}px Courier New, monospace`;
      ctx.fillStyle = colors.black;
      ctx.fillText("01", 70, 170);
      ctx.fillText("02", 70, 250);
      ctx.fillText("03", 235, 205);
      ctx.fillText("26", canvas.width - 130, canvas.height - 100);

      ctx.font = `${11 * scale}px Arial, sans-serif`;
      ctx.fillStyle = colors.gray;
      ctx.fillText("2 × 0.618", centerX + 80, 50);
      ctx.fillText("φ 1.618033988", 90, 80);
      ctx.fillText("PARAMETER", 90, 380);
      ctx.fillText("CHANGE", 90, 395);
      ctx.fillText("ERROR", 90, 410);

      ctx.font = `${9 * scale}px Arial, sans-serif`;
      for (let year = 2008; year <= 2026; year += 2) {
        const x = 100 + (year - 2008) * 80;
        if (x < canvas.width - 200) {
          ctx.fillText(year.toString(), x, canvas.height - 70);
        }
      }

      ctx.font = `${10 * scale}px Arial, sans-serif`;
      const rightText = [
        "SYNTHESIS",
        "CORE.",
        "",
        "vector analysis",
        "",
        "dimensional flow",
      ];

      rightText.forEach((line, i) => {
        ctx.fillText(line, canvas.width - 180, 120 + i * 15);
      });

      ctx.strokeStyle = colors.black;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 100; i++) {
        const x = canvas.width - 180 + i;
        const y = 180 + Math.sin(i * 0.3) * 8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    function drawTechBlueprint() {
      ctx.save();
      ctx.strokeStyle = colors.gray;
      ctx.lineWidth = 1;
      ctx.restore();
    }

    function drawJapaneseStyleAboveImage() {
      ctx.save();
      ctx.fillStyle = colors.black;

      const imgX = canvas.width - 450;
      const imgY = canvas.height - 300;
      const topY = imgY - 300;

      ctx.font = "bold 20px 'Arial', sans-serif";
      ctx.fillText("龍", imgX + 50, topY + 100);
      ctx.fillText("風", imgX + 200, topY + 200);
      ctx.fillText("山", imgX + 300, topY + 150);

      const img4 = new Image();
      img4.crossOrigin = "anonymous";
      img4.src =
        "https://res.cloudinary.com/do22snhzp/image/upload/v1759746261/7451ae729eaab0de2b10e7408cf71ffb-removebg-preview_rqh4z6.png";
      const img5 = new Image();
      img5.crossOrigin = "anonymous";
      img5.src =
        "https://res.cloudinary.com/do22snhzp/image/upload/v1759746325/6a7f81213c340d6e57bc0df277c83d0e-removebg-preview_irvvzg.png";

      if (img4.complete && img5.complete) {
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img4, imgX + 50, imgY - 150, 150, 150);
        ctx.drawImage(img5, imgX + 220, imgY - 150, 150, 150);
        ctx.globalAlpha = 1;
      }

      ctx.restore();
    }

    // Animation loop
    function animate() {
      ctx.fillStyle = colors.offWhite + "ef";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawSkyBox();
      drawBlackElements();
      drawTechnicalLines();
      drawMainStructure();
      drawFrames();
      drawMarkers();
      drawText();
      drawTechBlueprint();
      drawJapaneseStyleAboveImage();

      if (img1 && img1.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img1, canvas.width - 450, canvas.height - 300, 400, 300);
        ctx.restore();
      }
      if (img2 && img2.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img2, canvas.width - 190, 0, 150, 150);
        ctx.restore();
      }
      if (img3 && img3.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img3, 20, canvas.height - 220, 200, 200);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    // Images
    const img1 = new Image();
    img1.crossOrigin = "anonymous";
    img1.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759740352/8d3f7c1307bf706f50281ecd763b7ba1-removebg-preview_qt6ds8.png";
    const img2 = new Image();
    img2.crossOrigin = "anonymous";
    img2.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759740519/3ce80b0d86a83604d7995677c0a48fb9-removebg-preview_z3zzj9.png";
    const img3 = new Image();
    img3.crossOrigin = "anonymous";
    img3.src =
      "https://res.cloudinary.com/do22snhzp/image/upload/v1759742771/77c85d5515d1e26310f1f096b61ad76f-removebg-preview_m0x1gm.png";
    const images = [img1, img2, img3];
    let loadedImages = 0;
    images.forEach((img) => {
      img.onload = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          animate();
        }
      };
      img.onerror = () => {
        console.error(
          "One of the images failed to load, starting animation without it"
        );
        loadedImages++;
        if (loadedImages === images.length) {
          animate();
        }
      };
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="full-screen-canvas" />;
};

export default TechArt;
