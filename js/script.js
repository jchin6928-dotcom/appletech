// ===== Mobile menu toggle =====
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // ===== Hero Apple logo gradient reveal =====
  var heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) { heroLogo.classList.add('animate'); }

  // ===== Scroll fade-in animation =====
  // Auto-apply the .reveal class to common content blocks so we don't
  // have to edit every HTML file by hand.
  var selectors = [
    'section h2', 'section .sub', '.band', '.banner',
    '.col', '.service', '.card', '.cat', '.hero .wrap > *'
  ];
  var targets = document.querySelectorAll(selectors.join(','));
  targets.forEach(function (el) { el.classList.add('reveal'); });

  // IntersectionObserver reveals each element when it enters the viewport
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { observer.observe(el); });
  } else {
    // very old browsers: just show everything
    targets.forEach(function (el) { el.classList.add('visible'); });
  }

  // ===== Video popup (modal) =====
  var modal   = document.getElementById('videoModal');
  var player  = document.getElementById('videoModalPlayer');
  var closeBtn = document.getElementById('videoModalClose');

  if (modal && player) {
    // open the modal when a "Learn more" video link is clicked
    document.querySelectorAll('.video-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var src = link.getAttribute('href');
        player.querySelector('source').setAttribute('src', src);
        player.load();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        player.play();
      });
    });

    // close helper: hide modal + stop the video
    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      player.pause();
      player.currentTime = 0;
    }

    if (closeBtn) { closeBtn.addEventListener('click', closeModal); }

    // click on the dark backdrop (outside the video) closes it
    modal.addEventListener('click', function (e) {
      if (e.target === modal) { closeModal(); }
    });

    // Esc key closes it
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) { closeModal(); }
    });
  }
});
