(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const submenuParents = document.querySelectorAll('.nav-item-has-submenu');

  if (!navToggle || !navLinks) return;

  const setState = (isOpen) => {
    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');

    if (!isOpen && submenuParents.length) {
      submenuParents.forEach((item) => {
        item.classList.remove('submenu-open');
        const toggle = item.querySelector('.nav-link-parent');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
  };

  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('nav-open');
    setState(!isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setState(false));
  });

  submenuParents.forEach((item) => {
    const toggle = item.querySelector('.nav-link-parent');
    if (!toggle) return;

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-haspopup', 'true');

    toggle.addEventListener('click', (event) => {
      const isDesktop = window.matchMedia('(min-width: 901px)').matches;
      if (isDesktop) return;

      event.preventDefault();
      const isOpen = item.classList.toggle('submenu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  const desktopQuery = window.matchMedia('(min-width: 901px)');
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches) setState(false);
  });
})();
