---
title: Changelog
description: Release history for Pure Blog.
date: 2024-01-01
layout: doc.njk
tags: docs
permalink: /changelog/
---
## v3.6.0 - 15 July 2026

### Changed
- Removed the redundant `/config/hooks-example.php` file from the repository, directing users to the online library at [hooks.pureblog.org](https://hooks.pureblog.org) for examples instead.

### Fixed
- Fixed a bug where pages viewed by logged-in administrators using "remember me" could be saved to the public cache, making the "edit page" button visible to logged-out visitors.
- Prevented login session conflicts when hosting multiple blogs on the same domain or localhost by using site-specific cookie and session names. Thanks to [Sven](https://svbck.blog/) for helping me work through the issue.

## v3.5.8 - 12 July 2026

### Added
- Automatically append `rel="noopener noreferrer"` to all external markdown links for improved security and privacy. Thanks to [pimoore](https://codeberg.org/pimoore) for recommending/reporting this in issue [#35](https://codeberg.org/kevquirk/pureblog/issues/35).
- Added parser support for custom inline link attributes (allowing target specifications like `{target="_blank"}`). [Read the docs](https://docs.pureblog.org/markdown-helper/#adding-target-and-other-attributes-to-links)

## v3.5.7 - 10 July 2026

### Fixed
- Fixed a layout issue on the admin dashboard where vertical bar charts scrolled off-screen on mobile devices. Enabled clean horizontal overflow scrolling and prevented columns from squishing. Thanks to [Sven](https://svbck.blog/) for reporting.
- Fixed an issue where multi-line front matter values (such as layout fields or meta descriptions) were truncated at the first line break when saving. Implemented support for building and parsing YAML block scalars (`|`) to preserve formatting.

## v3.5.6 - 07 July 2026

### Changed
- Updated the license to version 1.2 to restrict only commercial hosting for a fee, while explicitly permitting free hosting for friends and family.

### Added
- Updated Romanian translations, completing previously missing localisation strings (thanks [@ThinkRoot](https://codeberg.org/ThinkRoot) for [#33](https://codeberg.org/kevquirk/pureblog/pulls/33)).
- Updated French translations, completing community settings localisation strings (thanks [@nfriedli](https://codeberg.org/nfriedli) for [#34](https://codeberg.org/kevquirk/pureblog/pulls/34)).

## v3.5.5 - 06 July 2026

### Fixed
- Fixed an issue in CodeJar editors where copy/paste formatting (such as indentation and newlines) was lost in some browsers (like Vivaldi), and pressing the Tab key did not indent text in Firefox (thanks Jan for reporting).

## v3.5.4 - 06 July 2026

### Fixed
- Fixed an issue in layout partials where stylesheet, icon, and custom CSS file checks in the document head and body open relied on relative paths (`__DIR__ . '/../...'`), which broke when using custom `header.php` layouts inside `content/includes/` (thanks [@citizenk](https://codeberg.org/citizenk) for reporting [#27](https://codeberg.org/kevquirk/pureblog/issues/27)).
- Fixed an issue in the documentation pages "Using Shortcodes" and "Working with Data Files" where double curly braces and Liquid tags were being processed by Eleventy/11ty rather than rendering as plain code blocks, resulting in empty or missing examples (thanks [@citizenk](https://codeberg.org/citizenk) for reporting [#29](https://codeberg.org/kevquirk/pureblog/issues/29) and [#30](https://codeberg.org/kevquirk/pureblog/issues/30)).
- Fixed an issue on the documentation site where markdown block attributes (like `{.notice .tip}`) were not parsed, leaving them visible as raw text at the end of paragraphs and causing emoji indicators on notice boxes to fail to render. Installed and configured the `markdown-it-attrs` plugin, and added corresponding notice box emoji styles to the stylesheet (thanks [@citizenk](https://codeberg.org/citizenk) for reporting [#31](https://codeberg.org/kevquirk/pureblog/issues/31)).
- Fixed a documentation inconsistency in "How to Create a Titleless Notes Page" where the notes feed RSS URL route was referred to as `/notes/feed` in some sections but `/notes-feed` in the custom routing step. Updated the route configuration instructions to consistently use `/notes/feed` (thanks [@citizenk](https://codeberg.org/citizenk) for reporting [#32](https://codeberg.org/kevquirk/pureblog/issues/32)).
- Simplified occurrences of `rtrim(get_base_url(), '/')` to just `get_base_url()` since the helper function already guarantees a base URL without trailing slashes.

### Added
- New public repository for docs site - [https://codeberg.org/kevquirk/docs.pureblog.org](https://codeberg.org/kevquirk/docs.pureblog.org)

## v3.5.3 - 01 July 2026

### Fixed
- Fixed an issue in CodeJar editors where newlines/line breaks were stripped out during copy/paste operations (thanks [@northperseids](https://codeberg.org/northperseids) for reporting [#25](https://codeberg.org/kevquirk/pureblog/issues/25)).

## v3.5.2 - 30 June 2026

### Added
- Added native lazy loading (`loading="lazy"`) to all images in post and page bodies, improving initial page load performance.

## v3.5.1 - 23 June 2026

### Fixed
- Fixed a bug in the editor where saving a post or page (via Ctrl+S or the Save button) reset the scroll position back to the top of the page. The scroll position of the main container (`.admin-main`) and the editor cursor selection are now correctly preserved on reload.

## v3.5.0 - 23 June 2026

### Improvement
- Replaced CodeMirror 5 with CodeJar + Prism.js in post/page/CSS editors:
  - Resolves typing bugs with Swiss and French accented characters (e.g. "é") and Enter key lockups after brackets.
  - Restores native browser spellcheck, autocorrect, and dictionary lookup.
  - Significantly reduces script size, improving admin page load speeds.

### Fixed
- Footer docs link in admin now points to the new docs site. (thanks [@citizenk](https://codeberg.org/citizenk) for reporting [#14](https://codeberg.org/kevquirk/pureblog/issues/24)).

### Added
- Updated Finnish translations, completing previously missing localisation strings (thanks to Olli).

## v3.4.4 - 19 June 3036

### Added
- **Added Pure Comments integration ([read the docs](https://docs.pureblog.org/integrating-pure-comments/))**
    - Added a new "Community" section to site settings.
    - Added a checkbox to enable/disable [Pure Comments](https://purecomments.org).
    - Added a text input field for the Pure Comments URL, which is dynamically enabled/disabled and required based on the checkbox state.
    - Integrated the Pure Comments HTML container and embed script in `/includes/post-meta.php` to display comment threads on all posts.
    - Configured the comments container to use `data-post-slug` with the post's unique slug to guarantee comment thread stability.
    - Added translations for all community settings and validation errors across all 11 language files.

### Fixed
- Placeholder text in page head HTML and post head HTML embed fields in site settings were the wrong way round.


## v3.4.3 - 13 June 2026

### Fixed
- Various admin CSS cleanup
- Improved "hovering" notifications in admin that no longer shift the UI around.
- Fixed missing "green" class from new page button when blog is disabled.

### Updated
- Getman translations (thanks [@bttr](https://codeberg.org/bttr) for [#23](https://codeberg.org/kevquirk/pureblog/pulls/23))


## v3.4.2 - 10 June 2026

### Updated
- Improved sidebar in editor that can be shrunk down to provide a less distracting editing experience.

## v3.4.1 - 09 June 2026

### Added
- Added ability to position the default `title` and `content` fields within custom post layouts. 
  By defining `title` and/or `content` inside the custom layout `.json` file's `fields` array, the editor-main area hides the default top input/textarea and renders them inline exactly where configured in the layout sequence. [Read the docs](https://docs.pureblog.org/custom-post-layouts/).


## v3.4.0 - 06 June 2026

### Added
- New French translation strings for image library and feature images. (Thanks to [@nfriedli](https://codeberg.org/nfriedli) in [#18](https://codeberg.org/kevquirk/pureblog/pulls/18))
- Add a setting to disable blog features (posts, tags, stats) in the admin panel when the blog page is set to Hidden. This hides the Dashboard, changes the quick-action button, defaults Content to Pages, and enforces redirection checks on direct access to blog pages ([read the docs](https://docs.pureblog.org/hiding-the-blog-page/)). (Thanks to [@daj](https://codeberg.org/daj) in [#21](https://codeberg.org/kevquirk/pureblog/issues/21))

### Fixed
- Add keyboard shortcuts (bold, italic, link, save) in custom layout markdown fields.
- Fix sidebar logout button overlapping navigation menu items on small screens. (Thanks to [@nfriedli](https://codeberg.org/nfriedli) in [#20](https://codeberg.org/kevquirk/pureblog/issues/20))
- Standardize arrow symbols in language files. (Thanks to [@nfriedli](https://codeberg.org/nfriedli) in [#19](https://codeberg.org/kevquirk/pureblog/issues/19))
- Update pureblog logo link in the sidebar to reflect the configured admin homepage. (Thanks to [@abu](https://codeberg.org/abu) in [#22](https://codeberg.org/kevquirk/pureblog/issues/22))


## v3.3.0 - 03 June 2026

### New Features

- **Image library** — new admin page listing all uploaded images as a thumbnail grid, sortable newest-first with pagination (32 per page). Each image shows its folder slug, a copy-markdown button, and a delete button. Deleting an image that is referenced in a post or page shows a warning with links to the relevant editors. A filename search field filters the grid in real time.

### Improvements

- **Feature images** — each image attached to a post or page now has a checkbox to mark it as the feature image. The feature image overrides the site-wide OG image in meta tags and is available as `feature_image` in custom themes. Only one image can be set at a time; switching to a different image shows a confirmation prompt. [Read the docs](https://docs.pureblog.org/using-feature-images/).
- New pages now default to excluded from the navigation menu.
- The editor sidebar now scrolls independently when its content is taller than the viewport, making attached images accessible without scrolling the entire page.

### Maintenance

- Removed 5 unused CSS selectors from `admin.css` (`.form-actions`, `.admin-search`, `.notice.notice-filter`, `.settings-grid`, `.settings-column`).
- Added English placeholder translation strings for all new Images library keys across all 10 non-English language packs.


## 3.2.2 - 01 June 2026

**Fixed fatal error on homepage when posts directory is missing.** `get_all_posts()` and `get_all_posts_meta()` were setting the internal `$all` cache to an empty array when the posts directory didn't exist, but leaving `$published` as `null`. Because the default call returns `$published`, PHP threw a fatal `TypeError` on the homepage. Both functions now correctly initialise `$published` to `[]` alongside `$all` in that branch. Fixes [#17](https://codeberg.org/kevquirk/pureblog/issues/17).



## v3.2.1 - 30 May 2026

### Fixed
- `code` and `pre` elements now correctly use the monospace font stack. Thanks to [@nfriedli](https://codeberg.org/nfriedli) for reorting.

### Added
- Font and static asset caching headers added to `.htaccess` for new installs (fonts cached for 3 months, CSS/JS/images for 1 month). Thanks to [@nfriedli](https://codeberg.org/nfriedli) for recommending.


`.htaccess` is ignored in the updater tool, so you will need to update the file manually on existing installs. {.notice}



## v3.2.0 - 29 May 2026

### Added
- Finnish translations for several missing strings. Thanks to Olli.
- `content/posts/.scheduler.lock` added to `.gitignore`.
- New collapsible sidebar layout in admin. Expands to show labels, collapses to icon-only with tooltips, and state persists across page loads. On mobile the sidebar slides in as an overlay triggered by a hamburger menu button.
- Self-hosted web fonts: Inter (sans), Merriweather (serif), and Iosevka (mono). No external font requests are made. Can be overridden with custom CSS as always.

### Fixed
- Edit link no longer disappears on posts and pages after the PHP session expires when using "remember me". The remember-me cookie is now checked on front-end page loads, not just on admin pages.

### Removed
- Removed the lang repair tool (`repair_missing_lang`) and all associated UI and lang keys. This was a one-off fix from when languages were first introduced and is no longer needed.

### Changed
- Moved `fetch_latest_pureblog_release()` from `cache.php` to `updater.php` where it belongs.
- Default favicon and Open Graph image updated to align with Pure Commons branding.



## v3.1.1 - 25 May 2026

### Fixed
- Reinstated `render_post_navigation()` following accidental removal during the v3 cleanup ([#15](https://codeberg.org/kevquirk/pureblog/issues/15)). (Thanks [David](https://codeberg.org/daj)).

### Changed
- Updated German translation for scheduled posts (thanks [@Lahusen](https://codeberg.org/Lahusen)).
- Updated French translation for scheduled posts (thanks [@nfriedli](https://codeberg.org/nfriedli)).



## v3.1.0 - 24 May 2026

### Added
- **Post scheduling**. Set a post's status to **Scheduled** with a future date and time, and it will publish automatically when that time arrives. The scheduler runs on every page load (at most once every 5 minutes). For more precise timing, a `cron.php` file can be added to `/content/` and triggered via a server cron job or external service. [Read the docs](https://pureblog.org/post-scheduling).
- **Optional reading time displayed on posts**, with a toggle in site settings under date format (diasbled by default).
- German translations for reading time strings. Thanks to [@bttr](https://codeberg.org/bttr).

### Fixed
- Removed redundant `.htaccess` creation from the autosaves directory, as access is now blocked by the root `.htaccess`.



## v3.0.2 - 22 May 2026

### Added
- EXIF metadata (including GPS location data) is now automatically stripped from images on upload (thanks to [@greggmc](https://codeberg.org/greggmc) for reporting [#11](https://codeberg.org/kevquirk/pureblog/issues/11)).

### Fixed
- Removed calls to `curl_close()`, which was deprecated in PHP 8.4 and removed in PHP 8.5. This has no effect on older PHP versions (thanks to [@maxsite](https://codeberg.org/maxsite) for reporting [#5](https://codeberg.org/kevquirk/pureblog/issues/5)).
- Remember me cookie is no longer set if the server-side token fails to save, preventing a silent bug where the cookie appeared valid but never worked.

### Updated
- Updated German translation [#2](https://codeberg.org/kevquirk/pureblog/pulls/2) thanks to [@bttr](https://codeberg.org/bttr) for the contribution.
- Updated French translation [#4](https://codeberg.org/kevquirk/pureblog/pulls/4) thanks to [@nfriedli](https://codeberg.org/nfriedli) for the contribution.
- [Caching](https://pureblog.org/local-caching) will now be enabled for new installs as part of the setup process. Existing installs are unaffected.
- Simplified radio buttons and checkboxes. Now uses browser's built-in styling, only with `var(--accent-color)` for the background.

### Optional: `.htaccess` cleanup

Security rules previously spread across multiple `.htaccess` files have been consolidated into the root `.htaccess`. **This cleanup is entirely optional** — the old subdirectory files won't cause any problems if left in place, as duplicate rules are harmless. It's purely best practice to remove them.

Open your root `.htaccess` and replace it with the [latest version of the file](https://codeberg.org/kevquirk/pureblog/src/branch/main/.htaccess), keeping any custom rules you already have.

**If you have SSH access**, run this from your Pure Blog root to remove the old `.htaccess` files:

```bash
rm data/.htaccess content/.htaccess content/autosaves/.htaccess content/images/.htaccess
```

**If you don't have SSH access**, use your FTP client to delete these three files:
- `data/.htaccess` (the data folder may not exist in your setup. If it doesn't, you can ignore this)
- `content/.htaccess`
- `content/autosaves/.htaccess`
- `content/images/.htaccess`



## v3.0.1 - 09 May 2026

Fixed a bug where restoring an autosave and saving would create a duplicate post file instead of updating the original, causing the post to appear to revert to its pre-autosave content.



## v3.0.0 - 08 May 2026

v3.0.0 started off as a maintenance release, but as I got more and more into it, it ended up being a significant re-write of parts of the code to improve security, performance, and general code quality. At the same time I decided [to move away from GitHub](https://kevquirk.com/thoughts-on-leaving-github) and v3.0.0 seemed to be a good time to do it.

### ⚠ Upgrade notice

This release restructures core PHP files and **cannot be applied via the in-app updater**. Please upgrade manually by downloading the release zip from Codeberg. Future releases without breaking changes can resume using the in-app updater.

[Read more about that here.](/upgrading-to-v300-and-moving-to-codeberg)

Existing `pb_remember` cookies will be invalidated by the remember-me change - you will need to log in once and re-tick "remember me".

### Manual upgrade steps

1. **Back up your site** — download a copy of your entire Pure Blog directory before proceeding.
2. **Download the v3 release zip** from the [Codeberg releases page](https://codeberg.org/kevquirk/pureblog/releases) and extract it.
3. **Delete everything EXCEPT** for the `config/`, `content/` and `data/` directories - these hold your posts, pages, images, and configuration and must not be overwritten.
4. **Copy the new files to your existing installation**, replacing everything except your `config/`, `content/` and `data/` directories.
5. **Restore any other file(s)** (like `.htaccess`) that you have customised from your backup.
6. **Log back in** — your remember-me cookie will no longer be valid; tick "remember me" again if you use it.

**Note:** The `data/` directory doesn't exist in the default build. It will only be there if you've made use of [data files](https://pureblog.org/working-with-data-files).

### Summary

Major code overhaul covering security hardening, performance improvements, and structural refactoring:

- **6 security fixes** — closed two path-traversal vulnerabilities, hardened the login lockout and remember-me systems, added PHP-execution blocking on the image directory, and tightened file upload MIME validation.
- **Significant reduction in duplication** — eliminated ~800 lines of duplicated or dead code: 4 copy-pasted HTTP fetch blocks collapsed into 2 helpers, identical delete handlers merged, 15-file auth boilerplate replaced by a single bootstrap include, and 3 dead functions removed.
- **`functions.php` broken up** — the 2444-line monolith is now a 142-line loader; 100 functions live in five focused files under `includes/lib/` (`i18n`, `auth`, `content`, `template`, `cache`). `admin/settings-updates.php` similarly reduced from ~1000 lines to 264 by extracting its updater logic into `includes/updater.php`.
- **Six performance wins** — `load_config()` memoised, `get_all_posts()` and `get_all_pages()` published-only lists cached, metadata-only post loading for sitemap and admin content list (skips reading post bodies entirely), `get_excerpt()` truncates input before running 8 regexes, `find_post_filepath_by_slug()` routed through the existing post cache instead of re-globbing disk.
- **Moved source code** from GitHub to [Codeberg](https://codeberg.org/kevquirk/pureblog).

### Security

- **Autosave path traversal fix** — `editor_type` is now validated against an allow-list (`post`/`page`) and `slug` is validated with `is_safe_image_slug` before being used to build the autosave file path. Previously an authenticated admin could write a `.json` file to arbitrary server paths. (`admin/autosave.php`)
- **Layout name path traversal fix** — The `layout:` front-matter field is now stripped to `[a-zA-Z0-9_-]` before being joined into a file path, preventing an admin from including arbitrary `.php` files via a crafted post. (`post.php`)
- **Image directory PHP execution block** — Added `content/images/.htaccess` denying PHP execution. `upload-image.php` will also recreate this file if it is ever missing, so new installs are covered automatically.
- **Favicon / OG image MIME validation** — The favicon and OG image upload handlers in site settings now run `finfo` MIME type validation (jpeg, png, gif, webp, avif) before accepting a file, matching the protection already in place for post image uploads. (`admin/settings-site.php`)
- **IP-based login lockout** — Login failure tracking moved from `$_SESSION` (which an attacker could reset by dropping their cookie) to a server-side file keyed by IP address (`data/login-failures.json`). The 5-failure / 5-minute lockout now actually works against automated brute-force. (`functions.php`, `admin/index.php`)
- **Remember-me token redesign** — Replaced the static HMAC token (derived from the password hash, never expiring, no server-side state) with a random selector + validator scheme. The hashed validator is stored in `data/remember-me.json` with an explicit 90-day expiry. Logout now deletes the server-side token. Session is regenerated on cookie restore. A new `clear_all_remember_me_tokens()` helper is available for use on password change. (`functions.php`)

### Code Quality

- **Admin bootstrap extracted** — The repeated 4-line auth opener (`require functions.php`, `require_setup_redirect()`, `start_admin_session()`, `require_admin_login()`) shared by 15 admin files is now in `admin/bootstrap.php`. Each file does a single `require __DIR__ . '/bootstrap.php'` instead.
- **Delete handlers consolidated** — `admin/delete-post.php` and `admin/delete-page.php` were identical except for entity type. Replaced with a single `admin/delete-content.php` that accepts a validated `type` parameter (`post` or `page`).
- **HTTP helpers extracted** — Four duplicated curl/stream-fallback blocks consolidated into `pureblog_http_get()` and `pureblog_http_download()` in `functions.php`. `fetch_latest_pureblog_release()` moved to `functions.php` so `admin/dashboard.php` can call it directly instead of inlining its own GitHub fetch. (`functions.php`, `admin/settings-updates.php`, `admin/dashboard.php`)
- **Updater logic extracted** — The 21 update/backup/restore functions previously defined inline in `admin/settings-updates.php` (≈780 lines of logic) are now in `includes/updater.php`. The view file is reduced to controller setup + HTML (~264 lines).
- **`functions.php` split into focused lib files** — The 2444-line monolith now delegates 100 functions to five files under `includes/lib/`: `i18n.php` (i18n + hooks), `auth.php` (session/CSRF/remember-me), `content.php` (config, URL helpers, dates, post/page CRUD), `template.php` (markdown, liquid, layout rendering, search/indexes, pagination), `cache.php` (cache, version detection, HTTP helpers). `functions.php` is a 142-line loader of constants, bootstrap functions, and `require` calls.

### Performance & Dead Code

- **`load_config()` memoised** — Added a `static` cache so the config file is parsed once per request instead of on every call. (`includes/lib/content.php`)
- **`get_all_posts()` published-list cached** — The published-only post list is now built once at load time and stored in a second static slot, eliminating a redundant `array_filter` on every subsequent call. (`includes/lib/content.php`)
- **Metadata-only post loading** — `parse_post_meta_only()` reads a post file via `fgets`, stopping at the closing `` front-matter delimiter without loading the post body. `get_all_posts_meta()` uses this to serve callers that only need metadata. `sitemap.php` and `admin/content.php` now skip reading post bodies entirely. Its cache is kept in sync with the full post cache via `build_search_index()`. (`includes/lib/content.php`)
- **`get_all_pages()` published-list cached** — Applied the same two-slot static cache pattern as `get_all_posts()`, eliminating a redundant `array_filter` on every published-only call (e.g. masthead nav rendering). (`includes/lib/content.php`)
- **`get_excerpt()` early truncation** — Excerpt text is now capped at `$length × 6` characters before running 8 Markdown-stripping regexes, avoiding unnecessary work on large post bodies. (`includes/lib/template.php`)
- **`find_post_filepath_by_slug()` uses post cache** — Replaced a redundant `glob` + full-parse loop with a lookup against the `get_all_posts()` static cache, eliminating a duplicate filesystem scan. (`includes/lib/content.php`)
- **Dead code removed** — Deleted `render_liquid_loop()`, `resolve_layout_file()`, and `render_post_navigation()` (no callers). Deleted orphan `admin/pages.php` (no links).



## v2.5.2 - 08 May 2026
- Adds a notice in the admin area to inform users of v3.0.0 and the requirement for a manual upgrade.



## v2.5.1 - 06 May 2026
- Added 30x30 image previews when images are uploaded via the post or page editor ([#78](https://github.com/kevquirk/pureblog/pull/78)). Thanks to [Alex White](https://github.com/devalexwhite) for the PR!
- Added post filtering option by layout when custom layouts are added.
- Added front-end post/page edit button that only shows when logged in.
- Various English placeholders added to language files; will require subsequent review by native speakers to update - PRs welcome!
- Fixed search field and button touching each other on smaller screens.



## v2.5.0 - 04 May 2026
- Removed hardcoded 3MB image upload limit. Upload size is now controlled entirely by php.ini (`upload_max_filesize` / `post_max_size`).
- Improved `content/.htaccess`: disable directory listing, properly block direct access to `.md` files, and block direct HTTP access to `layouts/` and `functions.php`.
- Updated license to v1.1: commercial self-use is now explicitly permitted.
- Added Markdown in HTML (`markdown="1"`) section to the demo page.
- Updates to Italian translation.
- Added Finnish translation (thanks to Nukemin Herttua)



## v.2.4.9 - 26 April 2026
- **Fix:** OG image, favicon, RSS feed, and stylesheet URLs in the document `<head>` are now always absolute. Props to [@nfriedli](https://github.com/nfriedli) for raising this ([#76](https://github.com/kevquirk/pureblog/issues/76)).
- **Fix:** Remaining formal German ("Ihre") converted to informal ("Deine") in the updater UI. Thanks to [@werschreibt](https://github.com/werschreibt) for the PR ([#75](https://github.com/kevquirk/pureblog/pull/75)).



## 2.4.8 - 25 April 2026
- **[#73](https://github.com/kevquirk/pureblog/issues/73)** - Fix tag suggestions displaying with a capitalised first letter, and keyboard selection (Enter/Tab) inserting the capitalised version instead of the original tag. Reported by [@werschreibt](https://github.com/werschreibt).
- **[#74](https://github.com/kevquirk/pureblog/pull/74)** - Added Traditional Chinese (`zh_TW`) translation. Thanks [@aztich](https://github.com/aztich).
- Update to the demo page for notices.



## 2.4.7 - 24 April 2026

- **[#69](https://github.com/kevquirk/pureblog/pull/69)** - French translation (`fr.php`) updated to use escaped straight apostrophes and simplified spacing before punctuation, making the file easier to maintain. Thanks [@nfriedli](https://github.com/nfriedli).
- **[#70](https://github.com/kevquirk/pureblog/issues/70)** - Removed `text-transform: capitalize` from the admin stylesheet, which produced incorrect results in French, German, and other languages. Thanks [@nfriedli](https://github.com/nfriedli).
- **[#71](https://github.com/kevquirk/pureblog/pull/71)** - Fixed emphasis inside blockquotes rendering as italic-on-italic (invisible). Emphasised text within a blockquote now renders in normal style. Thanks [@nfriedli](https://github.com/nfriedli).

**NOTE:** If you prefer keep the capitalisation in Admin, you can do so by adding this to your custom Admin CSS:

```css
.admin-list-meta,
.dashboard-stat-tags,
.dashboard-all-tags-list {
    text-transform: capitalize;
}
```



## 2.4.6 - 23 April 2026
- **New:** "Remember me" checkbox on the admin login page; sets a 90-day persistent cookie so the browser session survives a restart.
- **Fix:** paths starting with reserved directory names (e.g. `/admins`, `/contentfoo`) no longer fall through routing and incorrectly return a 200. They now correctly 404. (reported by [@BenediktFloeser](https://github.com/BenediktFloeser), [#68](https://github.com/kevquirk/pureblog/issues/68))

Translations for new "Remember Me" function were done by an AI, so will likely need a human review. {.notice}



## v2.4.5 - 21 April 2026
- Added Polish (`pl`) language file (thanks [@pmsolo](https://github.com/pmsolo)).
- Improvements to layout picker overlay design.
- Fixed archive view alignment so dates and titles form consistent columns using CSS grid, with a responsive single-column layout on small screens.



## v2.4.4 - 18 April 2026
- Fixed bug in `img+em` and `caption` where top `margin` was causing the caption to overlap the bottom of the image.
- Fixed drag-and-drop image upload inserting wrong filename case in Markdown when filename contained uppercase characters. ([#66](https://github.com/kevquirk/pureblog/issues/66))
- Added `on_image_uploaded(string $path)` hook that fires after a successful image upload, allowing custom processing such as WebP conversion and resizing.
- Fixed RSS feed URL inconsistency where the HTML `<link>` tag referenced `/feed.php` instead of the canonical `/feed`. ([#65](https://github.com/kevquirk/pureblog/issues/65))



## v2.4.3 - 13 April 2026
- Added formatting for URL inputs in admin.
- Added `on_filter_post` filter hook in `edit-post.php`, fired after POST data is assembled and before title validation, allowing hooks to modify post data (e.g. auto-fill the title) prior to save.
- Removed `required` attribute from the post title input so hooks can populate it server-side before validation runs.



## v2.4.2 - 09 April 2026

- Fixed search page rendering page body content above the search form — the search form now replaces the body content inside the same `<article>` wrapper, like every other page.
- Changed front-end CSS so text in code blocks (`pre code`) no longer wraps.
- Fixed updater silently failing to restore ignored paths whose parent directories are not present in the release package (e.g. third-party libraries added to `lib/`).



## v2.4.1 - 08 April 2026

**Added** `content/includes/header.php` and `content/includes/post-list.php` as overrideable layout partials, consistent with the existing `masthead.php`, `footer.php`, and `post-meta.php` override pattern. [Read layout partial docs](/layout-partials).

**Fixed** `config/update-ignore` directory patterns (e.g. `lib/Highlight`) not matching files within that directory.

**Fixed** bug where version number was cached on `dashboard.php` so shows an older version and that an update is required. `settings-updates.php` now removes the cache file during an update.



## v2.4.0 - 08 April 2026

- Added `on_render_markdown` filter hook — allows post-processing of rendered HTML after Markdown conversion (e.g. syntax highlighting)
- Added `config/update-ignore` support — advanced users can create this file to prevent specific files from being replaced during updates. Supports exact paths and glob patterns (e.g. `lang/*`). Ignored files are surfaced in the release package inspection view before applying an update.



## v2.3.4 - 05 April 2026

- Fix translated day/month names being corrupted when both full and short forms are defined (e.g. German "Montag" rendering as "Motag") - thanks [@werschreibt](https://github.com/werschreibt) ([#62](https://github.com/kevquirk/pureblog/issues/62))
- Fix backup not including `VERSION` file, causing it to be missing after a restore
- Fix updater incorrectly including third-party webroot directories (e.g. a FreshRSS install at `/rss/`) in the backup, which could cause them to be deleted during a rollback - thanks [@jan-vandenberg](https://github.com/jan-vandenberg) (reported via email)
- Fix updater showing a generic "unable to copy file" error with no indication of the cause when a file permission problem occurs; the real OS error is now included in the message - thanks [@jan-vandenberg](https://github.com/jan-vandenberg) (reported via email)



## v2.3.3 - 04 April 2026

- Fix fatal errors caused by numeric tag slugs in dashboard and admin content list - thanks [Jan](https://j11g.com/)
- Add setting to configure the admin homepage (dashboard or content) with option to hide Dashboard from navigation

![admin home setting](/content/images/changelog/admin-home-setting.png)



## v2.3.2 - 03 April 2026

### Bug fixes
- Fix missing custom layout picker on dashboard "Write a post" button (#58) - thanks [@justdaj](https://github.com/justdaj)
- Replace hard-coded strings in `index.php`, `post.php`, and `page.php` with `t()` calls - thanks [@werschreibt](https://github.com/werschreibt)
- Fix fatal error when tag slugs are numeric, causing empty posts list in admin - thanks [Jan](https://j11g.com/)



## v2.3.1 - 02 April 2026

### Translations

- **German (de.php):** content section fully translated; nav item corrected to `Inhalte`; `Pure-Blog-Version` hyphenation fixed; post layout label improved. Thanks to [@werschreibt](https://github.com/werschreibt) (PR #50)
- **French (fr.php):** native-speaker corrections throughout — pagination labels, tagline label (`Slogan` → `Sous-titre`), top tags label, password section heading, core files wording (`fichiers du cœur` → `fichiers principaux`), theme reset notice, full content section translation, lockout wording. Thanks to [@tomadeb](https://github.com/tomadeb) (PR #51)

### Bug fixes

- **Tag suggestions in post editor not appearing after upgrade:** the editor fetches `content/tag-index.json` with no cache-busting parameter. After upgrading, the browser could serve a stale cached copy (empty or in the old format), causing no suggestions to appear even after the index was rebuilt. The fetch URL now includes `?v={version}` so browsers always request a fresh copy on each new release. A hard-refresh clears it immediately on existing installs.



## v2.3.0 - 01 April 2026

### New: Content page

A new **Content** page (`admin/content.php`) replaces the old dashboard-as-posts-list and standalone pages list. Posts and Pages now live on separate tabs within a single page. The nav item previously labelled "Pages" is now "Content".

- Tabs and the New button share a single toolbar row (tabs left, button right)
- Users also have the ability to filter posts by year, month, tag, published status, or a combination of all 4
- The search bar has moved inside the "SEARCH & FILTER" `details` element at the top of the `content` page

### New: Stats dashboard

The admin dashboard is now a dedicated stats page, structured as two sections.

**Recent activity (last 12 months)**
- Full-width rolling 12-month post frequency bar chart
- Stat cards: posts published, words written (with books-equivalent), top 5 tags

**All time post stats**
- Full-width posts-by-year bar chart
- Stat cards: total words written (with books-equivalent), average words per post
- Side-by-side bar charts: posts by month of year, posts by day of week
- Full tag list with post counts

A top row of three cards sits above both sections: version status (with update link if a newer version is available), last post published (relative time), and total published posts. Above this is a shortcut button to create a new post.

**Other features:**
- **Dashboard chart links:** bars on the rolling 12-month chart and the posts-by-year chart are clickable links — they open the Content page pre-filtered to that month or year. Empty bars remain non-interactive.
- **Content page filters:** the Content page accepts `?year=`, `?month=`, `?tag=`, and `?status=` query parameters to filter the post list. An active filter is shown as a dismissible notice with a clear link. Filter state is preserved through text search and pagination.

### Other changes

- `detect_current_pureblog_version()`, `normalize_version_label()`, and `versions_match()` moved from `admin/settings-updates.php` into `functions.php` so they are available to any page that loads functions.php
- `relative_time()` helper added to `functions.php` — returns a human-readable "X minutes/hours/days ago" string using `admin.dashboard.time_*` lang keys

### Bug fixes

- **Tag suggestions showed slugs instead of names for multi-word tags:** the tag autocomplete fetched `tag-index.json` and suggested the slug keys (e.g. `web-dev`) rather than the original tag names (e.g. `web dev`). The index now stores each tag's display name alongside its post list, and the autocomplete suggests display names. The suggestion matching is also now case-insensitive, fixing a related issue where capitalised tags (e.g. `Martha Wells`) were never suggested because the typed token was lowercased.
- **Lang files:** `page_not_found` and `page_not_found_detail` were outside the `frontend` array in `es.php`, `it.php`, `nl.php`, `pt.php`, and `ro.php`, causing 404 page translations to be ignored in those languages.
- **Content page date format:** post dates on the Content page were hardcoded to `Y-m-d @ H:i` and ignored the site date format preference. Now uses the user's configured date format; `@ H:i` is appended automatically unless the configured format already includes a time component.
- **Updater preview falsely listed local files as "will be deleted" ([#48](https://github.com/kevquirk/pureblog/issues/48)):** the update plan flagged any local file not present in the release zip as locally-only, including files in entirely separate directories that the updater never touches. The fix scopes the check to top-level directories the release actually replaces, so unrelated files sitting alongside Pure Blog are no longer shown.



## v2.2.1 — 29 March 2026

### Bug fixes
Added `autocomplete="off"` to all text inputs and textareas in the post and page editors to suppress browser input history suggestions.

`absolutize_feed_html()` in `feed.php` was mangling `href` and `src` attributes inside `<code>` and `<pre>` blocks when generating the RSS feed, corrupting code examples. The function now uses DOM parsing to only rewrite attributes on real HTML elements, leaving code block content untouched. Thanks to [@werschreibt](https://github.com/werschreibt) for [the report](https://github.com/kevquirk/pureblog/issues/45).



## v2.2.0 — 27 March 2026

**Upgrading from v2.1.0?** The in-app updater in v2.1.0 used an allowlist that didn't include all new files. Before running the update, manually replace `admin/settings-updates.php` with the [v2.2.0 version](https://github.com/kevquirk/pureblog/blob/main/admin/settings-updates.php) — this ensures the updater can pull down everything correctly, including `sitemap.php`.{.notice}

### Translations
A large number of strings across admin were hardcoded in English and never passed through the translation system. The affected areas are: the 404 page heading and body; the Header Injects, Footer Injects, and Cache section titles in Site Settings (plus four inject field labels); all image upload and delete error messages; autosave JSON error responses; the post and page preview fallback title; all ~30 error and status messages in the updater (`settings-updates.php`); the admin footer credits and link labels; the language-file-missing warning in the admin header; and all 14 user-facing strings in the editor JavaScript (autosave status, restore banner, copy confirmation, upload prompts, and more). JavaScript strings are now serialised from PHP via `window.PureblogEditorConfig.strings` so they pass through the translation system at render time.

All eight language packs have been updated. A pre-existing key (`admin.editor.error_empty_slug`) was also missing from the German, Dutch, Portuguese, and Spanish packs and has been added. **All new non-English translations were produced by AI — if you're a native speaker and spot anything that sounds unnatural, please [open an issue](https://github.com/kevquirk/pureblog/issues) or submit a PR.**

### Added
A `sitemap.php` is now included in the root of every Pure Blog install. It outputs a standard XML sitemap covering the homepage (priority 1.0), all published pages (0.8), and all published posts (0.9), each with a `lastmod` date. Requests to `/sitemap.xml` are automatically redirected to `sitemap.php` via `.htaccess`, so Google Search Console and other tools that expect a static URL work without any extra config. Thanks to [@adegans](https://github.com/adegans) for [the suggestion](https://github.com/kevquirk/pureblog/issues/39).

OpenGraph meta tags are now more complete. Previously only `og:image` was output. Pages and posts now also emit `og:type` (`article` for posts, `website` for everything else), `og:url`, `og:site_name`, `og:title`, `og:description`, and `og:locale` (derived from the configured language). This improves link previews when sharing on Mastodon and other platforms. Thanks to [@reederda](https://github.com/reederda) for [the suggestion](https://github.com/kevquirk/pureblog/issues/38).

The RSS feed now combines two layers of caching. Server-side: the generated XML is cached and reused across requests for the duration of the RSS TTL (Settings → Site), avoiding redundant Markdown rendering. HTTP: `Cache-Control`, `Last-Modified`, `Expires`, and `ETag` headers are sent so RSS readers that respect them won't re-fetch the feed until it changes, saving bandwidth entirely. Clients that do re-request get a `304 Not Modified` response if the feed hasn't changed. Thanks to [@adegans](https://github.com/adegans) for [the suggestion](https://github.com/kevquirk/pureblog/issues/37).

### Fixed
The admin nav menu was constrained to `60rem` by a shared `.mid` rule, making the `max-width` on `.admin-nav` ineffective. The nav list now has its own `max-width: 70rem` so the menu can use more available width.

The updater could silently delete the root `.htaccess` file after an update. If reading the existing `.htaccess` failed quietly during the pre-update snapshot, it would be absent from the preserved-files list and then removed by the post-update cleanup pass. The cleanup now also skips any `.htaccess` inside the `backup/` directory, which previously caused backup copies to be deleted and left rollbacks unable to restore the file.

The file picker button in the post and page editors now correctly filters for AVIF files in browsers that don't map `image/avif` to the `image/*` wildcard. Drag-and-drop was already working. Thanks to [@msone](https://github.com/msone) for [the report](https://github.com/kevquirk/pureblog/issues/35#issuecomment-4135831857).



## v2.1.0 — 26 March 2026

### Added
The search page is now a manageable page in the dashboard. A default `content/pages/search.md` page ships with new installs and is added automatically on update. The search form and results render below any page content you add. The active search page can be changed (or disabled) from Settings → Site, alongside the homepage and blog page selectors. The old `search.php` and `search/` files are removed automatically on update.

Autosave no longer overwrites the live post. Changes are now written to a temporary file in `content/autosaves/` and never touch the published content until you manually save. When you return to edit a post or page with pending autosaved changes, a banner appears offering to **Restore** or **Discard** them, with a **View** toggle to inspect the autosaved content before deciding. Thanks to [@BumbleSusan](https://github.com/BumbleSusan) for [the report](https://github.com/kevquirk/pureblog/issues/34).

AVIF image uploads are now supported alongside JPG, PNG, GIF, and WebP. Thanks to [@msone](https://github.com/msone) for [the request](https://github.com/kevquirk/pureblog/issues/35).

### Fixed
Post and page status labels ("Draft" / "Published") in the admin dashboard and pages list are now translated. Thanks to [@justdaj](https://github.com/justdaj) for [the report](https://github.com/kevquirk/pureblog/issues/36).

The Theme and CSS settings pages were almost entirely hardcoded in English. All labels, section headings, colour field names, reset buttons, and layout options are now fully translated across all eight language packs.

The German translation has been revised based on community feedback: "Website" is replaced with "Blog" throughout settings, the nav link is now "Blog ansehen", the last-published stat reads "Jüngster Beitrag", and font/colour/layout labels use more natural German terminology. Thanks to [Michael](https://blogopa.de) for the feedback on both German translations, and broader gaps.

### Changed
Admin notices now use a 2px coloured border with normal text and a light tinted background, rather than coloured text. Success notices are green-tinted, error notices are red-tinted, with appropriate dark mode variants.



## v2.0.0 — 24 March 2026

### Added
`apply_filter()` helper function and an `on_filter_content` hook. Defining `on_filter_content(string $markdown): string` in `hooks.php` or `content/functions.php` lets you transform post/page content after built-in shortcodes are processed but before Markdown conversion — enabling custom shortcodes, embeds, and other content transforms without touching core.

Search excerpt length is now configurable in site settings. Defaults to 2500 characters per post (up from 500), improving search accuracy without significantly increasing memory usage. Set to 0 to index full post content. Thanks to [@werschreibt](https://github.com/werschreibt) for [the report](https://github.com/kevquirk/pureblog/issues/27).

The post and page editor now autosaves 10 seconds after the last change, but only once a post has been manually saved (i.e. a slug exists). A subtle "Autosaved HH:MM" indicator appears in the editor toolbar.

Internationalisation (i18n) support. UI strings are now loaded from per-language PHP array files in `lang/` (e.g. `lang/en.php`, `lang/de.php`). The existing `language` config key selects the active language file. A `t()` helper function handles dot-notation key lookup and `{placeholder}` substitution throughout templates. Falls back gracefully to English if no matching lang file exists.
- Eight language packs included: English (`en`), French (`fr`), German (`de`), Italian (`it`), Spanish (`es`), Portuguese (`pt`), Dutch (`nl`), and Romanian (`ro`).
    - **Note:** The Portuguese and Italian langage packs are still being reviewed, so may contain errors. Please submit a PR if you find any.
- Date localisation — month and day names in formatted dates are translated automatically via the lang file's `date.months`, `date.months_short`, `date.days`, and `date.days_short` arrays. No new dependencies; works with the existing `date_format` config setting.
- Setup wizard now includes a language select dropdown built from all available `lang/*.php` files. Changing the language reloads the setup page in the chosen language immediately, before any config file exists. Language names are shown in their native language.

The tag field in the post editor now suggests existing tags as you type. Suggestions are sourced from `content/tag-index.json` and are filtered token-by-token after each comma, so multi-tag lists work without losing previous entries. Keyboard navigation (arrow keys, Enter, Tab, Escape) is supported.

### Fixed
- `save_page()` now busts the internal pages cache after writing, so subsequent calls to `get_page_by_slug()` within the same request reflect the updated content. `save_post()` already did this implicitly via `build_search_index()`; pages were inconsistent.
- Post and page content is now saved with Unix line endings (LF). Previously, browsers submitted textarea content with Windows-style CRLF line endings, which were written as-is to `.md` files, causing `^M` characters to appear when editing files in Vim and other Unix tools.
- Raw `.md` source files in `content/` are no longer publicly accessible. Requests are routed through `index.php` and return a 404. A new `content/.htaccess` handles the routing so the fix propagates through updates without touching the root `.htaccess`.
- Post excerpts no longer strip hyphens from mid-word compounds (e.g. German words like `Datenstrom-Yellow-Instanz`). The excerpt sanitiser now targets Markdown syntax precisely — list markers, blockquotes, ATX headings, setext headers, and inline emphasis — rather than stripping `-` globally. Thanks to [@werschreibt](https://github.com/werschreibt) for [the report](https://github.com/kevquirk/pureblog/issues/30).
- Saving a post or page whose title contains only special characters (e.g. `!!!`) now shows a validation error instead of creating an uneditable file with an empty slug. Thanks to [@werschreibt](https://github.com/werschreibt) for [the report](https://github.com/kevquirk/pureblog/issues/26).
- `<time>` elements now include a proper `datetime` attribute with a full ISO 8601 timestamp and timezone offset (e.g. `2026-03-23T14:30:00+01:00`), fixing an HTML validation error. Thanks to [@werschreibt](https://github.com/werschreibt) for [the PR](https://github.com/kevquirk/pureblog/pull/28).
- Fixed several broken paths when Pure Blog is installed in a subfolder. Page preview, image upload, image delete, and the image URLs generated by the editor all hardcoded root-relative paths (e.g. `/admin/edit-post.php`) instead of using `base_path()`, causing 404 errors for anyone not running at the domain root. Thanks to the reporter on [issue #32](https://github.com/kevquirk/pureblog/issues/32).

### Contributors

- My sincere thanks go to the following people who helped to create the language translations:
    - [Marty](https://mastodon.social/@digigeek) & [JW](https://indieweb.social/@jw) (Dutch translation)
    - [Michael](https://blogopa.de),  [Waldemar](https://werschreibt.de.cool/) & [Marco](https://fosstodon.org/@tullney) (German translation)
    - [Jean-Karim Bockstael](https://jkbockstael.be/) (French translation)
    - [Fran](https://masto.es/@franute) and [Ernesto](https://social.lol/@eigenwijs) (Spanish translation)
    - [Cristian](http://www.thinkroot.xyz/) (Romanian translation)
    - [FunctionKey](https://fosstodon.org/@FunctionKey) (Portuguese translation)
    - [Renato](https://fosstodon.org/@renatoram) (Italian translation)
- [Jan van den Berg](https://j11g.com/) for sparking some ideas that made their way in as new features.



## 1.9.7 — 21 March 2026

### Fixed
- Image uploads now work for posts and pages whose titles contain umlauts or other diacritics (e.g. "Über"). `slugify()` now transliterates common diacritics to ASCII equivalents (ü→ue, ö→oe, ä→ae, ß→ss, etc.), and `is_safe_image_slug()` now accepts Unicode letters so existing pages with umlaut slugs are not blocked.



## 1.9.6 — 19 March 2026

### Fixed
- Custom routes now accept `/` as a valid path, allowing a `content/includes` file to be used as the homepage by mapping `/ | /content/includes/filename.php` in the Custom Routes setting.



## 1.9.5 — 18 March 2026

### Improved
- Search now splits multi-word queries and matches each term independently (AND logic), so searching for "wordpress jekyll" returns posts that contain both words anywhere across the title, description, excerpt, or tags — rather than requiring the exact phrase. Emoji and other non-text characters are also stripped from the search haystack before matching, so posts with emoji in their titles (e.g. "📚 A Book I Read") are found correctly.



## 1.9.4 — 17 March 2026

### Added
- `load_yaml_list()` now supports YAML block scalars (`|`) in string fields, allowing multi-line text in data files such as book summaries.

### Fixed
- RSS feed now includes `xmlns:atom` namespace and `atom:link rel="self"` for broader feed reader compatibility. Relative fragment URLs (e.g. footnote links) in feed content are now made absolute.



## 1.9.3 — 16 March 2026

### Added
- Configurable HTML language setting. A `language` field (BCP 47 tag, e.g. `en`, `fr`, `pt-BR`) is now available in site settings and the setup wizard. Previously the `lang` attribute in the HTML header, admin panel, and RSS feed was hardcoded to `en` ([#20](https://github.com/kevquirk/pureblog/issues/20)).

### Removed
- `hide_homepage_title` and `hide_blog_page_title` settings. The underlying title rendering was never implemented, making these settings non-functional. Page titles are managed within page content directly ([#21](https://github.com/kevquirk/pureblog/issues/21)).

### Fixed
- Numeric tags (e.g. `2026`) causing a 500 error on the admin dashboard. PHP coerces numeric string array keys to integers, which then failed a strict type check when passed to `e()` ([#23](https://github.com/kevquirk/pureblog/issues/23)).
- Guard `require_once ParsedownPureblog.php` with `is_file()` so installs upgrading from a version that predates that file don't fatal-crash on any markdown render.

Thanks to [@werschreibt](https://github.com/werschreibt) for the issue submissions.



## 1.9.2 — 13 March 2026

### Fixed
- Added PHP 7.4 polyfills for `str_starts_with()` and `str_contains()`. These functions were introduced in PHP 8.0; installs on PHP 7.4 would fatal-crash on any page load after upgrading to 1.9.0 or 1.9.1.



## 1.9.1 — 13 March 2026

### Added
- `ParsedownPureblog` — a subclass of ParsedownExtra that adds paragraph-level CSS class attribute support (`{.class}`). Useful for notice boxes and other styled blocks. Inline attributes on links and images were already supported via ParsedownExtra.



## 1.9.0 — 13 March 2026

### Added
- Subfolder hosting support. Pure Blog can now be installed in a subdirectory (e.g. `example.com/blog`) without manual path configuration. A new `base_path()` function auto-detects the install prefix by comparing the app root to `DOCUMENT_ROOT`. If `base_url` is set in config it must include the full path (e.g. `https://example.com/blog`).

### Changed
- All internal links, redirects, asset URLs, admin navigation, and SVG sprite references are now subfolder-aware.



## 1.8.1 — 12 March 2026

### Fixed
- Path traversal vulnerability in image upload and delete operations (#16).
- Code blocks inside post headers rendering incorrectly.



## 1.8.0 — 10 March 2026

### Added
- Custom post layouts — define per-post layout templates from the editor.
- Custom functions support — drop a `functions.php` into `/content` to extend Pure Blog without modifying core files.



## 1.7.1 — 6 March 2026

### Fixed
- Improved HTML markup syntax highlighting in dark mode admin editor.
- Added theme hints to the settings UI to help orient new users.



## 1.7.0 — 2 March 2026

### Added
- Page-level output caching, including correct cache-keying for paginated views.

### Fixed
- Square OG image logic corrected; duplicate OG field removed.



## 1.6.5 — 28 February 2026

### Fixed
- Square OG image selection logic.



## 1.6.4 — 26 February 2026

### Added
- Locale support for date formatting.



## 1.6.3 — 25 February 2026

### Fixed
- Tags not working correctly for posts written in non-Latin languages.



## 1.6.2 — 16 February 2026

### Added
- Option to hide the blog feed page entirely.



## 1.6.1 — 16 February 2026

### Fixed
- Hard-coded YAML key lookups left over from test code.



## 1.6.0 — 14 February 2026

### Added
- Custom routes — map arbitrary URL paths to content templates via config.



## 1.5.8 — 14 February 2026

### Fixed
- Pagination broken on search results pages.



## 1.5.7 — 13 February 2026

### Fixed
- ParsedownExtra failing to render emoji correctly.



## 1.5.6 — 13 February 2026

### Fixed
- Auto-updater incorrectly reporting "unknown" as the current version.
- Auto-updater VERSION file not written correctly after update.



## 1.5.5 — 13 February 2026

### Fixed
- Critical bug causing admin hooks to not fire correctly.



## 1.5.4 — 13 February 2026

### Added
- Site title in the admin header is now a link to the live site.

### Fixed
- Improved version detection reliability in the auto-updater.



## 1.5.3 — 12 February 2026

### Fixed
- Minor internal functions.php patch.



## 1.5.2 — 11 February 2026

### Fixed
- `.htaccess` is now never overwritten during an auto-update.
- Excerpt regex updated to prevent link text being stripped from post excerpts (PR #13, thanks @LukeKeller).



## 1.5.1 — 11 February 2026

### Fixed
- Minor patches following the 1.5.0 release.



## 1.5.0 — 11 February 2026

### Added
- In-app auto-updater. Check for and apply new Pure Blog releases directly from the admin settings panel, with automatic backup and rollback.



## 1.4.0 — 10 February 2026

### Added
- ParsedownExtra library bundled — enables extended Markdown syntax (tables, footnotes, attribute syntax, etc.).
- Canonical `<link>` tag in HTML `<head>`.
- CSS classes on tag list elements for theme styling.

### Changed
- Masthead layout refactored into a dedicated include.



## 1.3.1 — 9 February 2026

### Fixed
- Post navigation (previous/next) link tweaks.



## 1.3.0 — 8 February 2026

### Added
- Shortcodes, partials, and content injects — embed reusable content snippets inside posts and pages.
- Footer embed support.

### Fixed
- Issue #5.



## 1.2.0 — 8 February 2026

### Added
- Hooks system — register PHP callbacks to extend core behaviour without editing core files.
- `site_email` global config option.
- Data files — load structured YAML/JSON data from `/content/data` into templates.
- Improved URL handling for RSS feed and search.

### Fixed
- Liquid/code block rendering in sidebar code blocks.
- Various admin UI fixes.
- Background flash (FOUC) during CSS processing eliminated by inlining custom styles.



## 1.1.x and earlier — 6 February 2026

Initial development releases. Core flat-file blogging engine with Markdown posts and pages, admin panel, tag support, RSS feed, and search.
