/* FreeToolsHub — shared Tailwind config, component classes, and page behavior.
   Loaded on every page right after js/tailwindcss.js (self-hosted Play CDN).

   Note: the Play CDN runtime drops `@media (prefers-color-scheme: dark)`
   blocks declared inside addComponents, so all dark-mode component styling
   lives in the injected plain-CSS <style> below (doubled selectors .x.x so
   they always win over the light component rules). */

tailwind.config = {
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
          'Helvetica Neue', 'Arial', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        /* Layout container */
        '.wrap': {
          maxWidth: '1120px', marginLeft: 'auto', marginRight: 'auto',
          paddingLeft: '1.25rem', paddingRight: '1.25rem',
        },
        '@media (min-width: 640px)': {
          '.wrap': { paddingLeft: '1.5rem', paddingRight: '1.5rem' },
        },

        /* Buttons */
        '.btn': {
          display: 'inline-block', padding: '0.7rem 1.4rem', borderRadius: '0.7rem',
          fontWeight: '600', fontSize: '0.95rem', lineHeight: '1.4',
          transition: 'transform .12s ease, box-shadow .12s ease, background-color .12s ease, border-color .12s ease',
        },
        '.btn:hover': { transform: 'translateY(-1px)', textDecoration: 'none' },
        '.btn-primary': {
          backgroundColor: '#4f46e5', color: '#ffffff',
          boxShadow: '0 1px 2px rgba(16,18,35,.06), 0 8px 24px -12px rgba(79,70,229,.5)',
        },
        '.btn-primary:hover': { backgroundColor: '#4338ca', color: '#ffffff' },
        '.btn-ghost': {
          border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#0f172a',
        },
        '.btn-ghost:hover': { borderColor: '#6366f1', color: '#4f46e5' },

        /* Tool card */
        '.tool-card': {
          display: 'flex', flexDirection: 'column', gap: '0.625rem',
          borderRadius: '1rem', padding: '1.25rem',
          border: '1px solid #e2e8f0', backgroundColor: '#ffffff',
          boxShadow: '0 1px 2px rgba(16,18,35,.05), 0 8px 24px -14px rgba(16,18,35,.12)',
          transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
        },
        '.tool-card:hover': { transform: 'translateY(-3px)', boxShadow: '0 2px 4px rgba(16,18,35,.06), 0 16px 40px -16px rgba(16,18,35,.22)' },
        '.tool-card-pick': { borderColor: 'rgba(251,191,36,.7)' },
        '.tool-icon': {
          display: 'grid', placeItems: 'center', width: '2.75rem', height: '2.75rem',
          flex: 'none', borderRadius: '0.75rem', color: '#ffffff',
          fontWeight: '800', fontSize: '1.05rem',
          background: 'linear-gradient(135deg, var(--tint, #6366f1), color-mix(in srgb, var(--tint, #6366f1) 55%, #a855f7))',
        },

        /* Pills */
        '.pill': {
          display: 'inline-block', padding: '0.1rem 0.6rem', borderRadius: '999px',
          fontSize: '0.72rem', fontWeight: '700', letterSpacing: '.02em',
          border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9', color: '#475569',
        },
        '.pill-free': { backgroundColor: '#eef2ff', borderColor: 'transparent', color: '#4338ca' },
        '.pill-pick': { backgroundColor: '#fef3c7', borderColor: 'transparent', color: '#b45309' },

        /* Category card (home grid) */
        '.cat-card': {
          display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
          borderRadius: '1rem', padding: '1.125rem',
          border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#0f172a',
          boxShadow: '0 1px 2px rgba(16,18,35,.05), 0 8px 24px -14px rgba(16,18,35,.12)',
          transition: 'transform .15s ease, box-shadow .15s ease, border-color .15s ease',
          textDecoration: 'none',
        },
        '.cat-card:hover': {
          transform: 'translateY(-3px)', borderColor: '#818cf8', textDecoration: 'none',
          boxShadow: '0 2px 4px rgba(16,18,35,.06), 0 16px 40px -16px rgba(16,18,35,.22)',
        },
        '.cat-icon': {
          display: 'grid', placeItems: 'center', width: '2.625rem', height: '2.625rem',
          flex: 'none', borderRadius: '0.7rem', fontSize: '1.25rem',
          backgroundColor: 'color-mix(in srgb, var(--tint, #6366f1) 14%, transparent)',
          color: 'var(--tint, #6366f1)',
        },

        /* Blog post card */
        '.post-card': {
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          borderRadius: '1rem', padding: '1.375rem',
          border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#0f172a',
          boxShadow: '0 1px 2px rgba(16,18,35,.05), 0 8px 24px -14px rgba(16,18,35,.12)',
          transition: 'transform .15s ease, box-shadow .15s ease',
          textDecoration: 'none',
        },
        '.post-card:hover': {
          transform: 'translateY(-3px)', textDecoration: 'none',
          boxShadow: '0 2px 4px rgba(16,18,35,.06), 0 16px 40px -16px rgba(16,18,35,.22)',
        },

        /* Ranked list (best-of articles) */
        '.rank': { counterReset: 'rank', display: 'flex', flexDirection: 'column', gap: '0.875rem' },
        '.rank-item': {
          display: 'flex', gap: '1.125rem', alignItems: 'flex-start',
          borderRadius: '1rem', padding: '1.25rem',
          border: '1px solid #e2e8f0', backgroundColor: '#ffffff',
          boxShadow: '0 1px 2px rgba(16,18,35,.05), 0 8px 24px -14px rgba(16,18,35,.12)',
        },
        '.rank-no': {
          counterIncrement: 'rank', display: 'grid', placeItems: 'center',
          width: '2.5rem', height: '2.5rem', flex: 'none', borderRadius: '999px',
          backgroundColor: '#eef2ff', color: '#4338ca', fontWeight: '800', fontSize: '1.05rem',
        },
        '.rank-no::before': { content: 'counter(rank)' },

        /* Breadcrumbs */
        '.crumbs': { paddingTop: '1.75rem', fontSize: '0.85rem', color: '#64748b' },
        '.crumbs a': { color: '#64748b' },
        '.crumbs a:hover': { color: '#4f46e5' },

        /* Header navigation (mobile dropdown / desktop inline row) */
        '.main-nav': {
          display: 'none', position: 'absolute', top: '64px', left: '0', right: '0',
          flexDirection: 'column', gap: '0.25rem', padding: '1rem 1.25rem 1.25rem',
          backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0',
          boxShadow: '0 16px 40px -16px rgba(16,18,35,.25)',
        },
        '.main-nav.nav-open': { display: 'flex' },
        '@media (min-width: 768px)': {
          '.main-nav': {
            display: 'flex', position: 'static', padding: '0', gap: '0.125rem',
            flexDirection: 'row', alignItems: 'center',
            backgroundColor: 'transparent', borderBottom: 'none', boxShadow: 'none',
          },
        },

        /* Active nav link (set by the highlighter below) */
        '.nav-active': {
          backgroundColor: '#eef2ff', color: '#4338ca', fontWeight: '600',
        },
      });
    },
  ],
};

