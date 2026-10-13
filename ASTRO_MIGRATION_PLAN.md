# Astro migration implementation plan

Prepared for GPT Sol 6.1 on October 13, 2026.

## Objective and agreed decisions

Migrate this personal website from Eleventy and Handlebars to a statically generated Astro site. Preserve the existing content, public URLs, and visual design while replacing the build and quality tooling.

The following decisions are settled:

- Use the latest stable Astro and Tailwind CSS available when implementation begins. Do not install prereleases. Tailwind 4.3.3 was the latest stable release observed during planning; verify again before installing.
- Use TypeScript for project code, Astro frontmatter, content configuration, and executable framework configuration.
- Prefer JSON configuration when supported, and configuration inside `package.json` when the tool supports it.
- Store Prettier configuration in the `prettier` property of `package.json`.
- Use `tsconfig.json`, `astro.config.ts`, and `eslint.config.ts`. Use `jiti` to load the ESLint TypeScript configuration through the documented Node.js path.
- Use npm and commit the updated `package-lock.json`.
- Remove Wireit entirely; use npm scripts directly.
- Include cached Prettier formatting/checking for Astro and Tailwind, and cached ESLint checking/fixing for Astro and TypeScript.
- Expose `start` for development. Do not add `dev` or `preview` scripts.
- Use ordinary Markdown, with no MDX integration or MDX files.
- Use static Astro components only. Do not add islands, hydration directives, React, Preact, Vue, server rendering, or a deployment adapter.
- Preserve the current design and personal copy. This is a migration, not a redesign or content refresh.

Implement the plan in the current repository. This document does not authorize publishing a deployment or changing external Vercel project settings. Complete and verify repository changes; report any external setting changes that remain necessary. Do not create another chat or delegate to subagents unless separately instructed.

## Current repository baseline

The initial inspection found:

- Eleventy 1, Handlebars layouts/partials, and 18 Markdown posts in `src/blog/`.
- `.eleventy.js` defines collections, UTC date helpers, grouping, icons, image copying, syntax highlighting, and HTML minification.
- `src/blog/blog.11tydata.json` defines dated post permalinks.
- `src/index.hbs` displays three recent posts; `src/blog.hbs` groups the archive by year.
- `src/_includes/` contains base/post layouts and reusable partials.
- `src/_data/author.json` supplies author/site information. An analytics JSON file exists; do not introduce tracking merely because that file exists.
- `src/feed.11ty.js` generates `/feed.xml`; `src/sitemap.11ty.js` generates `/sitemap.xml`.
- `src/img/profile.jpg` and `src/img/cover.jpg` are copied to `/img/`.
- Tailwind 3 uses the typography plugin and system-preference dark mode.
- `package.json` uses Wireit for separate site and CSS builds/watchers. Prettier already uses a cache but has an obsolete Handlebars override.
- `vercel.json` configures `X-Content-Type-Options: nosniff` and `X-Frame-Options: deny` headers. Preserve these.
- No test or CI configuration was identified in the initial inspection. Recheck before making assumptions.

Re-read applicable `AGENTS.md` files and inspect the working tree before implementation. Preserve unrelated user changes. Treat this baseline as a starting point, not a substitute for current inspection.

## Phase 1: Capture observable behavior

1. Install the existing lockfile dependencies and attempt an existing production build before replacing them.
2. Capture the generated route inventory and representative output outside the source paths being migrated. Include the homepage, archive, all post paths, RSS, and sitemap.
3. Record the current date/slug mapping for all posts. Dates currently come from `YYYY-MM-DD-` filename prefixes, not explicit frontmatter dates. Confirm Eleventy's actual generated filenames instead of assuming its slug behavior.
4. Record ordering within the homepage and yearly groups, including deterministic handling of equal dates.
5. Record existing feed metadata, entry order, dates, links, descriptions, author fields, and categories. Record sitemap URLs and meaningful modification dates.
6. Capture or inspect representative desktop/mobile pages in both light and dark modes. Include a post with code and one with embedded HTML or images.
7. If the legacy build fails because of old dependencies/runtime compatibility, document the exact failure and reconstruct what can be established from source. Do not claim baseline parity that could not be checked.

Keep temporary baseline output out of the final committed source tree. Avoid incidental updates to personal copy or old blog posts.

