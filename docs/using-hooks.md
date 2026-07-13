---
title: Using Hooks
description: Learn how Pure Blog hooks let you trigger your own actions when posts and pages change.
date: 2026-02-07
---

Hooks are a simple way to make Pure Blog do *extra things* when something changes on your site. Think of them like little trip‑wires: when a post is published, updated, or deleted, you can run your own code.

You don't need a plugin system or any complicated setup. Just drop a small file into `config/hooks.php`, define the hook functions you care about, and Pure Blog will call them when the matching event happens. You can also define hooks in `content/functions.php` if you prefer to keep them alongside your content.

## What can hooks do?

Here are a few examples of what people typically use hooks for:

- Clear your CDN cache (Bunny, Cloudflare, etc.)
- Ping search engines or IndexNow
- Post to Mastodon, Bluesky, or X when you publish
- Send yourself a notification when something goes live
- Trigger a webhook (Zapier, Make, your own API)
- Rebuild a static index or sitemap
- Add custom shortcodes or embeds to your content (e.g. YouTube, Vimeo)

## How hooks work

Hooks are just regular PHP functions. If a function exists, Pure Blog will call it. If it doesn't, nothing happens.

There are two kinds of hook:

- **Action hooks** are called when an event occurs (post published, etc.). They don't return a value.
- **Filter hooks** are called with a value, let you transform it, and expect the modified value back.

For example, you can add this to `config/hooks.php`:

```php
<?php
function on_post_published(string $slug): void
{
    // do something here
}
```

When you publish a post, Pure Blog will call that function and pass the post slug.

## Available hook events

At the moment, Pure Blog supports these events:

**Action hooks**

- `on_post_published($slug)`
- `on_post_updated($slug)`
- `on_post_deleted($slug)`
- `on_page_published($slug)`
- `on_page_updated($slug)`
- `on_page_deleted($slug)`
- `admin_action_buttons()`
- `on_admin_action($actionId)`
- `on_image_uploaded($path)` — fires after an image is successfully uploaded via the admin editor. Receives the absolute path to the saved file. Useful for converting formats (e.g. WebP), resizing, or optimising images on upload.

**Filter hooks**

- `on_filter_content($markdown)` — transform post/page content after built-in shortcodes are processed but before Markdown conversion. Return the modified string.
- `on_render_markdown($html)` — post-process the rendered HTML after Markdown conversion. Return the modified string.

You can implement any or all of them, it's entirely optional. You can find pre-made examples (like clearing cache with Bunny CDN or posting to Mastodon) on [hooks.pureblog.org](https://hooks.pureblog.org).

## Adding custom admin buttons

You can also add your own action buttons to the admin top nav with hooks.

Use `admin_action_buttons()` to define one or more buttons, then handle the click in `on_admin_action($actionId)`.

```php
function admin_action_buttons(): array
{
    return [
        [
            'id' => 'purge_cache',
            'label' => 'Purge cache',
            'class' => 'delete',
            'confirm' => 'Purge CDN cache now?',
            'icon' => 'circle-x',
        ],
    ];
}

function on_admin_action(string $actionId): array
{
    if ($actionId !== 'purge_cache') {
        return ['ok' => false, 'message' => 'Unknown action.'];
    }

    bunny_purge();
    return ['ok' => true, 'message' => 'CDN cache purge requested.'];
}
```

This is handy for things like manual cache purges, reindexing for search or tags, or other one-click maintenance tasks.

## Transforming content with on_filter_content (v2.0 onward)

The `on_filter_content` filter hook lets you process post and page content before it's converted to HTML. It runs after Pure Blog's own shortcodes, so your code won't interfere with built-in functionality. Content inside fenced code blocks and inline code spans is protected, so you won't accidentally transform example code.

A good use case is adding YouTube (or other) video embeds via a simple shortcode. Add this to `content/functions.php`:

```php
function on_filter_content(string $markdown): string
{
    return preg_replace_callback(
        '/\[youtube:([a-zA-Z0-9_-]+)\]/',
        function (array $m): string {
            $id = htmlspecialchars($m[1], ENT_QUOTES, 'UTF-8');
            return '<iframe width="560" height="315" '
                 . 'src="https://www.youtube-nocookie.com/embed/' . $id . '" '
                 . 'allowfullscreen></iframe>';
        },
        $markdown
    );
}
```

Then in any post or page, write:

```
[youtube:dQw4w9WgXcQ]
```

And it will be replaced with the embedded player when the page renders.

## Post-processing HTML with on_render_markdown

The `on_render_markdown` filter hook runs after Markdown has been converted to HTML, giving you access to the final rendered output. This is useful when you need to work with the HTML directly rather than the Markdown source — syntax highlighting is the obvious example, but you could also add anchor links to headings, wrap tables in a scrollable div, or anything else that's easier to do on HTML than Markdown.

```php
function on_render_markdown(string $html): string
{
    // transform $html here
    return $html;
}
```

Because Pure Blog caches rendered content, this hook only runs when a post or page is first rendered or after it's updated — not on every page load.

<p class="notice warning">If your source code is published to a repository like GitHub, please ensure <code>hooks.php</code> is added to your <code>.gitignore</code> file.</p>

This feature is intentionally simple. It gives you power without dragging a full plugin system into the core. If you want more structure later, you can build on top of it.
