(function () {
  const root = document.documentElement;
  const btn  = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
    localStorage.setItem('theme', theme);
  }

  // Resolve initial theme: stored preference → OS preference → light
  const stored    = localStorage.getItem('theme');
  const osPrefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(stored || osPrefers);

  btn.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Keep in sync if the user changes OS preference while the tab is open
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
  });
}());
