---
title: Integrating Pure Comments
description: Instructions on how to set up and integrate Pure Comments with Pure Blog
date: 2026-06-19
---

Pure Blog includes a tight, native integration with [Pure Comments](https://docs.purecomments.org/), allowing you to easily host comment threads at the bottom of all your posts.

## How it works

When enabled, Pure Blog automatically injects the Pure Comments container and asynchronous embed script into the template of every blog post. 

The integration explicitly passes the post's unique slug (`data-post-slug`) to the Pure Comments container. This ensures that even if you change your blog's domain name, permalink structure, or URL queries in the future, your comment history remains stable and linked to the correct post thread.

## Enabling Pure Comments

To enable comments on your posts:

1. Log in to your Pure Blog admin dashboard.
2. Navigate to **Settings** → **Site**.
3. Scroll down to the **Community** section.
4. Check the box labeled **Enable Pure Comments**.
5. In the URL input field that appears, enter the base URL of your hosted Pure Comments service (for example, `https://comments.example.com`).
6. Click **Save settings** at the top or bottom of the page.

*Note: The system will automatically strip any trailing slash from the comments URL to prevent link structure issues.*

## Theming & Styling

Pure Comments loads its own styles asynchronously via `embed.js`. To customize the appearance of comments (colors, spacing, fonts) to match your Pure Blog theme:

1. Copy the example [comments.css](https://github.com/kevquirk/purecomments/blob/main/public/comments.css) from the Pure Comments repository.
2. Save it to your blog's stylesheet folder (e.g. `/content/css/comments.css`) or paste the contents into your existing custom stylesheet.
3. If saved as a separate file, you can load it on all pages by adding the link tag to **Admin** → **Settings** → **Header Injects** under *Post head HTML*:

   ```html
   <link rel="stylesheet" href="/content/css/comments.css">
   ```
