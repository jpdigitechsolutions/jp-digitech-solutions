/**
 * JP DIGITECH SOLUTIONS - 3D Particle Cyber Wave
 * Inspired by the tech mesh wave in the JP DigiTech brand logo.
 * Interactive with mouse movement, touch gestures, and high-DPI crisp rendering.
 */

(function () {
  const canvas = document.getElementById('heroWaveCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;
  let isRunning = true;

  // Grid configuration
  const rows = 28;
  const cols = 55;
  let stepX, stepY;
  let time = 0;

  // Mouse interaction tracker
  const mouse = {
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 180,
    active: false
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    if (width > window.innerWidth) width = window.innerWidth;
    height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.maxWidth = '100%';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    stepX = width / (cols - 1);
    stepY = (height * 0.65) / (rows - 1);
  }

  // Generate 3D grid point with wave function
  function getPoint(c, r, t) {
    const xBase = c * stepX;
    const yBase = height * 0.45 + r * stepY * 0.85;

    // Perspective depth factor
    const depth = r / rows; // 0 (far) to 1 (near)
    const perspectiveScale = 0.55 + depth * 0.65;

    // Centering perspective spread
    const centerX = width / 2;
    const x = centerX + (xBase - centerX) * perspectiveScale;

    // Multi-frequency wave equations
    const wave1 = Math.sin(c * 0.18 + t * 0.035 + r * 0.12) * (20 + depth * 35);
    const wave2 = Math.cos(r * 0.22 - t * 0.025 + c * 0.08) * (15 + depth * 25);
    const wave3 = Math.sin((c + r) * 0.15 + t * 0.015) * 12;

    let y = yBase + wave1 + wave2 + wave3;

    // Mouse proximity displacement
    if (mouse.active) {
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * 45;
        y += Math.sin((dist / mouse.radius) * Math.PI) * force;
      }
    }

    return {
      x: x,
      y: y,
      depth: depth,
      waveVal: (wave1 + wave2) / 60
    };
  }

  function render() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    time += 1;

    // Calculate all grid vertices for the current frame
    const grid = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = getPoint(c, r, time);
      }
    }

    // Draw connecting wave lines along columns for depth
    for (let c = 0; c < cols; c += 2) {
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const pt = grid[r][c];
        if (r === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw particle points
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pt = grid[r][c];

        // Depth-based particle size & opacity
        const size = (1.2 + pt.depth * 2.2);
        const alpha = Math.max(0.12, Math.min(0.95, 0.2 + pt.depth * 0.7 + pt.waveVal * 0.3));

        // Color gradient between electric cyan (#00f0ff) and royal blue / purple
        let color;
        if (pt.waveVal > 0.2) {
          color = `rgba(0, 240, 255, ${alpha})`;
        } else if (pt.waveVal < -0.2) {
          color = `rgba(139, 92, 246, ${alpha})`;
        } else {
          color = `rgba(59, 130, 246, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Extra bloom glow for prominent foreground particles
        if (pt.depth > 0.65 && (c % 3 === 0 || r % 3 === 0)) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.25})`;
          ctx.fill();
        }
      }
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Mouse & Touch listeners
  function onPointerMove(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (clientX !== undefined && clientY !== undefined) {
      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;
      mouse.active = true;
    }
  }

  function onPointerLeave() {
    mouse.active = false;
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  }

  window.addEventListener('resize', () => {
    resize();
  });

  canvas.addEventListener('mousemove', onPointerMove);
  canvas.addEventListener('mouseleave', onPointerLeave);
  canvas.addEventListener('touchmove', onPointerMove, { passive: true });
  canvas.addEventListener('touchend', onPointerLeave);

  // Performance optimization: Pause animation when canvas is scrolled offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!isRunning) {
          isRunning = true;
          render();
        }
      } else {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    });
  }, { threshold: 0.05 });

  observer.observe(canvas);

  // Initialize
  resize();
  render();
})();

