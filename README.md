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
