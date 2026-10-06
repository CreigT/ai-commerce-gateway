const { safeLink } = require("../lib/public-config");

const TIERS = {
  starter: "STRIPE_LINK_STARTER",
  growth: "STRIPE_LINK_GROWTH",
  house: "STRIPE_LINK_HOUSE"
};

module.exports = function handler(req, res) {
  const tier = String(req.query.tier || "");
  const key = TIERS[tier];
  const link = key ? safeLink(process.env[key]) : "";
  if (!link) {
    res.status(400).send("This plan is not open yet. The owner still needs to paste the Stripe payment link.");
    return;
  }
  res.writeHead(302, { Location: link });
  res.end();
};
