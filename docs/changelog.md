---
title: Changelog
description: Release history for Pure Blog.
date: 2024-01-01
---

## v3.3.0

### New Features

- **Image library** — new admin page listing all uploaded images as a thumbnail grid, sortable newest-first with pagination (32 per page). Each image shows its folder slug, a copy-markdown button, and a delete button. Deleting an image that is referenced in a post or page shows a warning with links to the relevant editors. A filename search field filters the grid in real time.

### Improvements

- **Feature images** — each image attached to a post or page now has a checkbox to mark it as the feature image. The feature image overrides the site-wide OG image in meta tags and is available as `feature_image` in custom themes. Only one image can be set at a time; switching to a different image shows a confirmation prompt.
- New pages now default to excluded from the navigation menu.
- The editor sidebar now scrolls independently when its content is taller than the viewport, making attached images accessible without scrolling the entire page.

### Maintenance

- Removed 5 unused CSS selectors from `admin.css` (`.form-actions`, `.admin-search`, `.notice.notice-filter`, `.settings-grid`, `.settings-column`).
- Added English placeholder translation strings for all new Images library keys across all 10 non-English language packs.
