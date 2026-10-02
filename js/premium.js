
/**
 * Premium Interactions for Aditya Kajala Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initMathEmbers();
  initScrollProgress();
});


function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// 6. Global Math Embers Canvas
function initMathEmbers() {
  const mCanvas = document.getElementById('math-canvas');
  if (!mCanvas) return;
  const ctx = mCanvas.getContext('2d');
  
  let width, height;
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    
    mCanvas.width = width * dpr;
    mCanvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    mCanvas.style.width = width + 'px';
    mCanvas.style.height = height + 'px';
  }
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      resizeCanvas();
    }
  });
  resizeCanvas();

  const symbols = ['∑', 'λ', '∇', '∫', '∆', 'π', 'θ', 'f(x)'];
  let particles = [];
  
  class MathParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + 50;
      this.speed = Math.random() * 0.8 + 0.2;
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
      this.opacity = Math.random() * 0.5 + 0.1;
      this.size = Math.random() * 10 + 10;
      this.drift = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.y -= this.speed;
      this.x += this.drift;
      if (this.y < -50) this.reset();
    }
    draw() {
      const isBlueTheme = document.body.classList.contains('blue-theme');
      if (isBlueTheme) {
        ctx.fillStyle = 'rgba(12, 74, 110, ' + (this.opacity + 0.2) + ')'; // Deep blue for better contrast
      } else {
        ctx.fillStyle = 'rgba(56, 189, 248, ' + this.opacity + ')'; // Bright cyan for dark theme
      }
      ctx.font = this.size + 'px monospace';
      ctx.fillText(this.symbol, this.x, this.y);
    }
  }
  
  // Create more particles since it covers the whole screen
  for(let i = 0; i < 80; i++) particles.push(new MathParticle());
  
  function animateMath() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateMath);
  }
  animateMath();
}
