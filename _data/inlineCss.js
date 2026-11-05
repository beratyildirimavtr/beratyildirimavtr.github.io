// CSS dosyasını her sayfaya doğrudan gömmek için kullanılır: ayrı bir CSS isteği
// olmadığı için sayfanın görünmesi hiçbir dosyayı beklemez. Düzenlemek için hâlâ
// css/stil.css dosyasını değiştirmeniz yeterli, bu dosyaya dokunmanıza gerek yok.
const fs = require("fs");
const path = require("path");
module.exports = () =>
  fs.readFileSync(path.join(__dirname, "..", "css", "stil.css"), "utf8")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\n\s*/g, "")
    .replace(/\s*([{};:,])\s*/g, "$1")
    .trim();
