(function () {
  // ---- drawer
  var burger = document.querySelector('.burger');
  var drawer = document.getElementById('drawer');
  var closeBtn = drawer && drawer.querySelector('.drawer-close');
  function setOpen(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('lock', open);
  }
  if (burger && drawer) {
    burger.addEventListener('click', function () { setOpen(!drawer.classList.contains('open')); });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    drawer.addEventListener('click', function (e) { if (e.target === drawer) setOpen(false); });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('pageshow', function () { setOpen(false); });
  }

  // ---- reveal
  var items = document.querySelectorAll('.sr');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('on'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('on'); });
  }

  // ---- contact form (Formspree / AJAX)
  var form = document.querySelector('.cform');
  if (form) {
    var kind = document.getElementById('kind');
    var q = new URLSearchParams(location.search);
    if (kind && q.get('kind') === 'recruit') kind.value = '採用について';
    if (kind && q.get('kind') === 'partner') kind.value = '医療機関・関係機関から';
    var msg = form.querySelector('.form-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      for (var i = 0; i < required.length; i++) {
        if (!required[i].value.trim()) { msg.textContent = '必須項目をご入力ください。'; required[i].focus(); return; }
      }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true; msg.textContent = '送信しています…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (r) {
          if (r.ok) { form.reset(); msg.textContent = 'お問い合わせを受け付けました。折り返しご連絡いたします。'; }
          else { msg.textContent = '送信できませんでした。お手数ですがお電話（078-962-8017）でご連絡ください。'; }
        })
        .catch(function () { msg.textContent = '送信できませんでした。お手数ですがお電話（078-962-8017）でご連絡ください。'; })
        .finally(function () { btn.disabled = false; });
    });
  }

  // ---- news (assets/news.json を読む。空なら非表示)
  var news = document.getElementById('news');
  if (news) {
    fetch('assets/news.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (items) {
      items = (items || []).filter(function (n) { return n && n.title; }).slice(0, 5);
      if (!items.length) return;
      var ul = news.querySelector('.news-list');
      items.forEach(function (n) {
        var li = document.createElement('li');
        var d = document.createElement('time'); d.textContent = n.date || '';
        var a = n.url ? document.createElement('a') : document.createElement('span');
        if (n.url) a.href = n.url;
        a.textContent = n.title;
        li.appendChild(d); li.appendChild(a); ul.appendChild(li);
      });
      news.hidden = false;
    }).catch(function () {});
  }
})();
