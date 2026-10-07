module.exports = {
  layout: "karar.njk",
  tags: ["kararlar"],
  eleventyComputed: {
    // Örnek içerikler, site "yayinda": true yapıldığında otomatik olarak yayından çıkar
    permalink: (data) => (data.ornek && data.site.yayinda ? false : "/karar/" + data.page.fileSlug + "/"),
    eleventyExcludeFromCollections: (data) => !!(data.ornek && data.site.yayinda),
    aktifMenu: () => "/yargitay-kararlari/"
  }
};
