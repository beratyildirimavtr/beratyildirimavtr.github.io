// CSS dosyasını her sayfaya doğrudan gömer: ayrı bir CSS isteği olmadığı için
// sayfa render'ı engellenmez (PageSpeed "Oluşturma engelleme istekleri").
const fs = require("fs");
const path = require("path");
module.exports = () =>
  fs.readFileSync(path.join(__dirname, "..", "css", "stil.css"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\n\s*/g, "")
    .replace(/\s*([{};])\s*/g, "$1")
    .trim();