## Phase 2: Install the new stack

Resolve current stable releases together and verify Node engine requirements and peer dependency compatibility before choosing the runtime. Use the same supported Node version locally and in deployment documentation. Do not use `--force` or `--legacy-peer-deps` to hide incompatibilities.

Expected packages:

| Purpose | Packages |
| --- | --- |
| Static site and feed | `astro`, `@astrojs/rss` |
| TypeScript checking | `typescript`, `@astrojs/check` |
| Tailwind | `tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/typography` |
| Formatting | `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss` |
| Linting | `eslint`, `@eslint/js`, `typescript-eslint`, `eslint-plugin-astro`, `eslint-config-prettier`, `jiti` |

Add other packages only when a concrete implementation need exists. Keep ESLint core and its companion packages compatible. Use current documentation for the installed versions rather than copying older flat-config examples without checking exports.

Set `"type": "module"` in `package.json`. Add a supported Node constraint in `engines` and document the actual version used for verification.

Configure `astro.config.ts` with:

- `site: "https://pspeter3.com"`.
- Static output, preferably explicit for clarity.
- The `@tailwindcss/vite` plugin in Vite configuration.
- Trailing-slash behavior consistent with the captured route baseline; verify XML endpoint behavior separately.
- No UI framework, MDX integration, or server adapter.

Extend `astro/tsconfigs/strict` in `tsconfig.json`. Include generated Astro declarations and project TypeScript files, and exclude generated build output. Ensure root TypeScript configuration files are covered by the type-checking scope. Use a separate compiler check only if evidence shows `astro check` leaves relevant TypeScript unchecked.

## Phase 3: Migrate source and content

Target structure; component names can be adjusted to fit the existing templates:

```text
public/
  img/
    profile.jpg
    cover.jpg
src/
  components/
    Header.astro
    Navigation.astro
    SocialLink.astro
    PostList.astro
    PostListItem.astro
    Icon.astro
  content/
    blog/
      YYYY-MM-DD-slug.md
  content.config.ts
  data/
    author.json
  layouts/
    BaseLayout.astro
    PostLayout.astro
  lib/
    posts.ts
  pages/
    index.astro
    blog/
      index.astro
      [year]/[month]/[day]/[slug].astro
    feed.xml.ts
    sitemap.xml.ts
  styles/
    global.css
astro.config.ts
eslint.config.ts
tsconfig.json
```

### Content collection and route generation

- Use the current build-time content collection API with `glob()` from `astro/loaders` and a schema in `src/content.config.ts`.
- Keep posts as `.md`. Do not introduce MDX to support ordinary HTML already present in Markdown.
- Validate required titles and the optional description/tags fields found in existing content. Inspect actual values before defining a schema that might reject legitimate posts.
- Preserve filenames. Derive and validate each post's UTC publication date and slug from its filename. Validate calendar dates, not just the shape of the filename.
- Explicitly configure or verify loader entry IDs so filename-derived metadata remains available; do not assume the default ID retains every filename detail.
- Put shared date parsing, canonical post path construction, and deterministic ordering in `src/lib/posts.ts`. All route, listing, feed, and sitemap code must use the same mapping.
- Generate every dated route with `getStaticPaths()` and render Markdown with the content collection rendering API for the installed Astro version.
- Keep the existing `/blog/YYYY/MM/DD/slug/` paths exactly. Do not substitute flattened `/blog/slug/` paths or retain the filename date twice.
- Format displayed dates explicitly in UTC and use a consistent English locale to avoid machine-dependent output.
- Preserve the homepage's three newest posts and the archive's descending year groups. Match the recorded ordering inside each group.

### Layouts and assets

- Port existing metadata, social metadata, microdata, links, titles, and descriptions into typed layout/component props.
- Handle missing optional descriptions without rendering `undefined` or inventing new copy.
- Preserve the current responsive layout, typography, system dark mode, and accessible navigation labels.
- Render the existing small icon set as static SVG. Prefer local SVG markup/components; avoid a client runtime just for icons. Remove `feather-icons` if it is no longer used.
- Move images to `public/img/` without changing their public paths or introducing unrelated image optimization work.
- Use Astro's Markdown syntax highlighting and compare code blocks against the baseline. Preserve raw HTML and embedded content where supported, checking any legacy template syntax found in posts.

