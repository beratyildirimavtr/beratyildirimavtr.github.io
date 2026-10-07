module.exports = {
  layout: "grup.njk",
  tags: ["gruplar"],
  permalink: (data) => "/" + data.page.fileSlug + "/",
  eleventyComputed: { aktifMenu: (data) => "/" + data.page.fileSlug + "/" }
};
