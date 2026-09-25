
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
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  
  if (!dot || !ring) return;
  
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.transform = 'translate(calc(' + mouseX + 'px - 50%), calc(' + mouseY + 'px - 50%))';
  });
  
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = 'translate(calc(' + ringX + 'px - 50%), calc(' + ringY + 'px - 50%))';
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
  
  const hoverTargets = document.querySelectorAll('a, button, .card, .btn');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.background = 'rgba(59, 130, 246, 0.1)';
      ring.style.borderColor = 'rgba(59, 130, 246, 0.8)';
      dot.style.transform = 'translate(calc(' + mouseX + 'px - 50%), calc(' + mouseY + 'px - 50%)) scale(1.5)';
    });
    target.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.background = 'transparent';
      ring.style.borderColor = 'rgba(59, 130, 246, 0.5)';
      dot.style.transform = 'translate(calc(' + mouseX + 'px - 50%), calc(' + mouseY + 'px - 50%)) scale(1)';
    });
  });
}

// 3. Scroll Progress Bar
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
  
  VanillaTilt.init(document.querySelectorAll('.card, .contact-info-card, .contact-hover-card'), {
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
      ctx.fillStyle = 'rgba(56, 189, 248, ' + this.opacity + ')';
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
