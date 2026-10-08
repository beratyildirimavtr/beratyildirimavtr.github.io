const fs = require("fs");
const path = require("path");
const AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const sirala = (a, b) => (a.data.sira || 999) - (b.data.sira || 999) || a.data.baslik.localeCompare(b.data.baslik, "tr");

module.exports = function (eleventyConfig) {
  // Artık kullanılmayan eski dosyalar (silinmese de siteyi etkilemez)
  ["arsiv.njk", "konular/uyusturucu-ticareti.md", "konular/ihtiyac-nedeniyle-tahliye.md", "konular/nafaka.md",
   "README.md", "KULLANIM.md", "SABLONLAR/**"].forEach((p) => eleventyConfig.ignores.add(p));

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("*.{jpg,jpeg,png,webp}");

  // Yazı tipleri siteyle birlikte yayınlanır (Google'dan yüklenmez)
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const hedef = path.join(dir.output, "fonts");
    fs.mkdirSync(hedef, { recursive: true });
    const kaynaklar = [
      ["node_modules/@fontsource/newsreader/files", /^newsreader-latin(-ext)?-(400-italic|700-italic|400-normal|600-normal|700-normal)\.woff2$/],
      ["node_modules/@fontsource/ibm-plex-sans/files", /^ibm-plex-sans-latin(-ext)?-(400|500|600)-normal\.woff2$/]
    ];
    kaynaklar.forEach(([klasor, kalip]) => {
      fs.readdirSync(klasor).filter((f) => kalip.test(f)).forEach((f) =>
        fs.copyFileSync(path.join(klasor, f), path.join(hedef, f)));
    });
  });

  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  eleventyConfig.addFilter("tarihTR", (d) => {
    const x = new Date(d);
    return x.getUTCDate() + " " + AYLAR[x.getUTCMonth()] + " " + x.getUTCFullYear();
  });
  eleventyConfig.addFilter("isoTarih", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("menuAd", (url, menu) => { const m = menu.find((x) => x.url === url); return m ? m.ad : ""; });
  eleventyConfig.addFilter("head", (dizi, n) => dizi.slice(0, n));

  // Koleksiyonlar
  eleventyConfig.addCollection("gruplarSirali", (c) => c.getFilteredByTag("gruplar").sort(sirala));
  eleventyConfig.addCollection("konularSirali", (c) => c.getFilteredByTag("konular").sort(sirala));
  eleventyConfig.addCollection("kararSirali", (c) => c.getFilteredByTag("kararlar").sort((a, b) => b.date - a.date));

  // Yardımcı süzgeçler
  eleventyConfig.addFilter("grubunKonulari", (konular, g) => konular.filter((k) => k.data.grup === g));
  eleventyConfig.addFilter("konuKararlari", (kararlar, k) => kararlar.filter((d) => d.data.konu === k));
  eleventyConfig.addFilter("grubunKararlari", (kararlar, konular, g) => {
    const idler = konular.filter((k) => k.data.grup === g).map((k) => k.fileSlug);
    return kararlar.filter((d) => idler.includes(d.data.konu));
  });
  eleventyConfig.addFilter("gstil", (gr) => gr ? "--gc-l:" + gr.data.renk + ";--gc-d:" + (gr.data.renkKoyu || gr.data.renk) : "");
  eleventyConfig.addFilter("kararBilgi", (d, konular, gruplar) => {
    const kn = konular.find((k) => k.fileSlug === d.data.konu) || null;
    const gr = kn ? gruplar.find((g) => g.fileSlug === kn.data.grup) || null : null;
    return { kn, gr };
  });
  eleventyConfig.addFilter("konuBul", (konular, slug) => konular.find((k) => k.fileSlug === slug) || null);
  eleventyConfig.addFilter("grupBul", (gruplar, slug) => gruplar.find((g) => g.fileSlug === slug) || null);

  // Sayfa içinden (layout) çağrılan sürümler
  eleventyConfig.addFilter("kararBilgiSayfa", (pg, konular, gruplar, konuSlug) => {
    const kn = konular.find((k) => k.fileSlug === konuSlug) || null;
    const gr = kn ? gruplar.find((g) => g.fileSlug === kn.data.grup) || null : null;
    return { kn, gr };
  });

  // Sitede arama için dizin
  eleventyConfig.addCollection("aramaDizini", (c) => {
    const gruplar = c.getFilteredByTag("gruplar");
    const konular = c.getFilteredByTag("konular");
    const grupAdi = {}; gruplar.forEach((g) => (grupAdi[g.fileSlug] = g.data.baslik));
    const konuAdi = {}; konular.forEach((k) => (konuAdi[k.fileSlug] = k));
    const duz = (s) => String(s || "").replace(/\s+/g, " ").trim();
    const kon = konular.map((k) => ({
      tur: "Konu", baslik: k.data.baslik, url: k.url, etiket: grupAdi[k.data.grup] || "",
      metin: duz((k.data.aciklama || "") + " " + (k.rawInput || "")), madde: ""
    }));
    const kar = c.getFilteredByTag("kararlar").map((d) => {
      const kn = konuAdi[d.data.konu];
      return {
        tur: "Karar", baslik: d.data.baslik, url: d.url,
        etiket: kn ? kn.data.baslik : "",
        metin: duz((d.data.ozet || "") + " " + (d.rawInput || "")), madde: d.data.madde || ""
      };
    });
    return kon.concat(kar);
  });

  return {
    dir: { input: ".", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
