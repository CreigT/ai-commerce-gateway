# Day module — Public Commerce Gateway and Reasonable Paywall

Assumes every prior agent desk exists. This module is the only human-readable door.

1. Module name: Public Commerce Gateway and Reasonable Paywall.
2. Purpose: Give customers a store they can understand, and give the owner a variable sheet instead of an operator console.
3. Business value: First revenue path. Browse is free. Three plans and three digital goods can take payment through Stripe Payment Links.
4. Agent responsibilities: Gateway publishes config, redirects checkout, records emergency stops. Sales, support, books, and compliance consume the events later.
5. Inputs: Environment variables, Stripe payment links, override token, visitor clicks.
6. Outputs: HTML pages, public config JSON, checkout redirect, health JSON, stop log.
7. APIs: GET /api/config, GET /api/checkout?tier=, GET /api/health, POST /api/override.
8. MCP tools: none required to run. Stripe Payment Links are the payment tool. GitHub and Vercel are the deploy tools.
9. Databases: none in this module. Stop events go to platform logs. Later days add Postgres.
10. Memory: stateless. No customer memory in the browser beyond the page.
11. Security: payment links restricted to buy.stripe.com and checkout.stripe.com. Override token compared on the server. No card data.
12. Failure recovery: missing link returns a plain error. Bad token returns 401. Unset token returns 503. Pages still render with defaults.
13. Agent communications: config is the contract other agents read. Checkout is a redirect, not an agent call.
14. Workflow: visitor reads catalog → picks plan → /api/checkout → Stripe → success page. Owner sets variables or posts an emergency stop.
15. Data flow: Vercel env → config function → page. Card data stays at Stripe.
16. Decision logic: show price from env. Enable buy only for an https Stripe host. Stop only if token matches.
17. Escalation: money pause is owner-only. Agents may not change payment links.
18. KPIs: checkout clicks, successful Stripe sessions, config-ready plans, emergency stops.
19. Logging: override handler writes a JSON log line. Vercel holds the request log.
20. Audit trail: stop reason and time. No token in the log.
21. Compliance: plain privacy, refund, and owner policy page. Not a substitute for counsel.
22. Expansion: customer portal, webhook ledger, live agent status.
23. Risks: payment link pasted wrong, token reused, in-memory stop list resets on cold start.
24. Testing: open each page, call /api/health, call checkout with and without a link, post override with bad and missing token.
25. Production checklist: variables set, three Stripe links, success URL, token set, domain connected.
26. Stack: HTML, CSS, small Node functions, Vercel, Stripe Payment Links.
27. Cost: Vercel hobby or Pro, Stripe fees on successful charges. No model cost in this module.
28. Deployment: import repo, add env, redeploy.
29. Maintenance: change copy only if the contract changes. Prices change through variables.
30. More automation: webhook that marks a plan active, and a Monday cash note emailed to SUPPORT_EMAIL.
