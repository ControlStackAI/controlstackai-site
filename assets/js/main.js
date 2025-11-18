(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  const setState = (isOpen) => {
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('nav-open');
    setState(!isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setState(false));
  });

  const desktopQuery = window.matchMedia('(min-width: 901px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setState(false);
  });
})();
