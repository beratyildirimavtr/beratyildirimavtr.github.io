const AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

module.exports = function (eleventyConfig) {
  // Olduğu gibi kopyalanacak klasörler
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  // Yazı tipleri siteye dahil edilir (Google'dan yüklenmez)
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-{400,600,700}-normal.woff2": "fonts",
    "node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-ext-{400,600,700}-normal.woff2": "fonts",
    "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-{400,500,600}-normal.woff2": "fonts",
    "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-ext-{400,500,600}-normal.woff2": "fonts"
  });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });

  eleventyConfig.addFilter("tarihTR", (d) => {
    const x = new Date(d);
    return x.getUTCDate() + " " + AYLAR[x.getUTCMonth()] + " " + x.getUTCFullYear();
  });
  eleventyConfig.addFilter("isoTarih", (d) => new Date(d).toISOString().slice(0, 10));

  // Kararlar, yeniden eskiye
  eleventyConfig.addCollection("kararSirali", (c) =>
    c.getFilteredByTag("kararlar").sort((a, b) => b.date - a.date)
  );
  // Konular, alfabetik
  eleventyConfig.addCollection("konuSirali", (c) =>
    c.getFilteredByTag("konular").sort((a, b) => a.data.baslik.localeCompare(b.data.baslik, "tr"))
  );
  // Sitede arama için dizin
  eleventyConfig.addCollection("aramaDizini", (c) => {
    const konuAdi = {};
    c.getFilteredByTag("konular").forEach((k) => (konuAdi[k.fileSlug] = k.data.baslik));
    const kararlar = c.getFilteredByTag("kararlar").map((d) => ({
      tur: "Karar",
      baslik: d.data.baslik,
      url: d.url,
      konu: konuAdi[d.data.konu] || "",
      metin: ((d.data.ozet || "") + " " + (d.rawInput || "")).replace(/\s+/g, " ").trim(),
      madde: d.data.madde || ""
    }));
    const konular = c.getFilteredByTag("konular").map((k) => ({
      tur: "Konu",
      baslik: k.data.baslik,
      url: k.url,
      konu: k.data.kategori || "",
      metin: (k.data.aciklama || "") + " " + (k.rawInput || "").replace(/\s+/g, " ").trim(),
      madde: (k.data.maddeler || []).join(" ")
    }));
    return konular.concat(kararlar);
  });
  eleventyConfig.addFilter("head", (dizi, n) => dizi.slice(0, n));
  eleventyConfig.addFilter("kararSayisi", (kararlar, id) => kararlar.filter((d) => d.data.konu === id).length);
  eleventyConfig.addFilter("konuninKararlari", (kararlar, id) => kararlar.filter((d) => d.data.konu === id));

  return {
    dir: { input: ".", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk"
  };
};