### RSS and sitemap

- Implement `/feed.xml` with `@astrojs/rss`, preserving meaningful existing channel and item metadata and all canonical dated links.
- Implement `/sitemap.xml` as a static TypeScript endpoint to retain the exact public endpoint and explicit date handling. Escape XML correctly and emit an appropriate content type.
- Include the intended canonical HTML pages and avoid accidental duplicate entries. Document any correction to malformed or irrelevant legacy sitemap entries.
- Do not invent modification dates from the current build time. Preserve meaningful dates established by the source/baseline; omit unsupported values.

## Phase 4: Tailwind migration

Import `src/styles/global.css` from the base layout. Its initial content should be:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

Use Tailwind's Vite integration; do not install the obsolete `@astrojs/tailwind` integration or retain a separate Tailwind CLI watcher. Use CSS-based configuration if custom theme settings become necessary.

Review the Tailwind 3-to-4 upgrade guide and adjust renamed utilities and changed defaults deliberately. Existing examples include `flex-shrink-0`, `focus:ring`, and `focus:outline-none`; check their current equivalents and visual/keyboard-focus behavior. Also compare borders, spacing, colors, and typography styles. Preserve media-query-based dark mode and the existing `prose`/dark prose behavior.

Delete `tailwind.config.js` once its behavior is represented. Remove direct PostCSS, autoprefixer, and minifier dependencies that are no longer used. Transitive dependencies in the lockfile are not evidence that cleanup failed.

## Phase 5: Formatting, linting, and caches

### Prettier

Store this configuration in `package.json`, replacing the Handlebars override:

```json
{
  "prettier": {
    "plugins": [
      "prettier-plugin-astro",
      "prettier-plugin-tailwindcss"
    ],
    "tailwindStylesheet": "./src/styles/global.css",
    "overrides": [
      {
        "files": "*.astro",
        "options": {
          "parser": "astro"
        }
      }
    ]
  }
}
```

Keep the Tailwind plugin last. Include Astro, TypeScript, JSON, CSS, Markdown, and executable configuration in the formatting scope. Update `.prettierignore` for output, generated files, and caches. Preserve content semantics if formatting Markdown changes line wrapping.

### ESLint

Use `eslint.config.ts`, importing `defineConfig` from `eslint/config` where appropriate for the installed release. Install `jiti` as a development dependency, with at least the minimum version required by ESLint. Do not use experimental native-TypeScript ESLint flags for this plan.

- Configure recommended JavaScript, TypeScript, and Astro rules with explicit file scopes.
- Ensure both root configuration files and `src/**/*.ts` are linted.
- Ensure `**/*.astro` is included when executing `eslint .`.
- Preserve Astro's outer parser and use the TypeScript parser for Astro frontmatter. Do not accidentally override Astro parsing with a global TypeScript parser configuration.
- Start with syntax-based TypeScript lint rules. `astro check` supplies the separate type-checking step; do not enable type-aware lint rules without accounting for their cross-file cache invalidation behavior.
- Put `eslint-config-prettier` after overlapping rule configurations to disable formatting conflicts.
- Run Prettier separately, not through `eslint-plugin-prettier`.
- Ignore `dist/`, `.astro/`, dependency directories, and cache artifacts using flat-config global ignores.
- Confirm the configuration applies to real `.astro` and `.ts` files, including TypeScript inside frontmatter, rather than passing because files were silently ignored.

### Cache policy

Use each tool's native content-based cache. ESLint's default `.eslintcache` should be ignored by Git and other tools; Prettier's default cache lives under `node_modules/.cache/prettier/`.

Document a command to clear these two caches. Clear caches after dependency/plugin upgrades, relevant configuration changes, and changes to Tailwind stylesheet/theme inputs that can affect class sorting. Prettier does not include plugin versions in its cache keys, and per-file caches do not necessarily track external stylesheet inputs.

For migration acceptance, run from cleared caches, then rerun to check warm-cache behavior. If CI caches are added later, key them on the lockfile, runtime, tool configurations, and Tailwind stylesheet inputs. Do not introduce a new task runner just to manage caches.

## Phase 6: Replace scripts and remove legacy tooling

Use these npm scripts:

