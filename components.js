// Layout Components Loader - تحميل مباشر للـ navbar و footer

function loadComponents() {
  const navHTML = `<nav class="navbar navbar-expand-lg sticky-top site-nav">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
      <img class="brand-logo" src="images/Logo.png" alt="Solid Foundations logo" />
      <span class="brand-text" data-i18n="brand_name">الأسس الصلبة</span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#siteNav"
      aria-controls="siteNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="siteNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-3">
        <li class="nav-item"><a class="nav-link" href="about.html" data-i18n="nav_about">عن الشركة</a></li>
        <li class="nav-item"><a class="nav-link" href="services.html" data-i18n="nav_services">الخدمات</a></li>
        <li class="nav-item"><a class="nav-link" href="projects.html" data-i18n="nav_projects">المشاريع</a></li>
        <li class="nav-item"><a class="nav-link" href="quality.html" data-i18n="nav_quality">الجودة</a></li>
        <li class="nav-item"><a class="nav-link" href="contact.html" data-i18n="nav_contact">تواصل معنا</a></li>
      </ul>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-ghost" type="button" data-lang-toggle>EN</button>
        <a class="btn btn-primary" href="contact.html" data-i18n="nav_cta">اطلب استشارة</a>
      </div>
    </div>
  </div>
</nav>`;

  const footerHTML = `<footer class="footer">
  <div class="container">
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="footer-brand">
          <img class="brand-logo" src="images/Logo.png" alt="Solid Foundations logo" style="max-width: 40px;" />
          <span class="brand-text" data-i18n="brand_name">الأسس الصلبة</span>
        </div>
        <p class="footer-text" data-i18n="footer_desc">
          شركة متخصصة في المقاولات الهندسية مع التزام عميق بالجودة والتسليم في الوقت.
        </p>
      </div>
      <div class="col-md-2 mb-3">
        <h6 data-i18n="footer_links">الروابط</h6>
        <ul class="list-unstyled">
          <li><a href="about.html" data-i18n="nav_about">عن الشركة</a></li>
          <li><a href="services.html" data-i18n="nav_services">الخدمات</a></li>
          <li><a href="projects.html" data-i18n="nav_projects">المشاريع</a></li>
          <li><a href="contact.html" data-i18n="nav_contact">تواصل معنا</a></li>
        </ul>
      </div>
      <div class="col-md-3 mb-3">
        <h6 data-i18n="footer_contact">تواصل</h6>
        <p class="footer-text">
          <i class="bi bi-telephone"></i> +966 12 345 6789
        </p>
        <p class="footer-text">
          <i class="bi bi-envelope"></i> info@solidfoundations.sa
        </p>
        <p class="footer-text">
          <i class="bi bi-geo-alt"></i> الرياض، المملكة العربية السعودية
        </p>
      </div>
      <div class="col-md-3 mb-3">
        <h6 data-i18n="footer_follow">تابعنا</h6>
        <div class="d-flex gap-2">
          <a href="#" class="social" title="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social" title="Twitter"><i class="bi bi-twitter"></i></a>
          <a href="#" class="social" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
          <a href="#" class="social" title="Instagram"><i class="bi bi-instagram"></i></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="text-muted" data-i18n="footer_rights">&copy; 2026 الأسس الصلبة. جميع الحقوق محفوظة.</span>
      <div class="d-flex gap-3">
        <a href="#" class="text-muted small" data-i18n="footer_privacy">سياسة الخصوصية</a>
        <a href="#" class="text-muted small" data-i18n="footer_terms">شروط الاستخدام</a>
      </div>
    </div>
  </div>
</footer>

<button class="to-top" type="button" aria-label="Back to top">
  <i class="bi bi-arrow-up"></i>
</button>`;

  // Insert navbar after topbar
  const topbar = document.querySelector('.topbar');
  if (topbar && !document.querySelector('.site-nav')) {
    topbar.insertAdjacentHTML('afterend', navHTML);
  }

  // Insert footer before closing body tag
  if (!document.querySelector('footer.footer')) {
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
