module.exports = {
  layout: "karar.njk",
  tags: ["kararlar"],
  permalink: (data) => "/karar/" + data.page.fileSlug + "/"
};
