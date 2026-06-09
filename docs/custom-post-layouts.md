---
title: Custom Post Layouts
description: How to use custom post layouts in Pure Blog.
date: 2026-03-10
---

Layouts let you create custom post templates with their own fields. A book review, a recipe, a film review; anything that needs structured data beyond a standard blog post.

## How it works

1. Create a `.php` template file in `/content/layouts/`
2. Optionally create a matching `.json` file to define custom editor fields
3. When creating a new post, Pure Blog will prompt you to choose a layout if any exist
4. You can set `layout: name` in a post's frontmatter to use a custom layout on an existing post

## Creating a layout template

Create `/content/layouts/my-layout.php`. The file is a standard PHP/HTML template. Three variables are available:

| Variable | Type | Description |
|---|---|---|
| `$post` | `array` | The post data, including all custom fields |
| `$config` | `array` | The site configuration |
| `$adjacentPosts` | `array` | Previous/next posts (`$adjacentPosts['previous']`, `$adjacentPosts['next']`) |

### Helper functions

| Function | Description |
|---|---|
| `render_markdown($post['content'])` | Renders a markdown string as HTML |
| `render_post_navigation()` | Renders previous/next post navigation and tags |
| `format_post_date_for_display((string) $post['date'], $config)` | Formats a post date for display |
| `e($value)` | Escapes a value for safe HTML output — always use this for user content |

### Minimal example

```php
<article>
    <h1><?= e($post['title']) ?></h1>
    <?= render_markdown($post['content']) ?>
    <?= render_post_navigation() ?>
</article>
```

### Example with custom fields

```php
<article class="book-review">
    <h1><?= e($post['title']) ?></h1>

    <div class="book-meta">
        <p><b>Author:</b> <?= e($post['author']) ?></p>
        <p><b>Genre:</b> <?= e($post['genre']) ?></p>
    </div>

    <?= render_markdown($post['content']) ?>
    <?= render_post_navigation() ?>
</article>
```

## Defining custom fields (optional)

Create `/content/layouts/my-layout.json` alongside the `.php` file to add custom fields to the post editor.

```json
{
    "label": "Display name in the layout picker",
    "fields": [
        { "name": "author", "label": "Author", "type": "text" },
        { "name": "summary", "label": "Book Summary", "type": "markdown" },
        { "name": "genre", "label": "Genre", "type": "select", "options": [
            "Fiction",
            "Non-fiction"
        ] },
        { "name": "recommended", "label": "Recommended", "type": "checkbox" }
    ]
}
```

The `name` of each field becomes the key on `$post` in your template, e.g. `name: "author"` is accessed as `$post['author']`.

### Customising default fields

By default, the default fields (`title` and `content`) are rendered at the top of the editor. Starting in v3.4.1, you can include them in the `fields` array to customise their sequence, label, or display order relative to your custom fields:

```json
{
    "label": "Book Post",
    "fields": [
        { "name": "title", "label": "Book Title", "type": "text" },
        { "name": "author", "label": "Author", "type": "text" },
        { "name": "summary", "label": "Book Summary", "type": "markdown" },
        { "name": "genre", "label": "Genre", "type": "select", "options": [
            "Fiction",
            "Non-fiction"
        ] },
        { "name": "recommended", "label": "Recommended", "type": "checkbox" },
        { "name": "content", "label": "My thoughts", "type": "markdown" }
    ]
}

```

- When `title` or `content` are specified in the layout JSON, their default input boxes at the top of the editor are hidden, and they are rendered inline exactly where they are declared in the layout.
- The standard `title` and `content` fields will still save and autosave as normal.


### Field types

| Type | Description |
|---|---|
| `text` | Single-line text input |
| `markdown` | Multi-line CodeMirror editor with markdown and HTML support |
| `select` | Dropdown menu — requires an `options` array |
| `checkbox` | Checkbox — value is `"1"` when checked, `""` when unchecked |

### `select` options

Options are defined as a string array. The stored value is the selected string.

```json
{ "name": "genre", "label": "Genre", "type": "select", "options": [
    "Fiction",
    "Non-fiction",
    "Biography"
] }
```

### `checkbox` usage in templates

```php
<?php if ($post['recommended'] === '1'): ?>
    <p>Recommended</p>
<?php endif; ?>
```

<!-- screenshot: custom fields in the post editor -->

## Custom functions

Layout templates have access to any functions defined in `/content/functions.php`. Create this file to add your own helpers without modifying the Pure Blog core.

See [custom functions docs](/custom-functions) for details.

## The layout picker

When at least one layout exists in `/content/layouts/`, clicking **New post** in the dashboard opens a picker instead of going straight to the editor. You can choose a layout or select **Default post** for a standard post with no custom fields.

If a custom layout is selected in the editor, the layout's fields will be displayed. If you haven't explicitly positioned the default `title` and `content` fields in the layout configuration, they will show at the top with custom fields displayed below them. Otherwise, they will display in the exact order configured in the layout JSON.

<!-- screenshot: layout picker modal -->

## Example: book review

`/content/layouts/book.json`

```json
{
    "label": "Book review",
    "fields": [
        { "name": "author", "label": "Author", "type": "text" },
        { "name": "year", "label": "Year published", "type": "text" },
        { "name": "rating", "label": "Rating (e.g. 4/5)", "type": "text" },
        { "name": "summary", "label": "Summary", "type": "markdown" },
        { "name": "genre", "label": "Genre", "type": "select", "options": [
            "Fiction",
            "Non-fiction",
            "Biography",
            "Science",
            "History",
            "Other"
        ] },
        { "name": "recommended", "label": "Recommended", "type": "checkbox" }
    ]
}
```

`/content/layouts/book.php`

```php
<article class="book-review">
    <h1><?= e($post['title']) ?></h1>

    <div class="book">
        <p>
            <b>Author:</b> <?= e($post['author']) ?><br>
            <b>Published:</b> <?= e($post['year']) ?><br>
            <b>Genre:</b> <?= e($post['genre']) ?><br>
            <b>Rating:</b> <?= e($post['rating']) ?><br>
            <b>Reviewed:</b> <time><?= e(format_post_date_for_display((string) $post['date'], $config)) ?></time>
        </p>
        <?= render_markdown($post['summary']) ?>
    </div>

    <?= render_markdown($post['content']) ?>
    <?= render_post_navigation() ?>
</article>
```
