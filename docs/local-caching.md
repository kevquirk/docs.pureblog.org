---
title: Local Caching
description: Instructions on how to setup and manage caching with Pure Blog
date: 2026-03-02
---

From v1.7.0, Pureblog now supports an optional on-disk HTML cache. When enabled, rendered pages are written to a `/cache/` directory on first visit and served directly on subsequent requests, skipping all file reads and Markdown parsing.

**To enable**, go to **Admin → Settings → Cache** and check *Enable page cache*.

## RSS caching

The RSS feed (`/feed.php`) is cached separately with a configurable TTL. The default is 3600 seconds (1 hour). Set it to `0` to disable RSS caching independently of the page cache.

**To configure**, set *RSS cache duration* (in seconds) in **Admin → Settings → Cache**.

## Automatic cache invalidation

The cache is cleared automatically whenever content changes — on post save, page save, post delete, or page delete. No manual intervention needed during normal publishing.

## Clear Cache button

A **Clear cache** button appears in the admin navigation when caching is enabled. Useful if you've made changes outside the admin (e.g. editing files directly on the server).

## Cache timestamp comment

Each cached HTML page includes a comment at the bottom indicating when it was cached:

```html
<!-- Cached at 2026-03-02 14:23:11 UTC -->
```

The RSS feed includes the equivalent as an XML comment before the closing `</rss>` tag.

## Notes

- The `/cache/` directory is ignored by Git via `.gitignore`.
- Pages returning a non-200 status (404s, redirects) are never cached.
- Paginated pages (`/?page=2` etc.) are cached as separate entries.
- Search results (`?q=...`) are never cached.
- Admin sessions are not affected — the cache is public-only.
