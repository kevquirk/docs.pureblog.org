---
title: How to Update Pure Blog
description: A look at how to update Pure Blog from inside the admin screen.
date: 2026-02-11
---

As of [v1.5.0](https://codeberg.org/kevquirk/pureblog/releases/tag/1.5.0) Pure Blog allows you to update direct from the Admin interface. To do this, visit `Settings` > `Updates` and you will be greeted by a page similar to this:

![updates 01](/assets/images/how-to-update-pure-blog/updates-01.webp)

Once there you can check if there's an update by hitting the `CHECK LATEST RELEASE` button. Pure Blog will then check the latest release on GitHub to see if you're up to date or not. If you're not, Pure Blog will tell you.

![update 02](/assets/images/how-to-update-pure-blog/update-02.webp)

If you need an update, hit the `INSPECT RELEASE PACKAGE` button. Pure Blog will provide a list of what will change during this update for you to review and ensure it won't break anything you've changed on your site.

![update 03](/assets/images/how-to-update-pure-blog/update-03.webp)

<p class="notice tip">The Pure Blog update process will not touch your <code>/content</code>, <code>/config</code> or <code>/data</code> folders.</p>

If you're happy with the changes, hit the green `APPLY LATEST UPDATE` button and Pure Blog will:

1. Take a backup of your current version of Pure Blog, *not* including your content.
2. Apply the update.

You should now see that the version number has updated, along with the backup that was taken at the time of the update.

![update 04](/assets/images/how-to-update-pure-blog/update-04.webp)

If you find anything is broken with your site after the update, you can hit the `RESTORE SELECTED BACKUP` button to restore Pure Blog back to its previous version.

<p class="notice tip">If you have multiple backups in your list, look for the version number in the backup file name.</p>

![update 05](/assets/images/how-to-update-pure-blog/update-05.webp)

Once you're happy that the update worked successfully, feel free to delete the backup from Pure Blog to save space on your server.
