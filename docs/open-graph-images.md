---
title: Open Graph Images
description: How Open Graph (OG) social preview images work in Pure Blog, including dynamic banner generation and custom font hooks.
date: 2026-08-10
---

Open Graph (OG) images are the visual preview cards that appear when you or your readers share links to your posts and pages on social media platforms such as Mastodon, Bluesky, X, LinkedIn, Facebook, and Discord.

Pure Blog includes a built-in dynamic Open Graph image generator that automatically creates custom social preview cards for every post and page on your site.

## How dynamic OG images work

When a link to your site is shared on social media, Pure Blog generates a crisp **1360×712 px** banner card on demand (`/og-image.php`).

The generated card automatically incorporates your site's branding:

- **Colours**: Automatically matches your configured theme colours. If your site is set to dark mode, it uses your dark theme colours, otherwise, it uses your light theme colours.
- **Typography**: Uses the TrueType bold font matching your site's active font stack:
  - **Sans** → Inter
  - **Mono** → Iosevka
  - **Serif** → Merriweather
- **Post/Page Title**: Drawn in large, bold text (**56pt**) with automatic multi-line word wrapping.
- **Footer**: If you have uploaded a site favicon in **Settings → Site**, it is displayed at **64×64 px** in the bottom-left corner alongside your **Site Title** in **42pt** font. If no favicon is uploaded, the site title is aligned cleanly at the left margin without any default placeholder branding.

## OG Image Precedence

Pure Blog uses a straightforward priority system to determine which OG image to show for any given URL:

1. **Feature Image** *(Highest priority)*: If a post or page has an individual [feature image](/using-feature-images/) set, that image is used as the `og:image` for that specific post/page.
2. **Custom Uploaded OG Image**: If you upload a custom site-wide Open Graph image under **Settings → Site**, it will be used across your site.
3. **Dynamic Generated Banner** *(Default)*: When the Open Graph image format is set to **Banner (default)** and no custom image is specified, Pure Blog automatically generates and serves dynamic branded preview cards.

## Customising the Font with Hooks

If your site uses a custom font (such as a custom brand font loaded via `custom.css`), you can override the font used by the dynamic OG image generator using the `on_og_image_font` filter hook.

Because social media platforms require a rendered bitmap image (PNG), server-side rendering requires a raw TrueType (`.ttf`) or OpenType (`.otf`) font file on your server.

### Example: Supplying a Custom Font

1. Place your font file in your site directory (for example, at `/content/fonts/MyFont-Bold.ttf`).
2. Add the `on_og_image_font` filter function to `config/hooks.php`:

```php
<?php

function on_og_image_font(string $fontPath, array $context): string
{
    $customFont = PUREBLOG_BASE_PATH . '/content/fonts/MyFont-Bold.ttf';

    return is_file($customFont) ? $customFont : $fontPath;
}
```

If the custom font file exists and is readable, Pure Blog will render all dynamic OG preview cards using your font. If the file is missing, it will gracefully fall back to the built-in font for your selected font stack.

### The `$context` Parameter

The `$context` array passed to `on_og_image_font` contains information about the content being rendered:

- `$context['type']`: The content type (`'post'`, `'page'`, or `'home'`).
- `$context['slug']`: The post or page slug.
- `$context['post']`: The post data array (or `null`).
- `$context['page']`: The page data array (or `null`).

This allows you to conditionally use different fonts for specific posts or content types if desired.

## Caching & Performance

Dynamic OG images are generated once on the first request and cached to `/cache/og/`. Subsequent requests from crawlers and visitors are served directly from the disk cache with `Cache-Control: public, max-age=86400` HTTP headers.

Whenever you update a post, page, or site settings—or when you click **Clear Cache** in the admin navigation—the OG image cache is automatically purged so your social cards always stay up to date.
