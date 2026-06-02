---
title: Layout Partials
description: Starting with version 1.4.0 of Pure Blog, I've added support for layout partials on the site header and footer.
date: 2026-02-10
---

Starting with version 1.4.0 of Pure Blog, I've added support for broader layout partials over the original [post layout partial](https://pureblog.org/post-layout-partial). I've standardised a lot of the layout code so that you can now use 5 types of layout partial:

1. `masthead.php` - this is the visible header of your site (title, nav etc.) so you can create your own which will fully replace the default header code. **Note:** I would recommend taking a copy of `/includes/masthead.php` and using that as the basis of your own header.
2. `footer.php` - allows for a custom footer. Again, you can use the default `/includes/footer.php` to work from.
3. `post-meta.php` - [as before](https://pureblog.org/post-layout-partial) allows for injecting your own code below your posts. Great for adding things like comments, call out boxes, and customising the default post navigation section.
4. `header.php` - override the HTML `<head>` output for all pages.
5. `post-list.php` - override how posts are listed on the homepage, tag pages, and search results. Take a copy of `/includes/post-list.php` as your starting point.

If you want to create your own partials, they need to be stored in the `/content/includes` folder, and be named *exactly* as above.

<p class="notice warning">In version 1.3.1 this was <code>/content/layouts</code> so you will need to update <code>layouts</code> to <code>includes</code> if you're already using a custom <code>post-meta.php</code> file.</p>
