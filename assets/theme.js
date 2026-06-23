/* JH의 덴탈시냅스 — 공용 다크모드 토글 (사이트 전역 'dds-theme' 동기화) */
(function () {
  var root = document.documentElement;
  function effectiveDark() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark') return true;
    if (t === 'light') return false;
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  // 저장된 선호를 즉시 반영(FOUC 최소화)
  try {
    var saved = localStorage.getItem('dds-theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}
  function updateIcon() {
    var b = document.getElementById('theme');
    if (b) b.textContent = effectiveDark() ? '☀️' : '🌙';
  }
  function bind() {
    updateIcon();
    var b = document.getElementById('theme');
    if (!b) return;
    b.addEventListener('click', function () {
      var next = effectiveDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('dds-theme', next); } catch (e) {}
      updateIcon();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
