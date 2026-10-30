const fs = require("fs");
const { execSync } = require("child_process");
const matter = require("gray-matter");

// Dosya adı Türkçe harf, boşluk ya da büyük harf içerse bile sayfa adresi temiz çıkar
const slugla = (s) => String(s).toLocaleLowerCase("tr").replace(/ç/g,"c").replace(/ğ/g,"g").replace(/ı/g,"i")
  .replace(/ö/g,"o").replace(/ş/g,"s").replace(/ü/g,"u").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

// İçeriği boş olan ya da ana başlığı (grup) yazılmamış konu dosyaları yayımlanmaz.
function yayimlanmaz(data) {
  if (!data.grup) return true;
  try {
    return !matter(fs.readFileSync(data.page.inputPath, "utf8")).content.trim();
  } catch (e) {
    return true;
  }
}

// Dosyanın son değiştirildiği tarih (git geçmişinden)
function sonGuncelleme(data) {
  try {
    const t = execSync('git log -1 --format=%cI -- "' + data.page.inputPath + '"', { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    return t || undefined;
  } catch (e) {
    return undefined;
  }
}

module.exports = {
  layout: "konu.njk",
  tags: ["konular"],
  date: "git Created",
  eleventyComputed: {
    permalink: (data) => (yayimlanmaz(data) ? false : "/konu/" + slugla(data.page.fileSlug) + "/"),
    eleventyExcludeFromCollections: (data) => yayimlanmaz(data),
    aktifMenu: (data) => "/" + data.grup + "/",
    guncelleme: (data) => sonGuncelleme(data)
  }
};
