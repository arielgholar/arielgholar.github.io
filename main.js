/* ============================================
   Ariel Gholar — Portfolio Interactions
   ============================================ */

(function () {
  'use strict';

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Earlier Career toggle ----------
  const earlierToggle = document.getElementById('earlierToggle');
  const earlierContent = document.getElementById('earlierContent');
  if (earlierToggle && earlierContent) {
    earlierToggle.addEventListener('click', () => {
      const isOpen = earlierContent.classList.toggle('open');
      earlierToggle.classList.toggle('open', isOpen);
      earlierToggle.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        earlierContent.style.maxHeight = earlierContent.scrollHeight + 'px';
      } else {
        earlierContent.style.maxHeight = '0px';
      }
    });
  }

  // Recompute max-height on resize when open
  window.addEventListener('resize', () => {
    if (earlierContent && earlierContent.classList.contains('open')) {
      earlierContent.style.maxHeight = earlierContent.scrollHeight + 'px';
    }
  });

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ---------- Count-up metrics ----------
  const metricEls = document.querySelectorAll('.metric-value[data-target]');

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(target * eased);
      el.textContent = prefix + current + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && metricEls.length) {
    const metricObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    metricEls.forEach((el) => metricObserver.observe(el));
  } else {
    metricEls.forEach((el) => {
      const target = el.dataset.target;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      el.textContent = prefix + target + suffix;
    });
  }

  // ---------- Skill bar fill ----------
  const skillBars = document.querySelectorAll('.skill-bar[data-fill]');
  if ('IntersectionObserver' in window && skillBars.length) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.dataset.fill;
          bar.style.setProperty('--fill', pct + '%');
          // Slight stagger so bars don't all fire at the exact same frame
          const idx = Array.prototype.indexOf.call(skillBars, bar);
          setTimeout(() => bar.classList.add('filled'), idx * 60);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach((el) => skillObserver.observe(el));
  } else {
    skillBars.forEach((el) => {
      el.style.setProperty('--fill', el.dataset.fill + '%');
      el.classList.add('filled');
    });
  }

})();
