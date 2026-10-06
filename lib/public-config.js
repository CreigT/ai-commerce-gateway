const ALLOWED = new Set([
  "buy.stripe.com",
  "checkout.stripe.com"
]);

function publicConfig() {
  const product = (n) => ({
    name: process.env[`PRODUCT_${n}_NAME`] || ["Field Notes Pack", "Desk Calendar PDF", "Supplier Checklist"][n - 1],
    price: process.env[`PRODUCT_${n}_PRICE`] || ["18", "12", "9"][n - 1],
    blurb: process.env[`PRODUCT_${n}_BLURB`] || "A digital good the store can deliver after payment.",
    link: safeLink(process.env[`PRODUCT_${n}_LINK`])
  });
  return {
    storeName: process.env.STORE_NAME || "Northline Goods",
    tagline: process.env.STORE_TAGLINE || "A small store that runs itself. You own it. You do not operate it.",
    supportEmail: process.env.SUPPORT_EMAIL || "owner@example.com",
    statusNote: process.env.STATUS_NOTE || "Waiting for your variables. The pages already work.",
    prices: {
      starter: process.env.PRICE_STARTER || "29",
      growth: process.env.PRICE_GROWTH || "99",
      house: process.env.PRICE_HOUSE || "299"
    },
    linksReady: {
      starter: Boolean(safeLink(process.env.STRIPE_LINK_STARTER)),
      growth: Boolean(safeLink(process.env.STRIPE_LINK_GROWTH)),
      house: Boolean(safeLink(process.env.STRIPE_LINK_HOUSE))
    },
    products: [product(1), product(2), product(3)]
  };
}

function safeLink(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !ALLOWED.has(url.hostname)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

module.exports = { publicConfig, safeLink };
