---
title: How to Create A Blog Archive
description: How to create a blog archive with Pure Blog
date: 2026-03-29
---

This post will guide you through creating an archive page that will display posts by year.

## Step 1: create the archive file

First, create the archive template at `/content/includes/archive.php`. This file contains the logic to pull all your published posts, group them by year, and display them.

```php
<?php
declare(strict_types=1);

$allPosts = get_all_posts(false);
$postsByYear = [];

foreach ($allPosts as $entry) {
    $year = !empty($entry['date']) ? date('Y', strtotime((string) $entry['date'])) : 'Unknown';
    $postsByYear[$year][] = $entry;
}

krsort($postsByYear, SORT_NATURAL);

$pageTitle = 'Archive';
$metaDescription = 'Browse all published posts by year.';
?>
<?php require PUREBLOG_BASE_PATH . '/includes/header.php'; ?>
<?php render_masthead_layout($config); ?>
<main>
    <article>
        <h1>Archive</h1>
        <p><?= e((string) count($allPosts)) ?> published posts.</p>

        <?php if (!$allPosts): ?>
            <p>No published posts yet.</p>
        <?php else: ?>
            <?php foreach ($postsByYear as $year => $yearPosts): ?>
                <h2><?= e((string) $year) ?> (<?= e((string) count($yearPosts)) ?>)</h2>
                <ul>
                    <?php foreach ($yearPosts as $postItem): ?>
                        <li>
                            <a href="<?= e(base_path()) ?>/<?= e((string) ($postItem['slug'] ?? '')) ?>"><?= e((string) ($postItem['title'] ?? 'Untitled')) ?></a><?php if (!empty($postItem['date'])):
                                $dt = parse_post_datetime_with_timezone((string) $postItem['date'], $config);
                            ?>
                                <small>
                                    <time datetime="<?= e($dt ? $dt->format('c') : (string) $postItem['date']) ?>">
                                        <?= e(format_post_date_for_display((string) $postItem['date'], $config)) ?>
                                    </time>
                                </small>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endforeach; ?>
        <?php endif; ?>
    </article>
</main>
<?php render_footer_layout($config); ?>
</body>
</html>
```

The posts are grouped by year (most recent first), with a count shown next to each year heading. Each post links to its permalink and shows its publication date in whatever format you have configured in **Admin → Settings**.

## Step 2: add a custom route

Head to **Admin → Settings** and add the following to the **Custom Routes** field:

```
/archive | /content/includes/archive.php
```

This tells Pure Blog to serve your archive template whenever someone visits `/archive` on your site.

## Step 3: there is no step 3!

That's it! You now have a working archive page. If you want to add it to your site's navigation menu, add a custom nav item in **Admin → Settings**:

```
Archive | /archive
```
