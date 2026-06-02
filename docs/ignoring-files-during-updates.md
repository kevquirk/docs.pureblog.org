---
title: Ignoring Files During Updates
description: How to prevent specific files from being replaced when Pure Blog updates itself.
date: 2026-04-13
---

Pure Blog's built-in updater replaces all core files when you apply an update. For most people that's exactly what you want, but sometimes you may have modified a core file and you don't want it overwritten.

Or maybe you've added additional file(s) to Pure Blog's core code that for whatever reason aren't in the `/content` folder.

Now you can tell the updater to leave specific files alone by creating a `config/update-ignore` file.

<p class="notice warning"><strong>This is for advanced users only.</strong> If you ignore a file that a future update requires to change, things may break. Only ignore files you're confident are safe to pin.</p>

## Creating the ignore file

Create a plaintext file at `/config/update-ignore` (note no `.txt` file extension). List one path per line — the path is relative to your Pure Blog root:

```
# Keep my pinned language file
lang/en.php

# Preserve a custom admin tool
admin/my-tool.php
```

Lines starting with `#` are treated as comments and ignored. A leading `/` is optional, so `lang/en.php` and `/lang/en.php` both work.

## Glob patterns

You can use glob patterns to match multiple files at once:

```
# Ignore all language files
lang/*
```

## What gets ignored

The ignore file only applies to files that would otherwise be **replaced** by an update, or local files within a core directory that would be **deleted** by the wipe. Files that are unchanged, already preserved (like anything in `/config`, `/content`, or `/data`), or not touched by the update at all are unaffected.

## Seeing what will be ignored

Before applying an update, use the `INSPECT RELEASE PACKAGE` button. Any files matched by your ignore list will appear in a dedicated **Will ignore (keeping your version)** section, separate from the normal replace list, so you can review them before committing to the update.

## What happens during the update

The updater reads the ignore file before it starts, saves the current content of any matched files, runs the normal update process, then writes those files back afterwards. The backup created at update time still captures the pre-update state of everything, so you can roll back normally if needed.
