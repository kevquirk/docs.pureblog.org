---
title: Using Search
description: Learn how search works in Pure Blog, how to configure the search page, and how to customise its content.
date: 2026-09-13
---

Pure Blog includes built-in full-text search capability for your blog posts without requiring external search services or complex databases.

## How Search Works

When visitors use the search form, Pure Blog queries an optimised index containing:
* Post and page titles
* Post and page descriptions
* Post tags
* Post and page content excerpts

By default, Pure Blog indexes both published blog posts and published pages managed within the CMS.

<p class="notice">Search indexes Markdown posts and pages managed in Pure Blog. Custom routes and custom PHP includes (such as custom archives or external PHP files) are not indexed.</p>

## Search Configuration

Under **Settings** &rarr; **Site Settings**, you can configure search indexing behaviour:

* **Search excerpt length** &ndash; The number of characters indexed per post or page (default: `2500`). Higher values improve search precision for long articles and pages, while slightly increasing memory usage and index size. Set this value to `0` to index the full content without truncation.
* **Include pages in search results** &ndash; By default, published pages are indexed alongside blog posts. Uncheck this option if you want search queries to match blog posts only.

## The Search Page

By default, Pure Blog designates the page with the slug `search` (accessible at `/search`) as the search page.

If you wish to use a different URL for search:
1. Navigate to **Settings** &rarr; **Site Settings** in the admin dashboard.
2. Scroll to the **Search Page** setting.
3. Select any of your existing pages from the dropdown list.

## Adding Content to the Search Page

You can edit your search page just like any other static page in **Content** &rarr; **Pages**.

Any Markdown content, headings, introductory text, or images added to your search page will be rendered directly above the search input form and search results. This is useful for:
* Providing search tips or instructions
* Adding a welcome message or site index guidance
* Including helpful links to popular tags or archives

## Special Page Badges in Admin

To make it easy to see which pages are serving special dynamic roles on your site, the **Pages** list in the admin area displays distinct badges alongside each page's status:

* **Home page** &ndash; The page configured as your site homepage.
* **Blog page** &ndash; The page configured to display your blog feed.
* **Search page** &ndash; The page configured to handle site searches.

Read more in the [Special pages](/special-pages/) guide.
