import { useEffect, useRef } from "react";

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    const mouse = { x: null, y: null };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(bounds.width * pixelRatio);
      canvas.height = Math.round(bounds.height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resizeCanvas();

    const particles = [];
    const maxDistance = 100;
    const particleCount = Math.min(150, Math.max(50, Math.floor((canvas.clientWidth * canvas.clientHeight) / 7000)));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        radius: Math.random() * 1.6 + 0.7,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
      });
    }

    const handleMouseMove = (e) => {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = e.clientX - bounds.left;
      mouse.y = e.clientY - bounds.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.dx;
          p.y += p.dy;
          if (p.x < 0 || p.x > width) p.dx = -p.dx;
          if (p.y < 0 || p.y > height) p.dy = -p.dy;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(91, 183, 255, 0.75)";
        ctx.fill();

        if (mouse.x !== null && mouse.y !== null) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(133, 204, 255, ${(1 - dist / maxDistance) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      if (!reducedMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("pointerleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("pointerleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>;
}
