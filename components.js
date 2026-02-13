// Layout Components Loader
// تحميل الـ navbar و footer من ملفات منفصلة

async function loadNavigation() {
  try {
    const navResponse = await fetch('_navbar.html');
    if (navResponse.ok) {
      const navContent = await navResponse.text();
      const topbar = document.querySelector('.topbar');
      if (topbar) {
        topbar.insertAdjacentHTML('afterend', navContent);
      } else {
        document.body.insertAdjacentHTML('afterbegin', navContent);
      }
      initializeNavigation();
    }
  } catch (error) {
    console.warn('navbar already present or failed to load:', error);
  }
}

async function loadFooter() {
  try {
    const footerResponse = await fetch('_footer.html');
    if (footerResponse.ok) {
      const footerContent = await footerResponse.text();
      document.body.insertAdjacentHTML('beforeend', footerContent);
      initializeFooter();
    }
  } catch (error) {
    console.warn('Footer already present or failed to load:', error);
  }
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
  document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter();
  });
} else {
  loadNavigation();
  loadFooter();
}
