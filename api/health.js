module.exports = function handler(_req, res) {
  res.status(200).json({
    ok: true,
    module: "public-commerce-gateway",
    time: new Date().toISOString()
  });
};
