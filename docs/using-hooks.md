---
title: Using Hooks
description: Learn how Pure Blog hooks let you trigger your own actions when posts and pages change.
date: 2026-02-07
---

Hooks are a simple way to make Pure Blog do *extra things* when something changes on your site. Think of them like little trip‑wires: when a post is published, updated, or deleted, you can run your own code.

You don't need a plugin system or any complicated setup. Just drop a small file into `config/hooks.php`, define the hook functions you care about, and Pure Blog will call them when the matching event happens. You can also define hooks in `content/functions.php` if you prefer to keep them alongside your content.

## What can hooks do?

Here are a few examples of what you can use hooks for:

- Clear your CDN cache (Bunny, Cloudflare, etc.)
- Auto-generate post titles for microblog/note posts
- Post to Mastodon, Bluesky, or other services when you publish
- Convert and resize uploaded images automatically
- Obfuscate email addresses to deter scrapers
- Add custom shortcodes or embeds to your content (e.g. YouTube, Vimeo)
- Server-side syntax highlighting
- Add custom action buttons to the admin panel

## How hooks work

Hooks are just regular PHP functions. If a function exists, Pure Blog will call it. If it doesn't, nothing happens.

There are two kinds of hooks:

- **Action hooks** are called when an event occurs (e.g. post published). They perform an action and do not return a value.
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

<p class="notice warning">⚠️ <strong>Duplicate Hook Functions:</strong> PHP does not allow declaring the same function twice. If you want to perform multiple actions on the same event (e.g. purging a CDN and posting to Mastodon both on <code>on_post_published</code>), combine the logic inside a single <code>on_post_published</code> function rather than declaring the function multiple times.</p>

## Available hook events

At the moment, Pure Blog supports these events:

### Action hooks

- `on_post_published(string $slug): void`
- `on_post_updated(string $slug): void`
- `on_post_deleted(string $slug): void`
- `on_page_published(string $slug): void`
- `on_page_updated(string $slug): void`
- `on_page_deleted(string $slug): void`
- `admin_action_buttons(): array`
- `on_admin_action(string $actionId): array`
- `on_image_uploaded(string $path): void` — fires after an image is successfully uploaded via the admin editor. Receives the absolute path to the saved file. Useful for converting formats (e.g. WebP), resizing, or optimising images on upload.

### Filter hooks

