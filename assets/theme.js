/* JH의 덴탈시냅스 — shared theme, document navigation and reading progress */
(function () {
  'use strict';

  var root = document.documentElement;

  function effectiveDark() {
    var theme = root.getAttribute('data-theme');
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  try {
    var saved = localStorage.getItem('dds-theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (error) {}

  function updateThemeButton() {
    var button = document.getElementById('theme');
    if (!button) return;
    var iconId = effectiveDark() ? '#i-sun' : '#i-moon';
    var use = button.querySelector('use');
    if (use) {
      use.setAttribute('href', 'assets/icons.svg' + iconId);
      use.setAttribute('xlink:href', 'assets/icons.svg' + iconId);
    } else {
      button.textContent = effectiveDark() ? '☀️' : '🌙';
    }
    button.setAttribute('aria-label', effectiveDark() ? '라이트 모드로 전환' : '다크 모드로 전환');
    button.setAttribute('title', effectiveDark() ? '라이트 모드' : '다크 모드');
  }

  function setupTheme() {
    updateThemeButton();
    var button = document.getElementById('theme');
    if (!button) return;
    button.addEventListener('click', function () {
      var next = effectiveDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('dds-theme', next); } catch (error) {}
      updateThemeButton();
    });
  }

  function setupSkipLink() {
    var main = document.querySelector('main');
    if (!main) return;
    if (!main.id) main.id = 'main-content';
    if (document.querySelector('.skip-link')) return;
    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + main.id;
    skip.textContent = '본문으로 건너뛰기';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  function setupSectionMenu() {
    var topbar = document.querySelector('.topbar');
    var sourceNav = topbar && topbar.querySelector('.links');
    if (!topbar || !sourceNav || !sourceNav.querySelector('a[href^="#"]')) return;

    var details = topbar.querySelector('.mobile-sections');
    if (!details) {
      details = document.createElement('details');
      details.className = 'mobile-sections shared-sections';
      var summary = document.createElement('summary');
      summary.textContent = '목차';
      var mobileNav = document.createElement('nav');
      mobileNav.setAttribute('aria-label', '모바일 섹션 바로가기');
      Array.prototype.forEach.call(sourceNav.querySelectorAll('a[href^="#"]'), function (link) {
        mobileNav.appendChild(link.cloneNode(true));
      });
      details.appendChild(summary);
      details.appendChild(mobileNav);
      var spacer = topbar.querySelector('.spacer');
      var inner = topbar.querySelector('.topbar-inner') || topbar;
      inner.insertBefore(details, spacer || null);
    } else {
      details.classList.add('shared-sections');
    }

    root.classList.add('has-section-menu');
    var menuSummary = details.querySelector('summary');
    var menuLinks = details.querySelectorAll('nav a[href^="#"]');
    if (!menuSummary) return;
    menuSummary.setAttribute('aria-label', '현재 문서 목차 열기');

    function syncCurrent() {
      var sourceLinks = sourceNav.querySelectorAll('a[href^="#"]');
      var active = sourceNav.querySelector('a.active') || sourceLinks[0];
      var href = active && active.getAttribute('href');
      var label = active ? active.textContent.trim() : '목차';
      menuSummary.textContent = '목차 · ' + label;
      Array.prototype.forEach.call(menuLinks, function (link) {
        var current = !!href && link.getAttribute('href') === href;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }

    syncCurrent();
    if ('MutationObserver' in window) {
      new MutationObserver(syncCurrent).observe(sourceNav, { subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    Array.prototype.forEach.call(menuLinks, function (link) {
      link.addEventListener('click', function () { details.removeAttribute('open'); });
    });
    document.addEventListener('pointerdown', function (event) {
      if (details.open && !details.contains(event.target)) details.removeAttribute('open');
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && details.open) {
        details.removeAttribute('open');
        menuSummary.focus();
      }
    });
  }

  function setupReadingProgress() {
    if (document.body.classList.contains('hub-page')) return;
    var bar = document.createElement('div');
    bar.className = 'reading-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<span></span>';
    document.body.appendChild(bar);
    var fill = bar.firstElementChild;
    var queued = false;

    function update() {
      var doc = document.documentElement;
      var max = Math.max(1, doc.scrollHeight - window.innerHeight);
      var value = Math.max(0, Math.min(1, window.scrollY / max));
      fill.style.transform = 'scaleX(' + value + ')';
      queued = false;
    }
    function requestUpdate() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }
    update();
    addEventListener('scroll', requestUpdate, { passive: true });
    addEventListener('resize', requestUpdate, { passive: true });
  }

  function bind() {
    setupTheme();
    setupSkipLink();
    setupSectionMenu();
    setupReadingProgress();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
