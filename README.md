# Welo Website

Marketing site for the fictitious cybersecurity company **Welo**, built with Node.js and Express.

## Local development

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## PostgreSQL setup (Products page data source)

1. Create a PostgreSQL database (example name: `welo_site`).
2. Copy environment template and update values:

```bash
cp .env.example .env
```

Set `DATABASE_URL` in `.env` for your Postgres instance.

3. Run schema and seed scripts:

```bash
psql "$DATABASE_URL" -f sql/schema.sql
psql "$DATABASE_URL" -f sql/seed_products.sql
```

4. Start the app:

```bash
npm install
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/welo_site" npm start
```

The Products page at `/products` now reads from PostgreSQL via `/api/products`.
Adding a new row to `products` automatically appears on the page.

## Deployment (Heroku)

This app uses a **release phase** to apply `sql/schema.sql` and `sql/seed_products.sql` on every deploy (idempotent). `DATABASE_URL` is set automatically when you attach **Heroku Postgres**.

### One-time: Heroku CLI and app

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and log in:

   ```bash
   heroku login
   ```

2. From the project root, create the app (pick a unique name or omit `--app` to get a random name):

   ```bash
   cd "/Users/tdurand/My Drive/Salesforce/Development/welo-site"
   heroku create your-welo-site-name
   ```

3. Add **Heroku Postgres** so `DATABASE_URL` is set automatically:

   - **Dashboard:** App → **Resources** → **Add-ons** → search **Heroku Postgres** → add a plan that fits your org, **or**
   - **CLI:** `heroku addons:create heroku-postgresql --app your-welo-site-name` (plan may prompt or default; confirm in the dashboard).

   The app enables SSL for Postgres when `NODE_ENV=production` (Heroku sets this by default).

4. Deploy once from your machine (optional if you use GitHub-only deploys next):

   ```bash
   git push heroku main
   ```

   Or skip this and use **GitHub automatic deploys** only (below).

5. Open the site:

   ```bash
   heroku open --app your-welo-site-name
   ```

### Best practice: auto-deploy from GitHub

1. In the [Heroku Dashboard](https://dashboard.heroku.com), open your app.
2. Go to **Deploy** → **Deployment method** → **GitHub**.
3. Click **Connect to GitHub**, authorize, then select your repo (e.g. `tracedurand/welo-site`).
4. Choose the branch to deploy (usually `main`).
5. Click **Enable Automatic Deploys** for that branch.

After this, every **push to GitHub** on that branch triggers a new Heroku build. The **release** process runs `scripts/release.js` (schema + seed) before the new **web** dyno starts.

Optional: enable **Wait for CI to pass** if you add GitHub Actions later.

### Files Heroku uses

- `Procfile` — `release` (migrations) and `web` (Node server)
- `package.json` — `npm install` + `npm start` (via `web` process)

## Deployment (Render)

This repo includes `render.yaml` for one-click Blueprint deploy.

1. Push this project to GitHub.
2. In Render, create a new Blueprint service from the repo.
3. Render will use:
   - Build command: `npm install`
   - Start command: `npm start`

## SEO / social assets

- Favicon: `public/assets/favicon.png`
- Social image: `public/assets/social-preview.jpg`
- Robots: `public/robots.txt`
- Sitemap: `public/sitemap.xml`

## Final launch checklist

- Replace `https://welo-security.com` in:
  - `public/index.html` (canonical + og:url)
  - `public/robots.txt` (sitemap URL)
  - `public/sitemap.xml` (loc URL)
- Optionally add additional pages and routes to sitemap.
