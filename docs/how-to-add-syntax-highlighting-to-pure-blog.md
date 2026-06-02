---
title: How to Add Syntax Highlighting to Pure Blog
description: How to add server-side syntax highlighting to Pure Blog using highlight.php.
date: 2026-04-13
---

This guide walks through adding server-side syntax highlighting to Pure Blog using [highlight.php](https://github.com/scrivo/highlight.php) — a PHP port of highlight.js. Because highlighting happens on the server, no JavaScript is required.

You will need four things:

1. The highlight.php library files copied into your site.
2. An entry in `config/update-ignore` to protect them from being overwritten on updates.
3. An `on_render_markdown` hook that runs the highlighter over fenced code blocks.
4. A CSS theme file linked in your post pages.

## Step 1: Get the library

Download the latest release from [github.com/scrivo/highlight.php](https://github.com/scrivo/highlight.php). Inside the zip you'll find a `src/` directory containing two folders: `Highlight` and `HighlightUtilities`.

Copy both into your site's `lib/` directory so the structure looks like this:

```
lib/
  Highlight/
    Autoloader.php
    Highlighter.php
    ... (languages, etc.)
  HighlightUtilities/
    functions.php
    ...
```

Also copy the `LICENSE` file from the repo root into `lib/Highlight/LICENSE.txt` to satisfy the BSD 3-Clause licence terms.

## Step 2: Protect the library from updates

Pure Blog's update system will overwrite files in the site root. Add the library directories to `config/update-ignore` so they're preserved:

```
lib/Highlight
lib/HighlightUtilities
```

## Step 3: Add the hook

The `on_render_markdown` filter fires on the rendered HTML of every post and page, before it's returned to the browser. Add the following to `config/hooks.php`:

```php
require_once __DIR__ . '/../lib/Highlight/Autoloader.php';
spl_autoload_register('\\Highlight\\Autoloader::load');

function on_render_markdown(string $html): string
{
    return preg_replace_callback(
        '/<pre><code class="language-([a-zA-Z0-9_+\-]+)">(.*?)<\/code><\/pre>/s',
        function (array $m): string {
            $lang = $m[1];
            $code = html_entity_decode($m[2], ENT_QUOTES | ENT_HTML5, 'UTF-8');
            try {
                $highlighter = new \Highlight\Highlighter();
                $result = $highlighter->highlight($lang, $code);
                return '<pre><code class="hljs language-'
                    . htmlspecialchars($result->language, ENT_QUOTES, 'UTF-8') . '">'
                    . $result->value
                    . '</code></pre>';
            } catch (\Exception $e) {
                return $m[0];
            }
        },
        $html
    ) ?? $html;
}
```

The hook matches fenced code blocks that Parsedown has already rendered to `<pre><code class="language-xxx">`, decodes the HTML entities back to raw code, runs the highlighter, and returns the highlighted markup. If the language isn't recognised it falls back to the original block unchanged.

## Step 4: Add the CSS

The highlight.php repo includes pre-built CSS themes in its `styles/` directory. Copy the theme you want into `content/css/` in your site.

A good starting point is to use **atom-one-light** for light mode and **atom-one-dark** for dark mode, combined into a single file using `@media (prefers-color-scheme: dark)`.

Save this as `content/css/syntax.css`.

### Link the stylesheet

Since syntax highlighting is only needed on post pages, add a `<link>` tag via **Admin → Settings → Head Inject (Posts)**:

```html
<link rel="stylesheet" href="/content/css/syntax.css">
```

Alternatively, if you want it on all pages, you can paste the CSS directly into `content/css/custom.css` and Pure Blog will inline it automatically.

That's it — fenced code blocks with a language identifier will now be highlighted server-side with no JavaScript required.

## How to use syntax highlighting with markdown

To trigger highlighting, use a fenced code block with a language identifier:

````markdown
```php
function hello(): string
{
    return 'Hello, world!';
}
```
````

The language name must match one of the identifiers supported by highlight.js — common ones include `php`, `javascript`, `python`, `css`, `html`, `bash`, `sql`, `json`, and `yaml`. A full list is available in the `lib/Highlight/languages/` directory of your site (each filename without `.json` is a valid identifier).

If you omit the language identifier, Parsedown renders the block without a `language-xxx` class and the hook leaves it untouched — it will render as a plain unstyled code block.