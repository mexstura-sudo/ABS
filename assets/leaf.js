/* Листик со скаутской лилией для книги «История АБС».
   ABSLeaf.put(host, 'СЛОВО', {right: '8px', top: '-30px'}) — прикрепляет листик к элементу host.
   Нажатие переворачивает листик и показывает слово; его вписывают в книгу ../kniga/. */
(function () {
  var LILY = '<path d="M50 3 C59 15 63 28 59 41 C57 48 54 54 50 60 C46 54 43 48 41 41 C37 28 41 15 50 3Z"/><path d="M45 57 C42 47 36 40 28 38 C19 36 11 42 11 51 C11 58 17 62 22 59 C18 57 17 52 21 49 C25 46 31 48 35 52 C38 55 40 58 41 62Z"/><path d="M55 57 C58 47 64 40 72 38 C81 36 89 42 89 51 C89 58 83 62 78 59 C82 57 83 52 79 49 C75 46 69 48 65 52 C62 55 60 58 59 62Z"/><rect x="32" y="59" width="36" height="8" rx="3"/><path d="M44 67 C42 74 38 79 32 82 C38 84 44 82 47 77 L50 90 L53 77 C56 82 62 84 68 82 C62 79 58 74 56 67Z"/>';
  var LEAF = '<svg viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-14 50 52)"><path d="M50 91 V99" stroke="#FFFDF8" stroke-width="8" stroke-linecap="round"/><path d="M50 4 C66 16 82 32 84 54 C86 76 68 90 50 92 C32 90 14 76 16 54 C18 32 34 16 50 4Z" fill="#284F36" stroke="#FFFDF8" stroke-width="4" stroke-linejoin="round"/><path d="M50 4 C66 16 82 32 84 54 C85 66 80 76 72 83 C76 70 74 50 50 4Z" fill="#fff" opacity=".08"/><path d="M50 91 V99" stroke="#284F36" stroke-width="4" stroke-linecap="round"/><path d="M50 76 V90" stroke="rgba(255,255,255,.22)" stroke-width="1.6"/></g><g fill="#F5EEDF" transform="translate(22 18) scale(.56)">' + LILY + '</g></svg>';
  var CSS = '.abs-leaf{position:absolute;z-index:6;width:78px;height:78px;perspective:600px;cursor:pointer;-webkit-tap-highlight-color:transparent;font-family:Manrope,system-ui,sans-serif;animation:absLeafIn .9s cubic-bezier(.2,.9,.3,1.4) both}' +
    '.abs-leaf.open{z-index:30}' +
    '.abs-leaf .abs-in{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.7,.3,1.2)}' +
    '.abs-leaf.open .abs-in{transform:rotateY(180deg)}' +
    '.abs-leaf .abs-fr,.abs-leaf .abs-bk{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}' +
    '.abs-leaf .abs-fr{animation:absLeafWig 3.2s ease-in-out infinite}' +
    '.abs-leaf .abs-fr svg{width:100%;height:100%;display:block;filter:drop-shadow(0 6px 10px rgba(40,79,54,.35))}' +
    '.abs-leaf .abs-bk{transform:rotateY(180deg);left:-6px;right:-62px;top:-8px;bottom:-8px;background:#FFFDF8;color:#1F3954;border-radius:18px;box-shadow:0 0 0 2px #284F36,0 10px 24px rgba(31,57,84,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:2px;padding:6px}' +
    '.abs-leaf .abs-bk span{font-size:10px;font-weight:800;color:#5B6B7C;text-transform:uppercase;letter-spacing:1px}' +
    '.abs-leaf .abs-bk b{font-size:18px;font-weight:800;color:#284F36;letter-spacing:1px;line-height:1.1}' +
    '.abs-leaf .abs-bk a{font-size:11px;font-weight:800;color:#D85B21;text-decoration:none;line-height:1.2}' +
    '.abs-leaf:focus-visible{outline:3px solid #D85B21;outline-offset:4px;border-radius:50%}' +
    '@keyframes absLeafIn{from{opacity:0;transform:translateY(-30px) rotate(-40deg) scale(.4)}to{opacity:1;transform:none}}' +
    '@keyframes absLeafWig{0%,78%,100%{transform:rotate(0)}83%{transform:rotate(-10deg)}88%{transform:rotate(8deg)}94%{transform:rotate(-4deg)}}' +
    '@media (prefers-reduced-motion:reduce){.abs-leaf,.abs-leaf .abs-fr{animation:none}.abs-leaf .abs-in{transition:none}}';
  function style() {
    if (document.getElementById('abs-leaf-css')) return;
    var st = document.createElement('style'); st.id = 'abs-leaf-css'; st.textContent = CSS; document.head.appendChild(st);
  }
  function put(host, word, pos) {
    if (!host) return null;
    style();
    var old = host.querySelector(':scope > .abs-leaf'); if (old) return old;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    var el = document.createElement('div');
    el.className = 'abs-leaf'; el.setAttribute('role', 'button'); el.tabIndex = 0;
    el.setAttribute('aria-label', 'Листик со скаутской лилией — нажми, чтобы увидеть слово');
    el.innerHTML = '<span class="abs-in"><span class="abs-fr">' + LEAF + '</span><span class="abs-bk"><span>Слово</span><b>' + word + '</b><a href="../kniga/">Впиши в книгу «История АБС» →</a></span></span>';
    pos = pos || {right: '10px', top: '-34px'};
    Object.keys(pos).forEach(function (k) { el.style[k] = pos[k]; });
    function flip(e) {
      if (e.target.closest && e.target.closest('a')) return;
      e.preventDefault(); e.stopPropagation();
      el.classList.toggle('open');
    }
    el.addEventListener('click', flip);
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') flip(e); });
    host.appendChild(el);
    return el;
  }
  window.ABSLeaf = {put: put};
})();