```json
{
  "scripts": {
    "start": "astro dev",
    "build": "astro build",
    "format": "prettier . --write --cache --cache-strategy content",
    "format:check": "prettier . --check --cache --cache-strategy content",
    "lint": "eslint . --cache --cache-strategy content --max-warnings 0",
    "lint:fix": "npm run lint -- --fix",
    "typecheck": "astro check",
    "check": "npm run format:check && npm run lint && npm run typecheck",
    "fix": "npm run lint:fix && npm run format"
  }
}
```

`build` compiles the site; `check` runs the explicit quality gate. Validation and deployment instructions should run `npm run check && npm run build`. `start` is the only development-server script. Do not add `dev` or `preview`.

Remove:

- The `wireit` dependency and configuration property, all Wireit script references, and the obsolete `.wireit/` ignore entry.
- Eleventy and its syntax-highlighting plugin, `.eleventy.js`, Handlebars files, Eleventy data configuration, and old feed/sitemap generators once replacements are verified.
- The old `rss` and `sitemap` packages if replaced completely.
- Unused direct dependencies such as `autoprefixer`, `cssnano`, `htmlnano`, `postcss`, `svgo`, and `terser`; audit actual usage before removal.
- The old `_site/` output and corresponding ignore entry after baseline comparisons are finished.

Update `.gitignore` for `node_modules/`, `dist/`, `.astro/`, and `.eslintcache`. Do not ignore source files or the npm lockfile.

## Phase 7: Validation and delivery

Run meaningful checks without introducing a large test framework solely for this migration:

1. A clean `npm ci` succeeds with the selected supported Node version.
2. `npm run fix` completes; subsequent formatting checks pass.
3. With caches cleared, `npm run check && npm run build` passes.
4. Warm-cache formatting and lint runs pass. Temporarily introduce a representative formatting issue and lint violation in `.astro` and `.ts` files, confirm the appropriate tools detect each after warming caches, and fully revert those temporary edits.
5. A deliberate temporary TypeScript error is caught by `npm run typecheck`; revert it.
6. Compare the generated route inventory with the baseline. All 18 posts are present at the original URLs, with valid dates and no duplicate paths.
7. Verify homepage selection, archive grouping/order, feed entries, XML validity, canonical links, metadata, image paths, and local navigation.
8. Check representative light/dark and desktop/mobile rendering, including keyboard focus and a code-heavy post. Tailwind upgrades must not silently alter the intended appearance.
9. Confirm generated pages do not include island hydration or an unnecessary client framework bundle.
10. Verify the npm lockfile is consistent, legacy executable configuration is gone, and all remaining direct dependencies have a purpose.

If adding durable tests, keep them focused on observable migration risks: filename-to-URL/date mapping, post ordering, and route/feed consistency. Avoid tests that merely repeat configuration literals.

Preserve `vercel.json` security headers. Document the required Vercel configuration: Astro framework preset, a compatible Node runtime, the chosen check/build command, and `dist/` output. Inspect external settings only if access is available; do not claim they have been updated or verified otherwise. A server adapter is unnecessary for the planned static output.

Expand `README.md` with installation, runtime requirements, `start`, `build`, `check`, `fix`, content authoring conventions, dated URL behavior, and cache invalidation instructions.

The final implementation report should summarize what changed, commands actually run and their results, any baseline or deployment verification limits, and any remaining work. Do not report unexecuted checks as passing. Do not publish, push, or create a PR unless separately requested.

## Reference documentation

Recheck current documentation against the installed package versions during implementation:

- Astro TypeScript: https://docs.astro.build/en/guides/typescript/
- Astro content collections: https://docs.astro.build/en/guides/content-collections/
- Astro editor/formatter guidance: https://docs.astro.build/en/editor-setup/
- Tailwind with Astro: https://tailwindcss.com/docs/installation/framework-guides/astro
- Tailwind upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Tailwind latest stable release: https://github.com/tailwindlabs/tailwindcss/releases/latest
- Tailwind Prettier plugin: https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- Prettier CLI and caching: https://prettier.io/docs/cli
- Astro ESLint plugin: https://ota-meshi.github.io/eslint-plugin-astro/user-guide/
- ESLint TypeScript configuration: https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files
- ESLint CLI and caching: https://eslint.org/docs/latest/use/command-line-interface
