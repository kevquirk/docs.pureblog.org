---
title: Custom Functions
description: How to use custom functions in Pure Blog.
date: 2026-03-10
---

Pure Blog loads `/content/functions.php` automatically if it exists. Use it to define your own PHP helper functions without modifying the Pure Blog core files.

## How it works

Create `/content/functions.php` in your site. It is included after all core functions are loaded, so you have full access to everything in the core.

```php
<?php

function my_helper(): string
{
    return 'Hello!';
}
```

Your functions are then available everywhere — in layout templates, page templates, and custom includes.

## Use cases

- Helper functions for layout templates (e.g. rendering a star rating, formatting a custom field)
- Filters or formatters for post data
- Anything you'd otherwise need to patch into core

## Example: star rating

`/content/functions.php`

```php
<?php

function render_star_rating(string $rating): string
{
    $parts = explode('/', $rating);
    $score = (int) ($parts[0] ?? 0);
    $max = (int) ($parts[1] ?? 5);
    $stars = '';
    for ($i = 1; $i <= $max; $i++) {
        $stars .= $i <= $score ? '★' : '☆';
    }
    return '<span class="star-rating" aria-label="' . e($rating) . '">' . $stars . '</span>';
}
```

`/content/layouts/book.php`

```php
<p><b>Rating:</b> <?= render_star_rating($post['rating']) ?></p>
```

## Notes

- The file is loaded once, after all core functions — you cannot override core functions from here
- Use `<?php` at the top of the file; no closing `?>` needed.
- Keep function names distinct from core functions to avoid conflicts — a namespace prefix like `mysite_` is a safe convention.
- For a full list of available core functions, see [the core functions reference](/core-functions-reference).
