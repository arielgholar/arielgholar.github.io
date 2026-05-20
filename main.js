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

    // Close on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Earlier career disclosure ----------
  const earlierToggle = document.getElementById('earlierToggle');
  const earlierContent = document.getElementById('earlierContent');

  const setEarlierOpen = (open) => {
    if (!earlierToggle || !earlierContent) return;
    earlierContent.dataset.open = String(open);
    earlierToggle.setAttribute('aria-expanded', String(open));
    earlierToggle.classList.toggle('open', open);
    if (open) {
      // Allow content to flow, measure, set explicit max-height for transition
      earlierContent.style.maxHeight = earlierContent.scrollHeight + 'px';
    } else {
      earlierContent.style.maxHeight = '0px';
    }
  };

  if (earlierToggle && earlierContent) {
    earlierToggle.addEventListener('click', () => {
      const isOpen = earlierContent.dataset.open !== 'true';
      setEarlierOpen(isOpen);
    });

    // Recompute height on resize if currently open
    window.addEventListener('resize', () => {
      if (earlierContent.dataset.open === 'true') {
        earlierContent.style.maxHeight = earlierContent.scrollHeight + 'px';
      }
    });
  }

  // ---------- Reveal on scroll ----------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
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

})();
