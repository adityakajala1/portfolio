
/**
 * Premium Interactions for Aditya Kajala Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
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

