---
title: Post Scheduling
description: How to schedule posts to publish automatically at a future date and time
date: 2026-05-24
---

Pure Blog has a built-in post scheduler. Set a post to **Scheduled** status with a future date and time, and it will publish itself automatically when that time arrives - no manual intervention needed.

## How to schedule a post

In the post editor, set the **Status** to `Scheduled` and enter the date and time you want the post to go live in the **Date** field, then save.

The post will not appear on your blog until the scheduled time has passed.

## How the scheduler works

The scheduler checks for due posts on every page load. To avoid overhead on busy sites, the check runs at most once every 5 minutes. This means a scheduled post may appear up to 5 minutes after its scheduled time - this is a normal trade-off of the page-load approach.

Your site's timezone setting (**Admin → Settings → Timezone**) controls how the scheduled time is interpreted, so make sure it is set correctly.

## More precise scheduling with cron

If you need more precise timing, or if you have a blog with less traffic, you can trigger the scheduler directly via a dedicated cron file. Create `/content/cron.php` with the following content:

```php
<?php

declare(strict_types=1);

require __DIR__ . '/../functions.php';

if (!is_installed()) {
    http_response_code(503);
    exit;
}

$count = publish_scheduled_posts();
header('Content-Type: text/plain');
echo 'OK: ' . $count . ' post(s) published.' . PHP_EOL;
```

This file lives in `/content/`, which means it is preserved across Pure Blog updates.

You can then point a server cron job or an external service (such as [cron-job.org](https://cron-job.org)) at `https://yourdomain.com/content/cron.php` on whatever schedule you like - every minute if you want near-instant publishing.

The cron endpoint bypasses the 5-minute rate limit and always runs a fresh check.
