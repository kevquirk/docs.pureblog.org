---
title: Ghost Importer
description: How to use the Ghost importer tool.
date: 2026-06-19
---

This guide will show you how to import your Ghost posts, pages, tags, feature images, and inline images into Pure Blog. The process is fairly simple and should only take a few minutes.

All the files mentioned below are available [on GitHub](https://codeberg.org/kevquirk/pureblog-importers).

## Ghost — Web UI

Copy `import_ghost.php` to your Pure Blog root, then visit:

```
https://yourblog.com/import_ghost.php
```

You must be logged in to the Pure Blog admin. The importer walks you through three steps:

1. **Upload** — Upload your Ghost JSON export file, or enter the path to the file already on your server (useful for large exports that exceed PHP's upload limit).
2. **Preview** — Review what will be imported, with a count of posts, pages, drafts, and items containing images.
3. **Results** — Summary of what was imported, with any image failures logged to `content/ghost-import-errors.log`.

The search and tag indexes are rebuilt automatically.

### Getting your Ghost export

In your Ghost admin dashboard: **Settings → Labs → Export your content → Export**. This gives you a `.json` file.

### What gets imported

- **Posts and Pages**: Distinguished and saved appropriately under the correct directory paths.
- **Tags**: Extracted from Ghost's relationships and mapped to Pure Blog tags.
- **Feature Images & Inline Images**: Downloaded or copied locally, URLs rewritten in the content/metadata.
- **SEO descriptions**: Extracted from Ghost's `posts_meta` table (with fallback to `custom_excerpt` from the post table).
- **Post content**: Compiled Lexical/Mobiledoc HTML output converted directly to Markdown, with Ghost card comment block markers stripped.

### Images

The web importer can handle images in two ways:

1. **Path to Ghost `content/images` folder** — Enter the server path to your Ghost `content/images` folder and files will be copied directly. This is the fastest and most reliable method if your files are on the same server.
2. **HTTP download** — If no local path is provided, you can enter your Ghost blog's Site URL (e.g. `https://myblog.com`), and the importer will attempt to download the images from the live site via HTTP.

If you don't use either option, relative image URLs in the content (like `/content/images/...`) will be skipped from downloading and left as-is. {.notice}
