---
title: Custom Routes
description: I version 1.6.0 I've added support for custom routes, so you can add your own PHP code and then set a custom route to that file.
date: 2026-02-14
---

I version 1.6.0 I've added support for custom routes, so you can add your own PHP code and then set a custom route to that file.

For example, you may want to add a post archive, which would live in `/content/includes/archive.php` which then loops through posts and gives an archive of all posts on your blog.

But how do your visits navigate to your archive? That's where custom routes come in. In the settings page, there's a new option for custom routes where you can add something like:

```
/archive | /content/includes/archive.php
```

Then, when someone visits `/archive` on your site, they will be taken to the custom archive that your built. Also, because your archive file lives in `/content` it won't be impacted by any Pure Blog updates.
