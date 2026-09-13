/* ============================================
   MAIN JAVASCRIPT - ADITYA KAJALA PORTFOLIO
   Core functionality and interactions
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initLoader();
  initNavigation();
  initScrollReveal();
  initCustomCursor();
  initSmoothScroll();
  initFormValidation();
  initActiveNav();
});

// ============================================
// LOADING ANIMATION
// ============================================

function initLoader() {
  const loader = document.querySelector('.loader');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Remove from DOM after animation
      setTimeout(() => {
        if (loader) loader.style.display = 'none';
      }, 400);
    }, 800);
  });
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  let lastScroll = 0;
  const scrollThreshold = 100;

  // Scroll behavior
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Hide/show nav on scroll (disabled for better UX)
    // Uncomment below to enable auto-hide
    /*
    if (currentScroll > scrollThreshold) {
      if (currentScroll > lastScroll && !menuToggle.classList.contains('active')) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
    }
    lastScroll = currentScroll;
    */
  });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = menuToggle.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav items
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// ============================================
// ACTIVE NAVIGATION INDICATOR
// ============================================

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}` ||
              (sectionId === 'home' && link.getAttribute('href') === './')) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav(); // Initial call
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '') return;

      e.preventDefault();

      const targetId = href.substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: unobserve after revealing (better performance)
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Progress bars animation
  const progressBars = document.querySelectorAll('.progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        progressObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

// ============================================
// CUSTOM CURSOR
// ============================================

function initCustomCursor() {
  // Only enable on desktop
  if (window.innerWidth < 768) return;

  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);
  document.body.classList.add('custom-cursor');

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  const speed = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });

  // Smooth cursor movement
  function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;

    cursorX += distX * speed;
    cursorY += distY * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .btn, .card');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation() {
  const form = document.getElementById('contact-form');

  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  form.addEventListener('submit', function(e) {
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });

    // Validate name
    if (!nameInput.value.trim()) {
      e.preventDefault();
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      e.preventDefault();
      showError(nameInput, 'Name must be at least 2 characters');
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      e.preventDefault();
      showError(emailInput, 'Please enter your email');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      e.preventDefault();
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim()) {
      e.preventDefault();
      showError(messageInput, 'Please enter a message');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      e.preventDefault();
      showError(messageInput, 'Message must be at least 10 characters');
      isValid = false;
    }

    // If valid, let the form submit naturally to Web3Forms
    // The form will redirect to the success page automatically
  });

  // Real-time validation on blur
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('blur', function() {
        if (this.value.trim()) {
          this.parentElement.classList.remove('error');
        }
      });
    }
  });
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.form-error');

  formGroup.classList.add('error');
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function showSuccessMessage() {
  const successMsg = document.createElement('div');
  successMsg.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #34C759;
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(52, 199, 89, 0.3);
    z-index: 10000;
    animation: slideInDown 0.4s ease, fadeOut 0.4s ease 2.6s forwards;
  `;
  successMsg.textContent = '✓ Message sent successfully!';

  document.body.appendChild(successMsg);

  setTimeout(() => {
    successMsg.remove();
  }, 3000);
}

// ============================================
// PROJECT FILTERING (for projects page)
// ============================================

function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Filter projects
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize filtering if on projects page
if (document.querySelector('.filter-btn')) {
  initProjectFiltering();
}

// ============================================
// PARALLAX EFFECT
// ============================================

function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

initParallax();

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================

function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.btn-magnetic');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}

initMagneticButtons();

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Use throttled scroll event for better performance
const optimizedScroll = throttle(() => {
  // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content
const skipLink = document.querySelector('.skip-to-main');
if (skipLink) {
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('main').focus();
  });
}

// Keyboard navigation for cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.setAttribute('tabindex', '0');

  card.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const link = this.querySelector('a');
      if (link) link.click();
    }
  });
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Hello there!', 'font-size: 20px; color: #0071e3; font-weight: bold;');
console.log('%cInterested in how this was built? Check out the source code!', 'font-size: 14px; color: #6e6e73;');
console.log('%cBuilt with ❤️ by Aditya Kajala', 'font-size: 12px; color: #86868b;');
