document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const navLinks = document.querySelectorAll('.site-nav a');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
      link.classList.add('active');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.repo-card, .page-content, .post-content, .info-card').forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
});
