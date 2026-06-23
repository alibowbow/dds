/* 덴탈시냅스 — 경량 SVG 차트 (의존성 없음)
   <div class="viz"><h3>..</h3><p class="cap">..</p>
     <div data-chart="rangebars|timeline|severity|stepbars|pyramid" data-json='{...}'></div>
   </div>
   클래스(.track/.rng/.node/.conn/.bar/.seg/.axis/.lab/text)는 theme.css에서 테마 색으로 스타일됨. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  function esc(s){ return String(s).replace(/[<&>]/g, function(c){return {'<':'&lt;','&':'&amp;','>':'&gt;'}[c];}); }
  function svg(w, h, label) {
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(label || '') + '">';
  }

  // ── 범위 막대: 공통 축 위 여러 라벨의 lo~hi 범위 ──
  function rangebars(d) {
    var W = 600, L = 168, R = 64, top = 12, rowH = 22, gap = 20;
    var rows = d.rows, max = d.max, plotW = W - L - R;
    var H = top + rows.length * (rowH + gap) + 6;
    var s = svg(W, H, (d.title || '범위 차트'));
    // 축 baseline + max tick
    var baseY = H - 4;
    s += '<line class="grid" x1="' + L + '" y1="' + top + '" x2="' + L + '" y2="' + (baseY - 8) + '"/>';
    s += '<text x="' + L + '" y="' + baseY + '" text-anchor="middle">0</text>';
    s += '<text x="' + (L + plotW) + '" y="' + baseY + '" text-anchor="end">' + esc(d.maxLabel || max) + (d.unit || '') + '</text>';
    rows.forEach(function (r, i) {
      var y = top + i * (rowH + gap);
      var x0 = L + (r.lo / max) * plotW;
      var w = Math.max(3, ((r.hi - r.lo) / max) * plotW);
      s += '<rect class="track" x="' + L + '" y="' + y + '" width="' + plotW + '" height="' + rowH + '" rx="6"/>';
      s += '<rect class="rng ' + (r.kind || '') + '" x="' + x0 + '" y="' + y + '" width="' + w + '" height="' + rowH + '" rx="6"/>';
      s += '<text class="lab" x="' + (L - 12) + '" y="' + (y + rowH / 2 + 4) + '" text-anchor="end">' + esc(r.label) + '</text>';
      s += '<text x="' + (L + plotW + 8) + '" y="' + (y + rowH / 2 + 4) + '">' + esc(r.val) + '</text>';
    });
    return s + '</svg>';
  }

  // ── 타임라인: 축 위 마일스톤 노드 ──
  function timeline(d) {
    var W = 600, L = 24, R = 24, midY = 64, max = d.max;
    var plotW = W - L - R, H = 116;
    var s = svg(W, H, (d.title || '타임라인'));
    s += '<line class="axis" x1="' + L + '" y1="' + midY + '" x2="' + (W - R) + '" y2="' + midY + '"/>';
    d.marks.forEach(function (m) {
      var x = L + (m.at / max) * plotW;
      s += '<line class="conn" x1="' + x + '" y1="' + (midY - 7) + '" x2="' + x + '" y2="' + (midY + 7) + '"/>';
      s += '<circle class="node ' + (m.on ? 'on' : '') + '" cx="' + x + '" cy="' + midY + '" r="7"/>';
      // label above, sub below
      var tx = Math.min(Math.max(x, L + 30), W - R - 30);
      s += '<text class="lab" x="' + tx + '" y="' + (midY - 18) + '" text-anchor="middle">' + esc(m.label) + '</text>';
      if (m.sub) s += '<text x="' + tx + '" y="' + (midY + 26) + '" text-anchor="middle">' + esc(m.sub) + '</text>';
    });
    return s + '</svg>';
  }

  // ── 심각도 스케일: 좌→우 단계 블록(에스컬레이션) ──
  function severity(d) {
    var W = 600, H = 60, n = d.segs.length, gap = 8;
    var bw = (W - gap * (n - 1)) / n;
    var s = svg(W, H, (d.title || '단계'));
    d.segs.forEach(function (g, i) {
      var x = i * (bw + gap);
      var op = (0.32 + 0.68 * (i / (n - 1))).toFixed(2);
      s += '<rect class="seg v-fill" x="' + x + '" y="14" width="' + bw + '" height="34" rx="8" fill-opacity="' + op + '"/>';
      s += '<text x="' + (x + bw / 2) + '" y="35" text-anchor="middle" fill="#fff" font-weight="700">' + esc(g.label) + '</text>';
      if (g.sub) s += '<text x="' + (x + bw / 2) + '" y="' + 8 + '" text-anchor="middle">' + esc(g.sub) + '</text>';
    });
    return s + '</svg>';
  }

  // ── 계단 막대(테이퍼 등) ──
  function stepbars(d) {
    var W = 600, H = 150, L = 20, R = 12, top = 14, base = 116;
    var bars = d.bars, n = bars.length, max = d.max || Math.max.apply(null, bars.map(function (b) { return b.value; }));
    var slot = (W - L - R) / n, bw = Math.min(56, slot * 0.6);
    var s = svg(W, H, (d.title || '추이'));
    s += '<line class="axis" x1="' + L + '" y1="' + base + '" x2="' + (W - R) + '" y2="' + base + '"/>';
    bars.forEach(function (b, i) {
      var cx = L + slot * i + slot / 2, h = (b.value / max) * (base - top);
      var x = cx - bw / 2, y = base - h;
      s += '<rect class="bar" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + h + '" rx="4"/>';
      s += '<text class="lab" x="' + cx + '" y="' + (y - 6) + '" text-anchor="middle">' + esc(b.top) + '</text>';
      s += '<text x="' + cx + '" y="' + (base + 16) + '" text-anchor="middle">' + esc(b.label) + '</text>';
      if (b.sub) s += '<text x="' + cx + '" y="' + (base + 30) + '" text-anchor="middle">' + esc(b.sub) + '</text>';
    });
    return s + '</svg>';
  }

  // ── 계층 피라미드(1차/2차/3차 등) ──
  function pyramid(d) {
    var W = 600, rowH = 46, gap = 8, n = d.tiers.length, top = 6;
    var H = top + n * (rowH + gap);
    var s = svg(W, H, (d.title || '계층'));
    d.tiers.forEach(function (t, i) {
      var y = top + i * (rowH + gap);
      var inset = (n - 1 - i) * (W * 0.13);   // 위로 갈수록 좁게
      var x0 = inset, x1 = W - inset;
      var midTop = (x0 + x1) / 2;
      var nextInset = (n - 1 - i - 1) * (W * 0.13);
      var tx0 = (i === n - 1) ? x0 : nextInset, tx1 = (i === n - 1) ? x1 : (W - nextInset);
      // trapezoid (top narrower for upper tiers): use simple rounded rect with opacity ramp instead for robustness
      var op = (0.92 - 0.22 * i).toFixed(2);
      s += '<rect class="v-fill" x="' + x0 + '" y="' + y + '" width="' + (x1 - x0) + '" height="' + rowH + '" rx="9" fill-opacity="' + op + '"/>';
      s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (y + 19) + '" text-anchor="middle" fill="#fff" font-weight="800">' + esc(t.label) + '</text>';
      s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (y + 35) + '" text-anchor="middle" fill="#fff" fill-opacity=".92">' + esc(t.items) + '</text>';
    });
    return s + '</svg>';
  }

  var R = { rangebars: rangebars, timeline: timeline, severity: severity, stepbars: stepbars, pyramid: pyramid };

  function init() {
    var nodes = document.querySelectorAll('[data-chart]');
    Array.prototype.forEach.call(nodes, function (el) {
      var type = el.getAttribute('data-chart'), fn = R[type];
      if (!fn) return;
      var data;
      try { data = JSON.parse(el.getAttribute('data-json') || '{}'); } catch (e) { return; }
      try { el.innerHTML = fn(data); } catch (e) { /* no-op */ }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.DSCharts = { init: init };
})();
