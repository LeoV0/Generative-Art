import React, { useEffect, useRef } from "react";

const TechArt = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Grille technique subtile
    function drawGrid() {
      ctx.strokeStyle = colors.lightGray + "40";
      ctx.lineWidth = 0.5;
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
    }

    // Zone bleue abstraite avec dégradé doux
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

    // Structure centrale fluide et organique avec pulsation
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

    // Éléments techniques noirs
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

    // Lignes techniques partout
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
      // const points = [
      //   [100, 100],
      //   [canvas.width - 100, 100],
      //   [100, canvas.height - 100],
      //   [canvas.width - 100, canvas.height - 100],
      // ];

      // Supprimé les lignes diagonales vers le centre
      // points.forEach(([x, y]) => {
      //   ctx.beginPath();
      //   ctx.moveTo(x, y);
      //   ctx.lineTo(centerX, centerY);
      //   ctx.stroke();
      // });
    }

    // Cadres et rectangles
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

    // Croix et marqueurs
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

    // Annotations et texte
    function drawText() {
      ctx.fillStyle = colors.black;
      ctx.font = "bold 68px Arial, sans-serif";
      ctx.fillText("NEXUS", 420, 80);

      ctx.font = "11px Arial, sans-serif";
      ctx.fillStyle = colors.gray;

      const labels = [
        { text: "A", x: 80, y: 30 },
        { text: "B", x: centerX - 20, y: 40 },
        { text: "F", x: canvas.width - 100, y: 30 },
        { text: "G", x: canvas.width - 150, y: canvas.height - 50 },
        { text: "C", x: 120, y: canvas.height - 80 },
        { text: "D", x: centerX - 50, y: canvas.height - 60 },
      ];

      ctx.font = "14px Arial, sans-serif";
      labels.forEach(({ text, x, y }) => {
        ctx.fillText(text, x, y);
      });

      ctx.font = "10px Courier New, monospace";
      ctx.fillStyle = colors.black;
      ctx.fillText("01", 70, 170);
      ctx.fillText("02", 70, 250);
      ctx.fillText("03", 235, 205);
      ctx.fillText("26", canvas.width - 130, canvas.height - 100);

      ctx.font = "11px Arial, sans-serif";
      ctx.fillStyle = colors.gray;
      ctx.fillText("2 × 0.618", centerX + 80, 50);
      ctx.fillText("φ 1.618033988", 90, 80);
      ctx.fillText("PARAMETER", 90, 380);
      ctx.fillText("CHANGE", 90, 395);
      ctx.fillText("ERROR", 90, 410);

      ctx.font = "9px Arial, sans-serif";
      for (let year = 2008; year <= 2026; year += 2) {
        const x = 100 + (year - 2008) * 80;
        if (x < canvas.width - 200) {
          ctx.fillText(year.toString(), x, canvas.height - 70);
        }
      }

      ctx.font = "10px Arial, sans-serif";
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

    // Stylized tech blueprint image (without blue triangles)
    function drawTechBlueprint() {
      ctx.save();
      ctx.strokeStyle = colors.gray;
      ctx.lineWidth = 1;

      // Supprimé les deux traits dans le carré central
      // ctx.beginPath();
      // ctx.moveTo(centerX - 120, centerY + 70);
      // ctx.lineTo(centerX - 70, centerY + 80);
      // ctx.moveTo(centerX + 70, centerY + 80);
      // ctx.lineTo(centerX + 120, centerY + 70);
      // ctx.stroke();

      ctx.restore();
    }

    // Nouvelles formes et écriture japonaise au-dessus de l'image en bas à droite
    function drawJapaneseStyleAboveImage() {
      ctx.save();
      ctx.fillStyle = colors.black;

      // Zone au-dessus de l'image (ajustée pour couvrir l'espace de canvas.width - 450 à canvas.width - 50, et canvas.height - 650 à canvas.height - 350)
      const imgX = canvas.width - 450;
      const imgY = canvas.height - 300; // Descendu de 50 pixels pour ajuster la position
      const topY = imgY - 300; // 300 pixels au-dessus de l'image

      // Suppression des formes géométriques (polygone et cercle)
      // ctx.beginPath();
      // ctx.moveTo(imgX, topY);
      // ctx.lineTo(imgX + 100, topY + 50);
      // ctx.lineTo(imgX + 200, topY);
      // ctx.lineTo(imgX + 300, topY + 100);
      // ctx.lineTo(imgX + 400, topY);
      // ctx.closePath();
      // ctx.fill();

      // ctx.beginPath();
      // ctx.arc(imgX + 150, topY + 150, 50, 0, Math.PI * 2);
      // ctx.fill();

      // Écriture japonaise en plus gros
      ctx.font = "bold 20px 'Arial', sans-serif"; // Augmentation de la taille à 60px
      ctx.fillText("龍", imgX + 50, topY + 100); // Caractère "Dragon"
      ctx.fillText("風", imgX + 200, topY + 200); // Caractère "Vent"
      ctx.fillText("山", imgX + 300, topY + 150); // Caractère "Montagne"

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
      drawJapaneseStyleAboveImage(); // Ajout de la nouvelle fonction
      if (img1 && img1.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img1, canvas.width - 450, canvas.height - 300, 400, 300); // Ajustement de la position Y
        ctx.restore();
      }
      if (img2 && img2.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img2, canvas.width - 190, 0, 150, 150); // Top-right before 'F'
        ctx.restore();
      }
      if (img3 && img3.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img3, 20, canvas.height - 220, 200, 200); // Bottom-left position
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

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

    // Gestion du resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (img1 && img1.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img1, canvas.width - 450, canvas.height - 300, 400, 300); // Ajustement de la position Y
        ctx.restore();
      }
      if (img2 && img2.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img2, canvas.width - 200, 20, 150, 150);
        ctx.restore();
      }
      if (img3 && img3.complete) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(img3, 20, canvas.height - 220, 200, 200);
        ctx.restore();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="full-screen-canvas" />;
};

export default TechArt;
