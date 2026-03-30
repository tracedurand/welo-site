# Welo Website

Marketing site for the fictitious cybersecurity company **Welo**, built with Node.js and Express.

## Local development

```bash
npm install
npm start
```

Open `http://localhost:3000`.

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
