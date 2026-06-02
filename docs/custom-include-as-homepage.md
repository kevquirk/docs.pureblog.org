---
title: Using a Custom Include as Your Homepage
description: Pure Blog 1.9.6 allows you to use a custom PHP include file as your homepage, giving you full control over what visitors see when they land on your site.
date: 2026-03-19
---

By default, your Pure Blog homepage shows your latest posts. You can also set a regular page as the homepage via **Settings**, but sometimes you want something more custom — a hand-crafted landing page, a "now" page, a reading list, or anything else that needs its own PHP logic.

Since version 1.9.6, you can do this using a custom include mapped to `/` in the Custom Routes setting.

## How it works

Custom routes are checked before anything else when a request comes in. By mapping `/` to an include file, that file takes over as the homepage entirely. The **Homepage** setting in admin has no effect when a `/` route is defined — the include wins.

## Step 1: Create your include file

Create a PHP file in `/content/includes/`. For example, `/content/includes/homepage.php`.

A minimal homepage include looks like this:

```php
<?php

declare(strict_types=1);

$pageTitle       = $config['site_title'] ?? 'Home';
$metaDescription = $config['site_description'] ?? 'My custom homepage.';

require PUREBLOG_BASE_PATH . '/includes/header.php';
render_masthead_layout($config, ['page' => null]);
?>
<main>
    <article>
        <h1>Welcome</h1>
        <p>This is my custom homepage.</p>
    </article>
</main>
<?php render_footer_layout($config, ['page' => null]); ?>
</body>
</html>
```

The include has access to `$config` and all Pure Blog functions, so you can call things like `get_all_posts()`, `get_page_by_slug()`, or include other partials such as `/includes/post-list.php`.

## Step 2: Add the custom route

In **Admin → Settings**, find the **Custom Routes** field and add:

```
/ | /content/includes/homepage.php
```

Save your settings. Your include file will now be served at `/`.

## Notes

- Leave the **Homepage** setting in admin set to the default — it has no effect once a `/` route is defined.
- The include is a full PHP file, so you are responsible for rendering the header, masthead, main content, and footer yourself (as shown in the example above).
- You can still display your blog post list inside your custom homepage by including `/includes/post-list.php` and setting up the required `$posts`, `$pagination`, and `$postListLayout` variables that it expects.
