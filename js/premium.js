
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
  const dataDot = document.getElementById('cursor-data-dot');
  const partContainer = document.getElementById('particles-container');
  
  if (!dataDot || !partContainer) return;
  
  if (window.matchMedia('(pointer: coarse)').matches) {
    dataDot.style.display = 'none';
    partContainer.style.display = 'none';
    return;
  }
  document.body.classList.add('custom-cursor-active');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lastPartX = mouseX;
  let lastPartY = mouseY;
  const symbols = ['∑', '∆', 'π', 'θ', 'λ', '0', '1', 'f(x)', 'μ', 'σ', '{ }', '< >', '!='];
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function spawnParticle() {
    const p = document.createElement('div');
    p.className = 'data-particle';
    p.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = (mouseX + (Math.random() * 80 - 40)) + 'px';
    p.style.top = mouseY + 'px';
    
    partContainer.appendChild(p);
    
    // Garbage collect particle after animation ends
    setTimeout(() => { p.remove(); }, 1500);
  }
  
  function renderCursor() {
    dataDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
    
    // Spawn particle based on distance moved
    const dist = Math.hypot(mouseX - lastPartX, mouseY - lastPartY);
    if(dist > 12) {
      spawnParticle();
      lastPartX = mouseX;
      lastPartY = mouseY;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
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
