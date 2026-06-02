---
title: Core Functions Reference
description: Reference docs for the core functions available in Pure Blog.
date: 2026-03-10
---

Functions available in layout templates and `/content/functions.php`. Internal, admin, and infrastructure functions are omitted.

## Output & escaping

### `e(string $value): string`

Escapes a string for safe HTML output. Always use this when outputting user-generated content.

```php
<?= e($post['title']) ?>
```

### `render_markdown(string $markdown): string`

Renders a markdown string as HTML. Processes shortcodes, liquid loops, and fenced code blocks.

```php
<?= render_markdown($post['content']) ?>
```

### `render_markdown_fragment(string $markdown): string`

Renders markdown without wrapping block elements. Useful for short inline content like summaries.

```php
<?= render_markdown_fragment($post['summary']) ?>
```

### `get_excerpt(string $markdown, int $length = 200): string`

Returns a plain-text excerpt from a markdown string, truncated to `$length` characters.

```php
<?= e(get_excerpt($post['content'], 150)) ?>
```

## Layout helpers

### `render_post_navigation(): string`

Renders previous/next post navigation and the post's tag list. Uses the current layout context — no arguments needed inside a layout template. Navigation is across all published posts regardless of layout.

```php
<?= render_post_navigation() ?>
```

### `render_tag_links(array $tags): string`

Renders an array of tags as linked HTML.

```php
<?= render_tag_links($post['tags']) ?>
```

### `render_layout_partial(string $name, array $context = []): string`

Renders a partial template by name. Looks in `/content/includes/` first, then `/includes/`. The `$context` array is extracted into the partial's scope.

```php
<?= render_layout_partial('my-partial', ['post' => $post]) ?>
```

### `layout_context(): array`

Returns the current layout context array with keys `post`, `config`, and `adjacentPosts`. Useful if you need to access these inside a nested function call.

```php
$ctx = layout_context();
$post = $ctx['post'];
```

## Posts & pages

### `get_all_posts(bool $includeDrafts = false): array`

Returns all posts, sorted by date descending. Each post is an array with keys: `title`, `slug`, `date`, `status`, `tags`, `description`, `content`, plus any custom layout fields.

```php
$posts = get_all_posts();
```

### `get_post_by_slug(string $slug, bool $includeDrafts = false): ?array`

Returns a single post by slug, or `null` if not found.

```php
$post = get_post_by_slug('my-post');
```

### `get_adjacent_posts_by_slug(string $slug, bool $includeDrafts = false): array`

Returns `['previous' => ..., 'next' => ...]` for the post with the given slug. Either value may be `null`.

```php
$adjacent = get_adjacent_posts_by_slug($post['slug']);
$prev = $adjacent['previous'];
$next = $adjacent['next'];
```

### `get_all_pages(bool $includeDrafts = false): array`

Returns all pages.

```php
$pages = get_all_pages();
foreach ($pages as $page) {
    echo e($page['title']);
}
```

### `get_page_by_slug(string $slug, bool $includeDrafts = false): ?array`

Returns a single page by slug, or `null` if not found.

```php
$page = get_page_by_slug('about');
if ($page) {
    echo e($page['title']);
}
```

### `filter_posts_by_query(array $posts, string $query): array`

Filters a posts array by a search query string (searches title, content, tags, description).

```php
$results = filter_posts_by_query(get_all_posts(), 'php');
```

### `paginate_posts(array $posts, int $perPage, int $currentPage): array`

Returns a slice of posts for the given page. Returns `['posts' => [...], 'total' => int, 'total_pages' => int]`.

```php
$paged = paginate_posts($posts, 10, 1);
```

## Dates

### `format_post_date_for_display(?string $value, array $config): string`

Formats a post date string for display using the site's configured date format.

```php
<?= e(format_post_date_for_display((string) $post['date'], $config)) ?>
```

### `format_datetime_for_display(?string $value, array $config, ?string $format = null): string`

Formats a date/time string. Pass a custom `$format` (PHP `date()` format) to override the site default.

```php
<?= e(format_datetime_for_display($post['date'], $config, 'Y')) ?>
```

## Utilities

### `get_base_url(): string`

Returns the site's base URL (e.g. `https://example.com`).

```php
$url = get_base_url() . '/' . $post['slug'];
```

### `slugify(string $value): string`

Converts a string to a URL-safe slug.

```php
$slug = slugify('Hello World'); // 'hello-world'
```

### `get_layouts(): array`

Returns all available layouts from `/content/layouts/`. Each entry has `name`, `label`, and `fields`.

```php
$layouts = get_layouts();
```
