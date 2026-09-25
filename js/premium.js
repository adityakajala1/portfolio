/**
 * Premium Interactions for Aditya Kajala Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initBootSequence();
  initCustomCursor();
  initScrollProgress();
  init3DTilt();
  initNeuralCanvas();
});

// 1. Terminal Boot Sequence
function initBootSequence() {
  const bootScreen = document.getElementById('boot-sequence');
  const bootText = document.getElementById('boot-text');
  
  if (!bootScreen || !bootText) return;

  // Check if we've already booted in this session to avoid annoyance on refresh
  // Actually, let's play it every time for the demo, but keep it FAST.
  
  const lines = [
    '> Initializing neural pathways...',
    '> Loading pre-trained weights...',
    '> Establishing connection...',
    '> Access granted. Welcome, Aditya.'
  ];
  
  let lineIndex = 0;
  
  function typeLine() {
    if (lineIndex < lines.length) {
      const p = document.createElement('p');
      p.style.margin = '0.5rem 0';
      p.textContent = lines[lineIndex];
      bootText.appendChild(p);
      lineIndex++;
      setTimeout(typeLine, 300); // 300ms per line
    } else {
      setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
          bootScreen.style.display = 'none';
        }, 500);
      }, 400);
    }
  }
  
  setTimeout(typeLine, 200);
}

// 2. Custom Premium Cursor
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  
  if (!dot || !ring) return;
  
  // Only activate on devices with a mouse
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
    
    // Dot follows instantly
    dot.style.transform = 	ranslate(calc(\px - 50%), calc(\px - 50%));
  });
  
  // Smooth follow for the ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = 	ranslate(calc(\px - 50%), calc(\px - 50%));
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);
  
  // Hover states
  const hoverTargets = document.querySelectorAll('a, button, .card, .btn');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.background = 'rgba(59, 130, 246, 0.1)';
      ring.style.borderColor = 'rgba(59, 130, 246, 0.8)';
      dot.style.transform = 	ranslate(calc(\px - 50%), calc(\px - 50%)) scale(1.5);
    });
    target.addEventListener('mouseleave', () => {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.background = 'transparent';
      ring.style.borderColor = 'rgba(59, 130, 246, 0.5)';
      dot.style.transform = 	ranslate(calc(\px - 50%), calc(\px - 50%)) scale(1);
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

// 5. Neural Network Canvas
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  
  const maxNodes = 60;
  const connectionDistance = 150;
  let mouse = { x: -1000, y: -1000 };
  
  function resize() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  // Track mouse over hero section specifically to avoid global coordinates offset
  const hero = document.getElementById('home');
  hero.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  hero.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
  
  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.fill();
    }
  }
  
  for (let i = 0; i < maxNodes; i++) {
    nodes.push(new Node());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    nodes.forEach(node => {
      node.update();
      node.draw();
    });
    
    for (let i = 0; i < nodes.length; i++) {
      // Connect nodes to each other
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          const opacity = 1 - (dist / connectionDistance);
          ctx.strokeStyle = gba(59, 130, 246, \);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Connect nodes to mouse
      const mdx = nodes[i].x - mouse.x;
      const mdy = nodes[i].y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      
      if (mdist < connectionDistance * 1.5) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        const opacity = 1 - (mdist / (connectionDistance * 1.5));
        ctx.strokeStyle = gba(96, 165, 250, \);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
