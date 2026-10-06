const { publicConfig } = require("../lib/public-config");

module.exports = function handler(_req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(publicConfig());
};
