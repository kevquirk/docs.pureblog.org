---
title: Pagecord Importer
description: How to import your Pagecord content into Pure Blog using the importer tool.
date: 2026-03-24
---

This guide will show you how to import your [Pagecord](https://pagecord.com) content into Pure Blog. The process is fairly simple and should only take a few minutes.

All the files mentioned below are available [on GitHub](https://codeberg.org/kevquirk/pureblog-importers).

## Pagecord — Web UI

*Original concept by [David (justdaj)](https://github.com/justdaj).*

Copy `import_pagecord.php` to your Pure Blog root, then visit:

```
https://yourblog.com/import_pagecord.php
```

You must be logged in to the Pure Blog admin.

### Before you start

1. Export your posts from Pagecord in **Markdown** format
2. Create the folder `content/posts/import/` in your Pure Blog install
3. Copy your exported `.md` files into that folder

The importer walks you through two steps:

1. **Preview** — shows what will be imported, with warnings for unpublished posts and posts containing images
2. **Results** — summary of what was imported

The search and tag indexes are rebuilt automatically.

### What gets imported

- Title, slug, published date, tags, meta description, content
- Draft/published status

### Images

Posts containing images are saved as **draft** by default so you can verify the image URLs are correct before publishing. There is an option on the preview screen to publish them immediately if you're confident the URLs are already right.

Note: Pagecord does not distinguish between posts and pages. After importing, check your dashboard and delete anything that should not be a post. {.notice}
