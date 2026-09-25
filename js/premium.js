
/**
 * Premium Interactions for Aditya Kajala Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initMathEmbers();
  initCustomCursor();
  initScrollProgress();
  init3DTilt();
});


// 2. Custom Premium Cursor
function initCustomCursor() {
  const inverter = document.getElementById('cursor-inverter');
  if (!inverter) return;
  
  if (window.matchMedia('(pointer: coarse)').matches) {
    inverter.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let invX = mouseX;
  let invY = mouseY;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function renderCursor() {
    // Faster lerp: 0.4 instead of 0.15 for snappy response
    invX += (mouseX - invX) * 0.4;
    invY += (mouseY - invY) * 0.4;
    inverter.style.transform = 'translate(calc(' + invX + 'px - 50%), calc(' + invY + 'px - 50%))';
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
  
  // Expand cursor on hover
  const hoverTargets = document.querySelectorAll('a, button, .card, .project-card, h1, h2, h3, .contact-hover-card');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => inverter.classList.add('hovering'));
    target.addEventListener('mouseleave', () => inverter.classList.remove('hovering'));
  });
}

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

// 4. 3D Tilt
function init3DTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  
  VanillaTilt.init(document.querySelectorAll('.project-card, .contact-hover-card'), {
    max: 5,
    speed: 400,
    glare: true,
    'max-glare': 0.15,
    scale: 1.02
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
  window.addEventListener('resize', resizeCanvas);
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
