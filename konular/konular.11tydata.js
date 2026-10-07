module.exports = {
  layout: "konu.njk",
  tags: ["konular"],
  permalink: (data) => "/konu/" + data.page.fileSlug + "/"
};
