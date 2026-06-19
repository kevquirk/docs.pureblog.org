---
title: Pure Blog Importers
description: How to import your content from other providers to Pure Blog.
date: 2026-03-23
---

Switching to Pure Blog from another platform shouldn't mean leaving your content behind. The [Pure Blog Importers](https://codeberg.org/kevquirk/pureblog-importers) repository is a collection of standalone import tools that make it straightforward to bring your existing posts and pages across.

## What's available

### WordPress

Two versions are available depending on your setup:

**Web UI** — a PHP file you drop into your Pure Blog root and run from the browser, just like any other admin page. It walks you through uploading your WordPress export, previewing what will be imported, and running the import. Tags, images, SEO descriptions, and page structure all come across. Indexes are rebuilt automatically.

**Command line** — for importing into a fresh Pure Blog install before it's running, or if you prefer the terminal. Supports a `--dry-run` flag so you can see exactly what will happen before committing.

<p><a class="button" href="/wordpress-importer">Read WordPress importer docs</a></p>

### Ghost

A web UI importer for Ghost exports. Export your content as a JSON file from Ghost, drop the file into your server or upload it, and the importer handles the rest. It supports posts, pages, tags, feature images, inline images, and SEO descriptions.

<p><a class="button" href="/ghost-importer">Read Ghost importer docs</a></p>

### BearBlog

A web UI importer for BearBlog exports. Export your posts as Markdown from BearBlog, drop the files into a folder, and the importer handles the rest. Posts containing images are flagged and saved as drafts so you can verify the image URLs before publishing.

*Thanks to [David (justdaj)](https://github.com/justdaj) for the original BearBlog importer concept.*

<p><a class="button" href="/bear-blog-importer">Read Bear Blog importer docs</a></p>

### Pagecord

A web UI importer for Pagecord exports. Export your posts as Markdown from Pagecord, drop the files into a folder, and the importer handles the rest. Posts containing images are flagged and saved as drafts so you can verify the image URLs before publishing.

*Thanks to [David (justdaj)](https://github.com/justdaj) for the original Pagecord importer concept.*

<p><a class="button" href="/pagecord-importer">Read Pagecord importer docs</a></p>

## More importers

The repository is open to contributions. If you've migrated from a platform that isn't listed here and want to help others do the same, pull requests are welcome.

Full usage instructions for each importer are in the [repository README](https://codeberg.org/kevquirk/pureblog-importers).
