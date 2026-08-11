---
title: Custom Navigation
description: Learn how to manage navigation links and customise the menu order on your Pure Blog.
date: 2026-08-11
---

Pure Blog provides a simple way to manage your front-end navigation menu, whether you want an automatic menu generated from your pages or full control over every link and its exact order.

## Default Navigation Behaviour

By default, Pure Blog automatically constructs your navigation menu in the following order:

1. **Home**: A link back to your homepage.
2. **Published Pages**: All published pages that have **"Include in navigation: Yes"** enabled, sorted alphabetically by title.
3. **Custom Nav Items**: Any additional links added in the **Custom nav items** setting (rendered in top-to-bottom order at the end of the menu).

## Adding Custom Nav Items

To add custom links to your navigation (such as an RSS feed, a custom route, or an external profile link):

1. Go to **Settings → Site Settings** in the admin panel.
2. Locate the **Custom nav items** textarea.
3. Enter one item per line using the `Label | URL` format:

```text
RSS | /feed
Projects | /projects
GitHub | https://github.com/yourname
```

Custom nav items are always rendered in the exact top-to-bottom order you write them.

## Replacing the Entire Menu

If you want complete control over your navigation menu — including customising the order of your pages, choosing where the Home link sits, or interweaving internal and external links — you can use the **"Replace entire navigation with custom nav items"** toggle.

1. Go to **Settings → Site Settings**.
2. Add all of your desired navigation links into the **Custom nav items** textarea in the exact order you want them to appear.
3. Check the **"Replace entire navigation with custom nav items"** box directly underneath the textarea.
4. Click **Save Settings**.

### Example Configuration

```text
Home | /
About | /about
Projects | /projects
RSS | /feed
Contact | /contact
GitHub | https://github.com/yourname
```

### What Happens When Replaced

* **Full Ordering Control**: The menu will display strictly the items listed in your textarea in their exact top-to-bottom sequence.
* **Automatic Page List Suppressed**: The automatic alphabetical list of published pages will not be rendered.
* **Home Link Customisation**: The automatic "Home" link is omitted, allowing you to choose whether to include a home link (`Home | /`), label it differently (e.g. `Blog | /`), or omit it entirely if your site title already links home.
* **Active State Highlighting**: Pure Blog will still automatically apply the active `current` class to the appropriate menu item when a visitor is viewing that page or the homepage.
