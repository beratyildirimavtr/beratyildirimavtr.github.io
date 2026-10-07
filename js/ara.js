(function () {
  var durum = document.getElementById('ara-durum');
  var kutu = document.getElementById('ara-sonuc');
  var q = (new URLSearchParams(location.search).get('q') || '').trim();
  var input = document.querySelector('.search input');
  if (input) input.value = q;
  if (q.length < 2) { durum.textContent = 'Aramak için en az iki harf yazın.'; return; }
  var kucuk = function (s) { return String(s).toLocaleLowerCase('tr'); };
  var terim = kucuk(q);
  fetch('/arama.json').then(function (r) { return r.json(); }).then(function (dizin) {
    var bulunan = dizin.filter(function (x) {
      return kucuk([x.baslik, x.konu, x.metin, x.madde].join(' ')).indexOf(terim) > -1;
    });
    if (!bulunan.length) { durum.textContent = '“' + q + '” için sonuç bulunamadı.'; return; }
    durum.textContent = bulunan.length + ' sonuç bulundu.';
    var liste = document.createElement('div');
    liste.className = 'rows';
    bulunan.forEach(function (x) {
      var a = document.createElement('a');
      a.className = 'row';
      a.href = x.url;
      var h = document.createElement('h3'); h.textContent = x.baslik;
      var p = document.createElement('p'); p.textContent = x.metin.slice(0, 160) + (x.metin.length > 160 ? '…' : '');
      var m = document.createElement('div'); m.className = 'meta'; m.textContent = x.tur + (x.konu ? ' · ' + x.konu : '');
      a.appendChild(h); a.appendChild(p); a.appendChild(m);
      liste.appendChild(a);
    });
    kutu.appendChild(liste);
  }).catch(function () { durum.textContent = 'Arama şu an yapılamıyor. Lütfen sayfayı yenileyin.'; });
})();
