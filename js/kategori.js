(function () {
  var rows = document.querySelectorAll('#konu-listesi .row');
  var box = document.getElementById('kategoriler');
  if (!box || !rows.length) return;
  var cats = ['Tümü'];
  rows.forEach(function (r) {
    var c = r.getAttribute('data-kategori');
    if (c && cats.indexOf(c) === -1) cats.push(c);
  });
  cats.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = c;
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function () {
      box.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      rows.forEach(function (r) {
        r.hidden = !(c === 'Tümü' || r.getAttribute('data-kategori') === c);
      });
    });
    box.appendChild(b);
  });
})();
