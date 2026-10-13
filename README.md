# pspeter3.com

Personal website built with Astro and Tailwind CSS.

Use Node 24 or 26.

```sh
npm ci
npm run start          # Local development
npm run check          # Formatting, linting, and types
npm run build          # Static output in dist/
```

Add posts in `src/content/blog/YYYY-MM-DD-slug.md` with a `title` in
frontmatter; `description` and `tags` are optional. Store images in `public/img/`
and reference them as `/img/...`.

Deploy to Cloudflare Pages with build command `npm run check && npm run build`
and output directory `dist`. Use the Node version in `.node-version`.
