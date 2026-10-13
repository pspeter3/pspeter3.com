# pspeter3.com

Personal website, built as static HTML with Astro and Tailwind CSS. Astro's Sätteri processor is configured explicitly to preserve the existing Markdown punctuation. No client framework, hydration, analytics, deployment adapter, or MDX is used.

## Development

Use Node **24 LTS** (verified with **24.21.0**, npm **12.0.2**). Install from the committed lockfile:

```sh
npm ci
npm run start
```

`start` runs the local Astro development server. The production output is `dist/`:

```sh
npm run check && npm run build
```

`check` runs cached Prettier checking, cached ESLint checking, and Astro's TypeScript checker. `npm run fix` runs ESLint fixes followed by formatting. Individual commands are `format`, `format:check`, `lint`, `lint:fix`, and `typecheck`.

## Content

Add ordinary Markdown in `src/content/blog/`, named `YYYY-MM-DD-slug.md`. Dates must be valid calendar dates; slugs use lowercase letters, numbers, and hyphens. Frontmatter requires `title`; `description` (string) and `tags` (string array) are optional. Keep images in `public/img/` and reference them at `/img/...`.

The filename supplies the UTC publication date and the dated `/blog/YYYY/MM/DD/slug/` URL. `src/lib/posts.ts` shares this mapping across pages, RSS, and sitemap, rejects duplicate URLs, and sorts by publication date then filename. The homepage shows the newest three posts. The archive shows posts in reverse chronological order within descending years; RSS uses the same reverse chronological order.

Six existing URLs have an explicit legacy date exception in `src/lib/posts.ts`. Eleventy's Liquid date filter generated the preceding day for these winter posts while displayed dates and feed dates remained UTC. These public URLs stay unchanged; new posts use their actual filename date. Do not remove these exceptions without planning redirects.

## Caches

ESLint uses `.eslintcache`; Prettier uses `node_modules/.cache/prettier/`. Clear both after dependency/plugin upgrades, tool configuration changes, or changes to the Tailwind stylesheet/theme:

```sh
rm -f .eslintcache
rm -rf node_modules/.cache/prettier
```

Prettier's cache does not track plugin versions or all external stylesheet inputs. Run `npm run check && npm run build` after clearing caches for acceptance. Future CI cache keys should include the lockfile, Node version, tool configurations, and `src/styles/global.css`.

## Deployment

Configure Cloudflare Pages with the **Astro** framework preset, build command **`npm run check && npm run build`**, and build output directory **`dist`**. The repository's `.node-version` selects **Node 24.21.0**, matching local verification. Remove or align any existing `NODE_VERSION` environment override in both production and preview settings.

Astro copies `public/_headers` into `dist/_headers`, where Cloudflare Pages applies the `X-Content-Type-Options: nosniff` and `X-Frame-Options: DENY` security headers to all routes. No adapter or Pages Functions are required for this static site. External project settings have not been changed or verified, and this migration does not publish a deployment.

See Cloudflare's [Astro deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/), [build runtime configuration](https://developers.cloudflare.com/pages/configuration/build-image/), and [static response headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Migration notes

The Eleventy baseline built successfully on Node 26.5.0 before migration. All 18 original dated post routes are retained, together with `/`, `/blog/`, `/feed.xml`, and `/sitemap.xml`. Markdown posts and image files are preserved. Static SVGs replace the Feather runtime; Tailwind 3 colors and the three-pixel navigation focus ring are preserved using Tailwind 4 configuration and utilities. Code highlighting now uses Astro's Shiki with the Nord theme instead of Prism; code text remains unchanged.

RSS keeps channel title/description, titles, UTC publication dates, and Dublin Core author names, with newest-first ordering. Its relative legacy item links are corrected to absolute canonical links. The legacy feed emitted no descriptions or categories because these values were absent from its generated items; optional descriptions are now supported. Content tags remain available in the collection. The sitemap contains only canonical HTML pages, removes the legacy feed/self entries, retains the posts' original date values, and omits unsupported file/build-time dates on the homepage and archive.

The installed typography plugin pins an older `postcss-selector-parser` with a moderate npm audit advisory. Compatible `npm audit fix` resolved the separate high-severity picomatch advisory; no forced dependency downgrade was used. Recheck upstream typography releases before changing the dependency.