- `on_filter_post(array $post): array` — fires after POST data is assembled and before title validation when editing/saving a post. Allows modifying post data (such as auto-generating a title) prior to save.
- `on_filter_content(string $markdown): string` — transform post/page content after built-in shortcodes are processed but before Markdown conversion. Return the modified string.
- `on_render_markdown(string $html, array $context = []): string` — post-process the rendered HTML after Markdown conversion. Return the modified string.
- `on_og_image_font(string $fontPath, array $context = []): string` — supply a custom TrueType (`.ttf`) or OpenType (`.otf`) font file path for dynamic Open Graph image generation. Return the resolved font file path string. [Read the docs](/open-graph-images/#customising-the-font-with-hooks)

---

## Example Hooks

Below are several ready-to-use examples you can adapt and paste into your `config/hooks.php`.

### 1. Purging Bunny CDN Cache

Automatically purges your [Bunny CDN](https://bunny.net) pull zone cache when content changes, ensuring visitors always see the latest version of your site.

```php
function bunny_purge(): void
{
    $accessKey  = 'YOUR-ACCESS-KEY';
    $pullZoneId = 'YOUR-PULL-ZONE-ID';

    $ch = curl_init("https://api.bunny.net/pullzone/{$pullZoneId}/purgeCache");
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => ["AccessKey: {$accessKey}"],
    ]);
    curl_exec($ch);
}

function on_post_published(string $slug): void { bunny_purge(); }
function on_post_updated(string $slug): void   { bunny_purge(); }
function on_post_deleted(string $slug): void   { bunny_purge(); }
function on_page_published(string $slug): void { bunny_purge(); }
function on_page_updated(string $slug): void   { bunny_purge(); }
function on_page_deleted(string $slug): void   { bunny_purge(); }
```

---

### 2. Auto-Generating Post Titles for Notes

For any post using a `notes` layout with no title set, this hook automatically generates one from the current date and time in your site's configured timezone (e.g. `📝 2026-05-11 11:28`).

```php
function on_filter_post(array $post): array
{
    $post['layout'] = trim($post['layout'] ?? '', '"\'');

    if (($post['layout'] ?? '') === 'notes' && trim($post['title'] ?? '') === '') {
        $config = load_config();
        $post['title'] = '📝 ' . current_site_datetime_for_storage($config);
    }
    return $post;
}
```

---

### 3. Convert & Resize Uploaded Images to WebP

Automatically converts uploaded images (JPEG, PNG, GIF, WebP) to WebP format and resizes them to a maximum width of 1200px. Requires the PHP `gd` extension.

```php
function on_image_uploaded(string $path): void
{
    if (!extension_loaded('gd')) {
        return;
    }

    $mime  = mime_content_type($path) ?: '';
    $image = match ($mime) {
        'image/jpeg' => imagecreatefromjpeg($path),
        'image/png'  => imagecreatefrompng($path),
        'image/webp' => imagecreatefromwebp($path),
        'image/gif'  => imagecreatefromgif($path),
        default      => false,
    };
    if ($image === false) {
        return;
    }

    $origW = imagesx($image);
    $origH = imagesy($image);

    if ($origW > 1200) {
        $newH    = (int) round($origH * 1200 / $origW);
        $resized = imagescale($image, 1200, $newH);
        imagedestroy($image);
        if ($resized === false) {
            return;
        }
        $image = $resized;
    }

    $webpPath = preg_replace('/\.[^.]+$/', '.webp', $path) ?? $path;
    imagewebp($image, $webpPath, 82);
    imagedestroy($image);

    if ($webpPath !== $path) {
        unlink($path);
    }
}
```

---

### 4. Email Address Obfuscation

Encodes your `site_email` address as HTML entities in rendered Markdown content, making it harder for spam bots to harvest.

```php
function on_filter_content(string $content): string
{
    $config = load_config();
    $email  = trim((string) ($config['site_email'] ?? ''));
    if ($email === '') {
        return $content;
    }

    $encoded = implode('', array_map(fn($c) => '&#x' . dechex(ord($c)) . ';', str_split($email)));
    return str_replace($email, $encoded, $content);
}
```

---

### 5. Custom Shortcodes (e.g. YouTube Embeds)

The `on_filter_content` hook runs after built-in shortcodes but before Markdown conversion, allowing you to add custom shortcodes without modifying core files:

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

In any post or page, simply use `[youtube:dQw4w9WgXcQ]`.

---

### 6. Syndicating Notes to Mastodon

Automatically syndicates posts using the `notes` layout to your Mastodon account when published, uploading any images in the note as attachments and trimming content to 500 characters with a link back to your post.

```php
define('MASTODON_INSTANCE', 'https://your.mastodon.instance');
define('MASTODON_TOKEN',    'your-access-token');

function mastodon_upload_media(string $filePath): ?string
{
    if (!extension_loaded('curl')) {
        return null;
    }
    $ch = curl_init(MASTODON_INSTANCE . '/api/v1/media');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . MASTODON_TOKEN],
        CURLOPT_POSTFIELDS     => ['file' => new CURLFile($filePath)],
    ]);
    $response = curl_exec($ch);
    if (!$response) {
        return null;
    }
    $data = json_decode((string) $response, true);
    return isset($data['id']) ? (string) $data['id'] : null;
}

function on_post_published(string $slug): void
{
    if (!extension_loaded('curl')) {
        return;
    }

    $post = get_post_by_slug($slug);
    if (!$post || ($post['layout'] ?? '') !== 'notes') {
        return;
    }

    $config  = load_config();
    $baseUrl = rtrim($config['base_url'] ?? get_base_url(), '/');
    $html    = render_markdown($post['content'], ['post_title' => '']);

    $mediaIds  = [];
    $urlPrefix = base_path();
    preg_match_all('/<(img|video)[^>]+src=["\']([^"\']+)["\']/', $html, $matches);
    foreach ($matches[2] as $src) {
        $urlPath = $src;
        if ($urlPrefix !== '' && str_starts_with($urlPath, $urlPrefix)) {
            $urlPath = substr($urlPath, strlen($urlPrefix));
        }
        $fsPath = PUREBLOG_BASE_PATH . '/' . ltrim($urlPath, '/');
        if (is_file($fsPath)) {
            $id = mastodon_upload_media($fsPath);
            if ($id !== null) {
                $mediaIds[] = $id;
            }
        }
    }

    $html      = preg_replace('/<\/p>\s*/i', "\n\n", $html) ?? $html;
    $html      = preg_replace('/<br\s*\/?>\s*/i', "\n", $html) ?? $html;
    $permalink = $baseUrl . '/' . $post['slug'];
    $status    = trim(strip_tags($html));

    if (strlen($status) + strlen($permalink) + 2 > 500) {
        $status = substr($status, 0, 500 - strlen($permalink) - 5) . '…';
    }
    $status .= "\n\n" . $permalink;

    $ch = curl_init(MASTODON_INSTANCE . '/api/v1/statuses');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . MASTODON_TOKEN,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode(array_filter([
            'status'    => $status,
            'media_ids' => $mediaIds ?: null,
        ])),
    ]);
    curl_exec($ch);
}
```

---

### 7. Adding Custom Admin Action Buttons

You can add custom action buttons to the admin navigation using `admin_action_buttons()`, and handle button clicks in `on_admin_action($actionId)`.

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

---

<p class="notice warning">⚠️ If your site's source code is publicly available in a repository (e.g. GitHub or Codeberg), make sure <code>config/hooks.php</code> is added to your <code>.gitignore</code> file so API keys and secrets are not leaked.</p>