/* ---------- Dark-mode component overrides (plain CSS, guaranteed to apply) ---------- */
(function () {
  var css = [
    '@media (prefers-color-scheme: dark) {',
    '  .btn-ghost.btn-ghost { border-color:#334155; background-color:#0f172a; color:#f1f5f9; }',
    '  .btn-ghost.btn-ghost:hover { border-color:#818cf8; color:#a5b4fc; }',
    '  .pill.pill { background-color:#1e293b; border-color:#334155; color:#cbd5e1; }',
    '  .pill-free.pill-free { background-color:rgba(99,102,241,.16); color:#a5b4fc; }',
    '  .pill-pick.pill-pick { background-color:rgba(251,191,36,.14); color:#fbbf24; }',
    '  .tool-card.tool-card { border-color:#334155; background-color:#0f172a; }',
    '  .cat-card.cat-card { border-color:#334155; background-color:#0f172a; color:#f1f5f9; }',
    '  .cat-card.cat-card:hover { border-color:#6366f1; }',
    '  .post-card.post-card { border-color:#334155; background-color:#0f172a; color:#f1f5f9; }',
    '  .rank-item.rank-item { border-color:#334155; background-color:#0f172a; }',
    '  .rank-no.rank-no { background-color:rgba(99,102,241,.16); color:#a5b4fc; }',
    '  .main-nav.main-nav { background-color:#020617; border-bottom:1px solid #1e293b; }',
    '  .nav-active.nav-active { background-color:rgba(99,102,241,.16); color:#a5b4fc; }',
    '}',
    '@media (min-width: 768px) and (prefers-color-scheme: dark) {',
    '  .main-nav.main-nav { background-color:transparent; border-bottom:none; box-shadow:none; }',
    '}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ---------- Page behavior (no dependencies) ---------- */
document.addEventListener('DOMContentLoaded', function () {
  /* Mobile navigation toggle */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Highlight the current page in the header nav */
  if (nav) {
    var norm = function (p) {
      p = p.replace(/index\.html$/, '');
      if (!p.endsWith('/')) p += '/';
      return p;
    };
    var here = norm(location.pathname);
    nav.querySelectorAll('a').forEach(function (a) {
      if (norm(new URL(a.href).pathname) === here) a.classList.add('nav-active');
    });
  }

  /* Tool directory: category chips + search filter */
  var grid = document.getElementById('dir-grid');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.tool-card'));
    var input = document.getElementById('dir-search');
    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-chip]'));
    var countEl = document.getElementById('dir-count');
    var emptyEl = document.getElementById('dir-empty');
    var active = 'all';

    function apply() {
      var q = (input && input.value || '').trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var okCat = active === 'all' ||
          (' ' + card.getAttribute('data-cat') + ' ').indexOf(' ' + active + ' ') !== -1;
        var okText = !q || (card.getAttribute('data-search') || '').indexOf(q) !== -1;
        var show = okCat && okText;
        card.classList.toggle('hidden', !show);
        if (show) shown++;
      });
      if (countEl) countEl.textContent = shown;
      if (emptyEl) emptyEl.style.display = shown ? 'none' : 'block';
      chips.forEach(function (chip) {
        var on = chip.getAttribute('data-chip') === active;
        chip.classList.toggle('bg-indigo-600', on);
        chip.classList.toggle('border-indigo-600', on);
        chip.classList.toggle('text-white', on);
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        active = chip.getAttribute('data-chip');
        apply();
      });
    });
    if (input) input.addEventListener('input', apply);
    apply();
  }
});
