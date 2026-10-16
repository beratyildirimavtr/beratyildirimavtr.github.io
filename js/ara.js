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
      return kucuk([x.baslik, x.grup, x.aciklama, x.metin].join(' ')).indexOf(terim) > -1;
    });
    if (!bulunan.length) { durum.textContent = '“' + q + '” için sonuç bulunamadı.'; return; }
    durum.textContent = bulunan.length + ' sonuç bulundu.';
    bulunan.forEach(function (x) {
      var a = document.createElement('a'); a.className = 'trow'; a.href = x.url;
      a.style.setProperty('--gc', 'var(--dark)');
      var tb = document.createElement('span'); tb.className = 'tb';
      var meta = document.createElement('span'); meta.className = 'tmeta';
      if (x.grup) { var p = document.createElement('span'); p.className = 'gpill'; p.textContent = x.grup; meta.appendChild(p); }
      var s = document.createElement('strong'); s.textContent = x.baslik;
      var d = document.createElement('span'); d.className = 'tdesc'; d.textContent = x.aciklama || (x.metin.slice(0, 160) + '…');
      tb.appendChild(meta); tb.appendChild(s); tb.appendChild(d);
      var go = document.createElement('i'); go.className = 'go'; go.textContent = '→';
      a.appendChild(tb); a.appendChild(go); kutu.appendChild(a);
    });
  }).catch(function () { durum.textContent = 'Arama şu an yapılamıyor. Lütfen sayfayı yenileyin.'; });
})();
