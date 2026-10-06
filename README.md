# Northline Goods — public commerce gateway

A plain storefront and paywall for an AI-run commerce company.

You are the legal owner. You are not the operator. Add variables in Vercel, push this repo, and leave the daily work to the agents.

## Deploy

1. Push this folder to GitHub (already prepared if the repo exists).
2. Vercel → Add New → Project → import the repo.
3. Framework preset: Other. No build command. Output is the repo root.
4. Add the variables from `.env.example`.
5. In Stripe, create three Payment Links. Set the success URL to `https://YOUR-DOMAIN/success.html`.
6. Paste those links into `STRIPE_LINK_STARTER`, `STRIPE_LINK_GROWTH`, and `STRIPE_LINK_HOUSE`.
7. Redeploy.

Local preview: `npx serve .` then open the HTML files. `/api/*` routes run on Vercel, not in a static preview.

## Pages

- `/` home
- `/catalog.html` three products from variables
- `/pricing.html` the paywall
- `/how.html` a normal day
- `/agents.html` who does what
- `/operate.html` the only owner desk
- `/legal.html` plain policies

## Do not

Do not put `OVERRIDE_TOKEN` in the HTML. Do not commit `.env`.
