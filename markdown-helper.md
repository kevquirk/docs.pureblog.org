---
title: Markdown Helper
permalink: /markdown-helper/
description: A reference guide on using Markdown in your posts and pages on your Pure Blog site.
date: 2024-01-01
layout: doc.njk
tags: docs
---

Here's a simple reference guide to help you get started if you've never used Markdown before. There are other elements used in Markdown, but what's listed below should be enough for most blog posts and pages.

## Basic text formatting

```
**Bold text**
*Italic text*
[This is a link](https://example.com)
```

**Bold text**

*Italic text*

[This is a link](https://example.com)

## Headings

```
# H1 heading (used for page/post titles)
## H2 heading (for breaking up posts/pages)
### H3 heading (for sub-headings within H2)
#### H4 heading (no idea why you would use these, but you can 🤷🏻‍♂️)
```
# H1 heading

## H2 heading

### H3 heading

#### H4 heading

## Lists

```
* Generic list item
* Generic list item
* Generic list item

1. Numbered list item
2. Numbered list item
3. Numbered list item
```

* Generic list item
* Generic list item
* Generic list item

1. Numbered list item
2. Numbered list item
3. Numbered list item

## Quotes

```
> This is a blockquote

> This is a blockquote with a citation
>
> <cite>-- Some person</cite>
```

> This is a blockquote

> This is a blockquote with a citation
>
> <cite>-- Some person</cite>

## Tables

```
| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| John     | Doe      | Male     |
| Mary     | Smith    | Female   |

You don't have to align the columns, this works too...

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| John | Doe | Male |
| Mary | Smith | Female |
```

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| John     | Doe      | Male     |
| Mary     | Smith    | Female   |

## Images

```
![Test image](/content/images/markdown-helper/test-image.png)

![Test image](/content/images/markdown-helper/test-image.png)
*This is a test image with a caption*
```
![This is a test image](/content/images/markdown-helper/test-image.png)

![This is a test image with a caption](/content/images/markdown-helper/test-image.png)
*This is a test image with a caption*

## Displaying code

````
You can display inline code `like this`.

Or you can display a block of code, like this:

```
body {
  background: #fff;
}
```
````

You can display inline code `like this`.

Or you can display a block of code, like this:

```
body {
  background: #fff;
}
```
## Adding classes to text

Pure Blog supports adding CSS classes to your text within markdown, so you don't have to switch to HTML. For example if you want to add a class of `.large-text` to a paragraph, you can do so like this:

```
This is a line of text with the class `.large-text` added to it. {.large-text}
```

Which would then be rendered like this:

```html
<p class="large-text">This is a line of text with the class <code>.large-text</code> added to it.</p>
```

this can also be useful when adding notice boxes:

```
This is now a notice box! {.notice}
```

## Adding target and other attributes to links

Pure Blog supports adding custom attributes to your links (such as `target="_blank"`, `id`, or custom classes). To do this, append curly braces with the desired attributes immediately after the link parentheses:

```
[Google](https://google.com){target="_blank"}
[GitHub](https://github.com){.some-class target="_self" id="github-link"}
```

Which would then be rendered like this:

```html
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>
<a href="https://github.com" target="_self" id="github-link" class="some-class" rel="noopener noreferrer">GitHub</a>
```

By default, any external links will automatically have `rel="noopener noreferrer"` added for security and privacy.

## Using Markdown in HTML elements

You can mix and match markdown and HTML for certain elements. For example, to have a `div` that supports markdown you can do this:

```html
<div markdown="1">
    Here I don't have to add HTML, I can use **markdown** instead.
</div>
```
By adding `markdown="1"` to the HTML element, you can add support for markdown. The following elements are supported:

- `div`
- `p`
- `blockquote`
- `aside`
- `details`/`summary`
- `section`, `article`, `header`, `footer`, `nav`
- `figure`/`figcaption`
- `pre`, `ul`, `ol`, `li`, `dl`, `dt`, `dd`
- `table`, `thead`, `tbody`, `tr`, `th`, `td`

Inline elements like `span`, `a`, `em`, `strong` etc. do **not** support it — the attribute is only processed for block-level elements since markdown parsing is line-based.
