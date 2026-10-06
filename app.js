async function loadConfig() {
  const fallback = {
    storeName: "Northline Goods",
    tagline: "A small store that runs itself. You own it. You do not operate it.",
    supportEmail: "owner@example.com",
    prices: { starter: "29", growth: "99", house: "299" },
    linksReady: { starter: false, growth: false, house: false },
    products: [
      { name: "Field Notes Pack", price: "18", blurb: "A short digital guide the store can deliver after payment." },
      { name: "Desk Calendar PDF", price: "12", blurb: "A printable year, sent by the store after checkout." },
      { name: "Supplier Checklist", price: "9", blurb: "A one-page buying checklist." }
    ],
    statusNote: "Waiting for your variables. The pages already work."
  };
  try {
    const res = await fetch("/api/config");
    if (!res.ok) return fallback;
    const data = await res.json();
    return { ...fallback, ...data };
  } catch {
    return fallback;
  }
}

function money(amount) {
  const n = String(amount || "0").replace(/[^0-9.]/g, "");
  return "$" + n;
}

document.addEventListener("DOMContentLoaded", async () => {
  const config = await loadConfig();
  document.querySelectorAll("[data-store]").forEach((el) => { el.textContent = config.storeName; });
  document.querySelectorAll("[data-tagline]").forEach((el) => { el.textContent = config.tagline; });
  document.querySelectorAll("[data-email]").forEach((el) => {
    el.textContent = config.supportEmail;
    if (el.tagName === "A") el.href = "mailto:" + config.supportEmail;
  });
  document.querySelectorAll("[data-status]").forEach((el) => { el.textContent = config.statusNote; });
  ["starter", "growth", "house"].forEach((tier) => {
    document.querySelectorAll(`[data-price="${tier}"]`).forEach((el) => {
      el.textContent = money(config.prices[tier]);
    });
    document.querySelectorAll(`[data-buy="${tier}"]`).forEach((el) => {
      el.href = "/api/checkout?tier=" + tier;
      if (!config.linksReady[tier]) el.setAttribute("data-missing", "true");
    });
  });
  const list = document.querySelector("[data-products]");
  if (list) {
    list.innerHTML = config.products.map((p) => `
      <article class="card">
        <span class="tag">Digital good</span>
        <h3>${p.name}</h3>
        <p class="muted">${p.blurb}</p>
        <p class="price">${money(p.price)} <span>one time</span></p>
        <a class="btn" href="${p.link || "/pricing.html"}">${p.link ? "Buy" : "See plans"}</a>
      </article>
    `).join("");
  }
  const missing = document.querySelector("[data-missing-note]");
  if (missing) {
    const open = Object.entries(config.linksReady).filter(([, ready]) => !ready).map(([k]) => k);
    missing.textContent = open.length
      ? "Payment links still open: " + open.join(", ") + ". Add those variables in Vercel, then the buttons charge for real."
      : "All three payment links are set. Checkout is live.";
  }
});
