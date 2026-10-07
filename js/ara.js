(function () {
  var durum = document.getElementById('ara-durum');
  var kutu = document.getElementById('ara-sonuc');
  var q = (new URLSearchParams(location.search).get('q') || '').trim();
  var input = document.getElementById('aq');
  if (input) input.value = q;
  if (q.length < 2) { durum.textContent = 'Aramak için en az iki harf yazın.'; return; }
  var kucuk = function (s) { return String(s).toLocaleLowerCase('tr'); };
  var terim = kucuk(q);
  fetch('/arama.json').then(function (r) { return r.json(); }).then(function (dizin) {
    var bulunan = dizin.filter(function (x) {
      return kucuk([x.baslik, x.etiket, x.metin, x.madde].join(' ')).indexOf(terim) > -1;
    });
    if (!bulunan.length) { durum.textContent = '“' + q + '” için sonuç bulunamadı.'; return; }
    durum.textContent = bulunan.length + ' sonuç bulundu.';
    bulunan.forEach(function (x) {
      var kart = document.createElement('article'); kart.className = 'dcard';
      var ust = document.createElement('div'); ust.className = 'top';
      var pill = document.createElement('span'); pill.className = 'gpill'; pill.textContent = x.tur + (x.etiket ? ' · ' + x.etiket : '');
      ust.appendChild(pill);
      var h = document.createElement('h3'); var a = document.createElement('a'); a.href = x.url; a.textContent = x.baslik; h.appendChild(a);
      var p = document.createElement('p'); p.textContent = x.metin.slice(0, 180) + (x.metin.length > 180 ? '…' : '');
      kart.appendChild(ust); kart.appendChild(h); kart.appendChild(p);
      kutu.appendChild(kart);
    });
  }).catch(function () { durum.textContent = 'Arama şu an yapılamıyor. Lütfen sayfayı yenileyin.'; });
})();
