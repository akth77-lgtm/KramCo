// Layout Components Loader

async function fetchPartial(path) {
  const response = await fetch(path, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.text();
}

async function loadComponents() {
  let navHTML = "";
  let footerHTML = "";

  try {
    [navHTML, footerHTML] = await Promise.all([
      fetchPartial("_navbar.html"),
      fetchPartial("_footer.html"),
    ]);
  } catch (error) {
    console.warn("Component load failed:", error);
  }

  // Insert navbar after topbar
  const topbar = document.querySelector('.topbar');
  if (topbar && navHTML && !document.querySelector('.site-nav')) {
    topbar.insertAdjacentHTML('afterend', navHTML);
  }

  // Insert footer before closing body tag
  if (footerHTML && !document.querySelector('footer.footer')) {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Initialize navigation
  initializeNavigation();
  initializeFooter();

  document.dispatchEvent(new Event("components:loaded"));
}

function initializeNavigation() {
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.site-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    });
  }
}

function initializeFooter() {
  const toTopBtn = document.querySelector('.to-top');
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        toTopBtn.classList.add('is-visible');
      } else {
        toTopBtn.classList.remove('is-visible');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
