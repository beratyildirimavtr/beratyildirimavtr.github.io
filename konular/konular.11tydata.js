const fs = require("fs");
const matter = require("gray-matter");

// İçeriği boş olan ya da ana başlığı (grup) yazılmamış konu dosyaları yayımlanmaz.
function yayimlanmaz(data) {
  if (!data.grup) return true;
  try {
    const metin = matter(fs.readFileSync(data.page.inputPath, "utf8")).content;
    return !metin.trim();
  } catch (e) {
    return true;
  }
}

module.exports = {
  layout: "konu.njk",
  tags: ["konular"],
  date: "git Created",
  eleventyComputed: {
    permalink: (data) => (yayimlanmaz(data) ? false : "/konu/" + data.page.fileSlug + "/"),
    eleventyExcludeFromCollections: (data) => yayimlanmaz(data),
    aktifMenu: (data) => "/" + data.grup + "/"
  }
};
