---
title: How to Create a Tag Cloud
description: How to Create a Tag Cloud in Pure Blog.
date: 2026-03-14
---

This post will guide you through creating your very own tag cloud on your Pure Blog powered site. As with most things in Pure Blog, it's really straightforward.

## Step 1: create the tag cloud file

The first thing you need to do is create the tag cloud file within your Pure Blog instance. This will include the PHP logic that pulls all of the tags from across your site and displays them.

This file will live at `/content/includes/tag-cloud.php`

```php
<?php

declare(strict_types=1);

$tagIndex  = load_tag_index();
$originalNames = [];
$tagCounts = [];
if ($tagIndex) {
    foreach ($tagIndex as $slug => $entry) {
        $originalNames[$slug] = $entry['name'];
        $tagCounts[$slug] = is_array($entry['posts'] ?? null) ? count($entry['posts']) : count($entry);
    }
}
uksort($tagCounts, function (string $a, string $b) use ($originalNames): int {
    return strcasecmp($originalNames[$a] ?? $a, $originalNames[$b] ?? $b);
});
$maxCount = $tagCounts ? max($tagCounts) : 1;
$minCount = $tagCounts ? min($tagCounts) : 1;
$range    = $maxCount > $minCount ? $maxCount - $minCount : 1;

$pageTitle       = 'Tag Cloud';
$metaDescription = 'Browse all the tags on my site.';

require PUREBLOG_BASE_PATH . '/includes/header.php';
render_masthead_layout($config, ['page' => null]);
?>
<main>
    <h1>Tag Cloud</h1>

    <?php if (empty($tagCounts)): ?>
        <p>No tags found.</p>
    <?php else: ?>
        <p class="tag-cloud">
            <?php foreach ($tagCounts as $slug => $count):
                $name     = $originalNames[$slug] ?? $slug;
                $ratio    = ($count - $minCount) / $range;
                $fontSize = round(0.85 + $ratio * 1.4, 2);
                $postWord = $count === 1 ? 'post' : 'posts';
                echo '<a href="/tag/' . e(rawurlencode((string) $slug)) . '"'
                   . ' style="font-size: ' . $fontSize . 'em"'
                   . ' title="' . e((string) $count) . ' ' . $postWord . '">'
                   . e($name) . ' (' . e((string) $count) . ')' . '</a>' . '  ';
            endforeach; ?>
        </p>
    <?php endif; ?>
</main>
<?php render_footer_layout($config, ['page' => null]); ?>
</body>
</html>
```

This code will loop through all of the tags in all of your posts and will create a tag cloud where the text is larger depending on how many times that tag has been used. It will also display the number of times the tag has been used too.

## Step 2: add some CSS

Now you have the tag cloud, you'll want to add some simple formatting. Add this to `/content/css/custom.css`:

```css
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
}

.tag-cloud a {
  white-space: nowrap;
  text-transform: uppercase;
}
```

This should format the items in your tag cloud nicely. If you want to see a working example, take a look at the [discover page](https://kevquirk.com/discover) on my website.

## Step 3: custom route

Next you will need to add a custom route so that your visitors have a URL they can visit to see your tag cloud. Head to **Admin → Settings** and add this to the **Custom Routes** section:

```
/tag-cloud | /content/includes/tag-cloud.php
```

This will ensure that whenever someone visits `/tag-cloud` on your site, they are presented with your tag cloud.

## Step 4: there is no step 4!

That's it! You now have a fully working tag cloud on your Pure Blog powered site. If you want to add it to your site's navigation menu, you can add a custom nav item from settings with something like:

```
Tag Cloud | /tag-cloud
```
