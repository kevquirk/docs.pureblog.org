---
title: How to Write Content
description: A quick guide on writing content with Pure Blog.
date: 2026-02-04
---

Now that you've [setup your site](/getting-started), it's time for the fun part - writing content!

Luckily for you, Pure Blog includes a simple Content Management System (CMS) to help you write all those lovely thoughts swirling around your grey matter.

## Login

The first thing you need to do is login to the Pure Blog CMS. To do this, you visit `/admin` and login with the credentials you set when you setup Pure Blog.

Once logged in you will be taken to the dashboard, which is a lost of all the blog posts your written. Obviously on a new blog your dashboard will be empty, but I hope you fill it up quickly!

<p class="notice tip">Draft posts will always be listed at the top of your dashboard.</p>

![Dashboard](/assets/images/how-to-write-content/dashboard.webp)

## Write a new post

Once you're in the dashboard, you can hit the <kbd>NEW POST</kbd> to start a fresh post. It's all pretty self explanatory at this point, but I'll give you a few tips:

- The **Content** window supports both Markdown and plain HTML. If you're not familiar with how Markdown works, [this reference guide](/markdown-helper) should help.
- The **Slug** is the URL of your post and will be automatically set. If you want to change it to something different, you can.
- The **Description** is used to give you post a HTML meta description.
- The **Status** field tells Pure Blog whether the post is ready for prime time. `Draft` posts are not visible on the site, but can be previewed from the editor. `Published` posts are publicly available for the world to enjoy.

<p class="notice tip">If Pure Blog detects that you've used a slug elsewhere on your site, it will append a number so the URL doesn't duplicate.</p>

Here's what this post looks like in the Pure Blog CMS:

![post example](/assets/images/how-to-write-content/post-example.webp)

## Managing images

There's 2 ways in which you can add images to your content. You can use the image uploader, which is found in the editor sidebar. Simply click on the <kdb>Browse</kbd> buttons and select your image. ONce you're happy, click the <kbd>UPLOAD</kbd> button and the image will be added to your post.

![images](/assets/images/how-to-write-content/images.webp)

From there you can delete any images, or click the <kbd>COPY</kbd> button to copy the correct Markdown for that image to your clipboard. Then, head to the main content area, find where you want the image to be inserted, and paste in the Markdown.

Ta daaa! You image has been inserted.

The other way of doing it is to simply drag and drop the image from your computer, into the content area. Pure Blog will automatically upload the image for you, and add the Markdown where ever your cursor was.

## Creating a page

Creating a page is pretty much exactly the same as creating a post, except you go to the Pages part of the CMS and hit the <kbd>NEW PAGE</kbd> button there.

Pages don't have a tag field as pages cannot be tagged. There is an additional option for adding your page to the site's navigation menu.

Here's a video that walks through what we covered in this post:

<video controls width="100%" preload="metadata">
  <source src="https://kevq.b-cdn.net/pure-blog/02-creating-content.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
