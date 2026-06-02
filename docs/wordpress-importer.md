---
title: WordPress Importer
description: How to use the WordPress importer tool.
date: 2026-03-24
---

This guide will show you how to import your WordPress posts, pages and images into Pure Blog. The process is fairly simple and should only take a few minutes.

All the files mentioned below are available [on GitHub](https://codeberg.org/kevquirk/pureblog-importers).

## WordPress — Web UI

Copy `import_wordpress.php` to your Pure Blog root, then visit:

```
https://yourblog.com/import_wordpress.php
```

You must be logged in to the Pure Blog admin. The importer walks you through three steps:

1. **Upload** — upload the WXR export file, or enter the path to a file already on your server (useful for large exports that exceed PHP's upload limit)
2. **Preview** — review what will be imported, with a count of posts, pages, drafts, and items containing images
3. **Results** — summary of what was imported, with any image failures logged to `content/wp-import-errors.log`

The search and tag indexes are rebuilt automatically.

### Getting your WordPress export

In WordPress admin: **Tools → Export → All content → Download Export File**. This gives you a `.xml` file (WXR format).

### What gets imported

- Posts and pages
- Categories and tags → merged into Pure Blog tags
- Images → downloaded or copied locally, URLs rewritten in content
- SEO descriptions → from Yoast, Rank Math, SEOPress, or AIOSEO if present
- Post content → Gutenberg markup stripped, HTML converted to Markdown

Drafts are skipped by default.

### Images

The web importer can handle images in two ways:

1. **Path to `wp-content/uploads`** (recommended) — enter the server path to your WP uploads folder and files will be copied directly. Fastest and most reliable.
2. **HTTP download** — if no path is provided, the importer will try to download images from the URLs in the export. Requires those URLs to be publicly accessible.

If your WP site was restored from a backup or migrated to a new domain, the image URLs in the export may still point to the old domain. Use the uploads path option in that case. {.notice}

## WordPress — Command Line

Useful when setting up a fresh Pure Blog install before it's running, or if you prefer the terminal. The search and tag indexes will need to be rebuilt manually afterwards by opening and saving a post in the admin.

Copy `cli_import_wordpress.php` to the root of your Pure Blog installation.

### Usage

```
php cli_import_wordpress.php <export.xml> <path-to-pureblog> [options]
```

### Options

- `--uploads-dir` - Path to WP's `wp-content/uploads` folder — copies images locally instead of downloading
- `--drafts` - Also import draft posts (default: published only)
- `--no-pages` - Skip importing pages
- `--no-images` - Skip importing images entirely
- `--dry-run` - Preview what would be imported without writing any files

### Examples

```
# Basic import (downloads images from the live WP site)
php cli_import_wordpress.php export.xml /var/www/pureblog

# Import using a local uploads folder (recommended)
php cli_import_wordpress.php export.xml /var/www/pureblog --uploads-dir /var/www/wordpress/wp-content/uploads

# Preview without writing anything
php cli_import_wordpress.php export.xml /var/www/pureblog --dry-run

# Include drafts, skip images
php cli_import_wordpress.php export.xml /var/www/pureblog --drafts --no-images
```
