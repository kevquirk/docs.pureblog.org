---
title: WriteFreely Importer
description: How to import your WriteFreely content into Pure Blog using the importer tool.
date: 2026-09-02
---

This guide will show you how to import your [WriteFreely](https://writefreely.org) posts into Pure Blog. The process is straightforward and should only take a few minutes.

All the files mentioned below are available [on GitHub](https://github.com/kevquirk/pureblog-importers).

## WriteFreely — Web UI

Copy `import_writefreely.php` to your Pure Blog root, then visit:

```
https://yourblog.com/import_writefreely.php
```

You must be logged in to the Pure Blog admin.

### Before you start

1. Export your posts from WriteFreely in **CSV** format by navigating to **Customize → Export data → Posts (.csv)** in your WriteFreely blog settings.
2. Upload the exported `.csv` file on the importer page, or place it directly into `content/posts/import/` on your server.

The importer walks you through three steps:

1. **Upload** — Upload your CSV export file or specify a path to the file already on your server.
2. **Preview** — Shows what will be imported, with post counts, publish dates, tag extraction, and image warnings.
3. **Results** — Summary of what was imported and any issues encountered.

The search and tag indexes are rebuilt automatically.

### What gets imported

- **Title, slug, published date, and content**: Preserved directly from your WriteFreely export.
- **Tags**: Hashtags found in post bodies (e.g. `#journal`, `#minimalism`) are automatically extracted into Pure Blog tags.
- **Draft/published status**: WriteFreely exports published posts; you can optionally choose to import all posts as drafts.

### Images

Posts containing images are saved as **draft** by default so you can verify the image URLs are correct before publishing. There is an option on the preview screen to publish them immediately if you are happy with the URLs as they are.
