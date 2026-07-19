---
title: Bear Blog Importer
description: How to import your Bear Blog content into Pure Blog using the importer tool.
date: 2026-03-24
---

This guide will show you how to import your [Bear Blog](https://bearblog.dev) content into Pure Blog. The process is fairly simple and should only take a few minutes.

All the files mentioned below are available [on GitHub](https://github.com/kevquirk/pureblog-importers).

## BearBlog — Web UI

*Original concept by [David (justdaj)](https://github.com/justdaj).*

Copy `import_bearblog.php` to your Pure Blog root, then visit:

```
https://yourblog.com/import_bearblog.php
```

You must be logged in to the Pure Blog admin.

### Before you start

1. Export your posts from BearBlog in **Markdown** format
2. Create the folder `content/posts/import/` in your Pure Blog install
3. Copy your exported `.md` files into that folder

The importer walks you through three steps:

1. **Instructions** — confirms your files are in the right place
2. **Preview** — shows what will be imported, with warnings for drafts and posts containing images
3. **Results** — summary of what was imported

The search and tag indexes are rebuilt automatically.

### What gets imported

- Posts only (pages are skipped)
- Title, slug, published date, tags, meta description, content
- Draft/published status

### Images

Posts containing images are saved as **draft** by default so you can verify the image URLs are correct before publishing. There is an option on the preview screen to publish them immediately if you're confident the URLs are already right.
