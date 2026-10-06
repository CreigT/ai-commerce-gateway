const stops = [];

module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST." });
    return;
  }
  const expected = process.env.OVERRIDE_TOKEN || "";
  if (!expected) {
    res.status(503).json({ error: "Set OVERRIDE_TOKEN in Vercel before this button can work." });
    return;
  }
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};
  if (body.token !== expected) {
    res.status(401).json({ error: "Token does not match." });
    return;
  }
  const reason = String(body.reason || "").slice(0, 500);
  stops.push({ at: new Date().toISOString(), reason });
  console.log(JSON.stringify({ event: "emergency_stop", at: stops.at(-1).at, reason }));
  res.status(200).json({
    message: "Stop recorded in the logs. Pause the Stripe payment links if money must stop now. This page cannot cancel Stripe by itself."
  });
};
