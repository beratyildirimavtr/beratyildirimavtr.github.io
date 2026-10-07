(function () {
  var kartlar = Array.prototype.slice.call(document.querySelectorAll('#liste .dcard'));
  var chips = document.querySelectorAll('#tools .chip');
  var kutu = document.getElementById('bq');
  var bos = document.getElementById('bos');
  var grup = '';
  var kucuk = function (s) { return String(s).toLocaleLowerCase('tr'); };
  var metinler = kartlar.map(function (k) { return kucuk(k.textContent); });
  function uygula() {
    var q = kucuk(kutu.value.trim());
    var gorunen = 0;
    kartlar.forEach(function (k, i) {
      var ok = (!grup || k.getAttribute('data-grup') === grup) && (!q || metinler[i].indexOf(q) > -1);
      k.hidden = !ok;
      if (ok) gorunen++;
    });
    bos.hidden = gorunen > 0 || kartlar.length === 0;
  }
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      grup = c.getAttribute('data-grup');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      uygula();
    });
  });
  kutu.addEventListener('input', uygula);
})();
