---
title: Using Shortcodes
description: Shortcodes are really handy snippets of text that are used to reference certain pieces of data from your site, post, or page.
date: 2026-02-08
---

Shortcodes are really handy snippets of text that are used to reference certain pieces of data from your site, post, or page. These can be useful for things like using a global email, or rendering the page title somewhere.

Personally, I use them for `mailto:` links on my site, so I can have a link at the bottom of each post which generates a new email to my address, and populates the subject line with `RE: [Post Title]`.

Pure Blog now supports similar shortcodes, so far only 2 have been added, as that's what I need, but I may add more in the future.

- `{% raw %}{{ site_email }}{% endraw %}` will render the email address from site settings.
- `{% raw %}{{ post_title }}{% endraw %}` will render the post title. `{% raw %}{{ page_title }}{% endraw %}` also works for pages.

So if you wanted to use a similar "*reply by email*" link in your posts, you can add something like:

```
{% raw %}<a class="button reply-button"href="mailto:{{ site_email }}?subject=Reply to: {{ post_title }}">✉️ Reply by email</a>{% endraw %}
```
