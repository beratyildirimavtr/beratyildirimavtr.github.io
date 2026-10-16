const fs = require("fs");
const path = require("path");
const AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const duzMetin = (s) => String(s || "").replace(/[#*_>`|\[\]()]/g, " ").replace(/\s+/g, " ").trim();
const slugla = (s) => s.toLocaleLowerCase("tr").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u")
  .replace(/<[^>]+>/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

module.exports = function (eleventyConfig) {
  // Eski sürümlerden kalmış dosyalar siteyi etkilemesin (silindikten sonra bu blok kaldırılabilir)
  ["kararlar/**", "SABLONLAR/**", "KULLANIM.md", "README.md", "arsiv.njk", "yargitay-kararlari.njk",
   "2026-10-14-basit-dolandiricilik-sucu", "konular/nafaka.md", "konular/ihtiyac-nedeniyle-tahliye.md",
   "konular/uyusturucu-ticareti.md"].forEach((p) => eleventyConfig.ignores.add(p));

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("*.{jpg,jpeg,png,webp}");
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  // Yazı tipleri siteyle birlikte yayınlanır (Google'dan yüklenmez)
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const hedef = path.join(dir.output, "fonts");
    fs.mkdirSync(hedef, { recursive: true });
    const kaynaklar = [
      ["node_modules/@fontsource/newsreader/files", /^newsreader-latin(-ext)?-(400-italic|700-italic|400-normal|600-normal|700-normal)\.woff2$/],
      ["node_modules/@fontsource/ibm-plex-sans/files", /^ibm-plex-sans-latin(-ext)?-(400|500|600)-normal\.woff2$/]
    ];
    kaynaklar.forEach(([klasor, kalip]) => {
      fs.readdirSync(klasor).filter((f) => kalip.test(f)).forEach((f) => fs.copyFileSync(path.join(klasor, f), path.join(hedef, f)));
    });
  });

  eleventyConfig.addFilter("tarihTR", (d) => {
    const x = new Date(d);
    return x.getUTCDate() + " " + AYLAR[x.getUTCMonth()] + " " + x.getUTCFullYear();
  });
  eleventyConfig.addFilter("isoTarih", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("head", (dizi, n) => dizi.slice(0, n));
  eleventyConfig.addFilter("menuAd", (url, menu) => { const m = menu.find((x) => x.url === url); return m ? m.ad : ""; });

  // Koleksiyonlar: ana başlıklar (sıraya göre), konular (en yeni önce)
  eleventyConfig.addCollection("gruplarSirali", (c) =>
    c.getFilteredByTag("gruplar").sort((a, b) => (a.data.sira || 99) - (b.data.sira || 99)));
  eleventyConfig.addCollection("konularSirali", (c) =>
    c.getFilteredByTag("konular").sort((a, b) => (b.date - a.date) || a.data.baslik.localeCompare(b.data.baslik, "tr")));

  eleventyConfig.addFilter("grubunKonulari", (konular, g) => konular.filter((k) => k.data.grup === g));
  eleventyConfig.addFilter("digerKonular", (konular, g, url) => konular.filter((k) => k.data.grup === g && k.url !== url));
  eleventyConfig.addFilter("gstil", (gr) => gr ? "--gc-l:" + gr.data.renk + ";--gc-d:" + (gr.data.renkKoyu || gr.data.renk) : "");
  eleventyConfig.addFilter("grupBul", (gruplar, slug) => gruplar.find((g) => g.fileSlug === slug) || null);

  // İçindekiler: ## ve ### başlıklarına bağlantı kimliği ekler, 3 veya daha fazla başlık varsa içindekiler listesi kurar
  eleventyConfig.addTransform("icindekiler", function (icerik) {
    if (!(this.page.outputPath || "").endsWith(".html") || !icerik.includes("<!--TOC-->")) return icerik;
    const basliklar = [];
    const kullanilan = {};
    icerik = icerik.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, seviye, ic) => {
      let id = slugla(ic) || "baslik";
      kullanilan[id] = (kullanilan[id] || 0) + 1;
      if (kullanilan[id] > 1) id += "-" + kullanilan[id];
      basliklar.push({ seviye: Number(seviye), id, metin: ic.replace(/<[^>]+>/g, "") });
      return `<h${seviye} id="${id}">${ic}</h${seviye}>`;
    });
    let toc = "";
    if (basliklar.length >= 3) {
      toc = '<ol class="toc-list">' + basliklar.map((b) =>
        `<li class="s${b.seviye}"><a href="#${b.id}">${b.metin}</a></li>`).join("") + "</ol>";
    }
    if (!toc) {
      return icerik.replace(/<nav class="toc-side"[\s\S]*?<\/nav>/, "").replace(/<details class="toc-top">[\s\S]*?<\/details>/, "");
    }
    return icerik.replace(/<!--TOC-->/g, toc);
  });

  // Sitede arama için dizin (yalnızca yayımlanan konular)
  eleventyConfig.addCollection("aramaDizini", (c) => {
    const grupAdi = {}; c.getFilteredByTag("gruplar").forEach((g) => (grupAdi[g.fileSlug] = g.data.baslik));
    return c.getFilteredByTag("konular").map((k) => ({
      baslik: k.data.baslik, url: k.url, grup: grupAdi[k.data.grup] || "",
      aciklama: k.data.aciklama || "", metin: duzMetin(k.rawInput), tarih: new Date(k.date).toISOString().slice(0, 10)
    }));
  });

  return {
    dir: { input: ".", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
