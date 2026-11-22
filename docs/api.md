---
title: REST API
description: Create, read, update, and delete posts, pages, and images externally using Pure Blog's JSON REST API.
date: 2026-11-22
---

Pure Blog includes a lightweight JSON REST API so you can create, edit, and delete posts, pages, and images from external tools, scripts, or editors.

API access is **disabled by default** and is only active once you generate an API token.

## Enabling the API & authentication

1. Log in to your Pure Blog admin area and go to **Settings > User**.
2. Scroll to **API access** and click **Generate API token**.
3. Copy the token immediately — it starts with `pb_` and is only shown once.

Include the token in the `Authorization` header on every request:

```http
Authorization: Bearer pb_your_token_here
```

You can regenerate or revoke your token at any time from **Settings > User**. Revoking the token disables API access immediately.

### Upgrading from an earlier version of Pure Blog?

Pure Blog preserves `.htaccess` files during updates, so if you are on Apache (especially PHP-FPM/CGI shared hosting) and see `401` errors despite sending a valid token, add this line to your `.htaccess` above the `index.php` rewrite rule:

```apache
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
```

If you run Pure Blog on Nginx or Caddy instead of Apache, requests to `/api` and `/api/...` are routed via `index.php` automatically as long as your server forwards non-file requests to `index.php`. See [Other server configs](/docs/using-pure-blog-with-other-server-configurations/) for general rewrite guidance. {.notice}

## Base URL & health check

All endpoints live under `/api` (or `/api.php`):

```bash
curl -H "Authorization: Bearer pb_your_token_here" \
  https://example.com/api/health
```

```json
{
  "ok": true,
  "version": "3.9.3"
}
```

## Posts

### List posts

`GET /api/posts`

Optional query parameters:
- `status` — filter by `draft`, `scheduled`, or `published`.
- `limit` — maximum number of posts to return.
- `offset` — number of posts to skip.
- `include_content` — set to `0` to omit the Markdown `content` field from each item.

```bash
curl -H "Authorization: Bearer pb_your_token_here" \
  "https://example.com/api/posts?status=published&limit=10"
```

### Get a single post

`GET /api/posts/{slug}`

Returns the full post object (including drafts and scheduled posts).

### Create a post

`POST /api/posts`

Fields (JSON):
- `title` *(required)* — post title.
- `slug` — URL slug (auto-generated from `title` if omitted; numeric suffix added if already in use).
- `date` — publish/storage date-time string (defaults to current site date-time).
- `status` — `draft` (default), `scheduled`, or `published`.
- `tags` — array of strings or comma-separated string.
- `description` — short summary/excerpt override.
- `layout` — custom post layout name.
- `feature_image` — path or URL to the feature image.
- `meta_title` — custom SEO title.
- `meta_description` — custom SEO description.
- `content` — raw Markdown body.

```bash
curl -X POST https://example.com/api/posts \
  -H "Authorization: Bearer pb_your_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello from the API",
    "status": "published",
    "tags": ["updates", "api"],
    "content": "This post was published via the Pure Blog API."
  }'
```

Returns `201 Created` with `{ "post": { ... } }`.

### Update a post

`PUT /api/posts/{slug}` or `PATCH /api/posts/{slug}`

Send a JSON object with any fields you want to change. Fields omitted from the payload keep their existing values.

```bash
curl -X PATCH https://example.com/api/posts/hello-from-the-api \
  -H "Authorization: Bearer pb_your_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "published",
    "content": "Updated Markdown body."
  }'
```

### Delete a post

`DELETE /api/posts/{slug}`

Returns `200 OK` with `{ "ok": true, "deleted": "hello-from-the-api" }`.

## Pages

Page endpoints mirror the post endpoints:

- `GET /api/pages` — list all pages (supports `?status=draft|published` and `?include_content=0`).
- `GET /api/pages/{slug}` — get a single page.
- `POST /api/pages` — create a page (`title` required; optional `slug`, `status` [`draft` or `published`], `description`, `include_in_nav`, `nav_order`, `nav_label`, `feature_image`, `meta_title`, `meta_description`, `content`).
- `PUT /api/pages/{slug}` or `PATCH /api/pages/{slug}` — update an existing page.
- `DELETE /api/pages/{slug}` — delete a page.

## Images

### Upload an image

`POST /api/images`

Send a `multipart/form-data` request with:
- `image` *(required)* — image file (`jpg`, `png`, `gif`, `webp`, or `avif`).
- `slug` *(optional)* — target folder under `/content/images/` (e.g. your post slug). Defaults to `library`.

Pure Blog strips image metadata, runs any `on_image_uploaded` hooks, and generates thumbnails automatically.

```bash
curl -X POST https://example.com/api/images \
  -H "Authorization: Bearer pb_your_token_here" \
  -F "slug=hello-from-the-api" \
  -F "image=@/path/to/photo.jpg"
```

Returns `201 Created`:

```json
{
  "ok": true,
  "filename": "photo.jpg",
  "folder": "hello-from-the-api",
  "url": "/content/images/hello-from-the-api/photo.jpg",
  "markdown": "![photo](/content/images/hello-from-the-api/photo.jpg)"
}
```

You can then embed the returned `markdown` in your post's `content` or pass `url` as `feature_image`.

## Error responses

Errors return an appropriate HTTP status code (`400`, `401`, `404`, `405`, `409`, `413`, `422`, or `500`) and a JSON body:

```json
{
  "error": "Post not found."
}
```
