---
title: How to Add Syntax Highlighting to Pure Blog
description: How to add client-side syntax highlighting to Pure Blog using Prism.js.
date: 2026-08-14
---

This guide walks through adding client-side syntax highlighting to Pure Blog using [Prism.js](https://prismjs.com) — a lightweight, robust, and highly customisable syntax highlighter. Because the highlighting happens in the browser, no PHP libraries or complex server-side installations are required, and your setup will not be affected by Pure Blog updates.

You can set this up using either a Content Delivery Network (CDN) for a quick installation or by self-hosting the files for better privacy and offline support.

---

## Option A: Using a CDN (Quickest Setup)

Using a CDN is the simplest way to add syntax highlighting. Since syntax highlighting is typically only needed on post pages, you can inject the required files only on those pages via the Pure Blog admin panel.

### Step 1: Add the CSS theme

1. Go to your Pure Blog **Admin → Settings**.
2. Scroll down to the **Header Injects** section.
3. In the **Post head HTML** field, paste the link to your preferred Prism.js theme (for example, the "Tomorrow Night" theme):

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
```

### Step 2: Add the JavaScript files

To keep pages loading quickly, the JavaScript files should be loaded at the bottom of the page.

1. In the same **Settings** page, scroll down to the **Footer Injects** section.
2. In the **Post footer HTML** field, paste the following script tags:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
```
<p class="notice">The <code>prism-autoloader</code> plugin automatically detects the languages used in your post's fenced code blocks and loads the corresponding language definitions on demand. This keeps the initial page weight minimal.</p>

3. Click **Save Settings**.

---

## Option B: Self-Hosting (Privacy-Friendly & Offline Support)

If you prefer not to rely on third-party CDNs, or want your blog to function entirely offline, you can host the Prism.js files directly on your server.

### Step 1: Download the files

Visit the [Prism.js Download Page](https://prismjs.com/download.html):
1. Choose your preferred compression level (Minified version is recommended).
2. Select your desired theme (e.g., *Default*, *Okaidia*, *Tomorrow Night*).
3. Select the languages you want to support (or select the **Autoloader** plugin under the **Plugins** section to load them dynamically).
4. Download both the JS and CSS files.

### Step 2: Copy the files to your site

Place the downloaded files into your Pure Blog directories:
* Save the CSS file as `content/css/prism.css`
* Save the JS file as `content/js/prism.js`

If you are using the Autoloader plugin:
1. Create a folder named `components` inside `content/js/` (i.e. `content/js/components/`).
2. Download the language component files you need from the Prism.js repository or CDN and place them there. The autoloader will look for them in that directory relative to the main `prism.js` script.

### Step 3: Reference the local files

1. Go to your Pure Blog **Admin → Settings**.
2. Add the stylesheet to the **Post head HTML** field:

```html
<link rel="stylesheet" href="/content/css/prism.css">
```

3. Add the script to the **Post footer HTML** field:

```html
<script src="/content/js/prism.js" defer></script>
```

4. Click **Save Settings**.

---

## How to Use Syntax Highlighting in Markdown

To trigger highlighting, write a standard Markdown fenced code block and specify the language identifier immediately after the opening backticks:

````markdown
```php
function hello(): string
{
    return 'Hello, world!';
}
```
````

Prism.js supports a vast range of languages. Common identifiers include:
* `php`
* `javascript` or `js`
* `python` or `py`
* `css`
* `markup` (for HTML, XML, SVG, etc.)
* `bash` or `shell`
* `sql`
* `json`
* `yaml` or `yml`

If you omit the language identifier, Parsedown renders the code block without any specific class, and Prism.js will leave the block as plain, unstyled text.