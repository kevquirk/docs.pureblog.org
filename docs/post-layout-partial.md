---
title: Post Layout Partial
description: Version 1.3.0 of Pure Blog now supports layout partials for posts, where you can inject your own content beneath your blog posts.
date: 2026-02-08
---

Pure Blog version 1.3.0 includes an updated `/post.php` file that adds support for a new partial layout called `post-meta.php`. The default version of this file lives at `/includes/layouts/post-meta.php` and, by default, only outputs tags.

You can override this by creating your own `post-meta.php` file in `/content/includes/post-meta.php`, allowing you to add whatever extra content you want after your posts. This is useful for things like comment forms, email links, or call-out boxes.

For example, you could add post navigation links like this:

```
<div class="post-nav">
  <div>
    <?php if (!empty($previous_post)): ?>
      <p>⬅ The one before<br>
      <a class="pagination-links" href="/<?= e((string) ($previous_post['slug'] ?? '')) ?>">
        <?= e((string) ($previous_post['title'] ?? '')) ?>
      </a></p>
    <?php endif; ?>
  </div>

  <div class="post-nav-next">
    <?php if (!empty($next_post)): ?>
      <p>Up next ➡<br>
      <a class="pagination-links" href="/<?= e((string) ($next_post['slug'] ?? '')) ?>">
        <?= e((string) ($next_post['title'] ?? '')) ?>
      </a></p>
    <?php endif; ?>
  </div>
</div>
```

At the moment only `post-meta.php` is supported, but I'll likely add other partials in the future.
