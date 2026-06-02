---
title: "Quick Tip: Add a Custom Font to Your Site"
description: A quick tip on adding custom fonts to your Pure Blog site.
date: 2026-02-05
---

You may have noticed that I'm using a custom font here on the Pure Blog site. I also use a custom mono font on the back end CMS too. In this post I'm going to show you how you can do the same.

The first thing you need to do is find the font you want to use and make sure you have it either in `woff` or `woff2` format. If you don't, you can use the [Font Squirrel web font generator](https://www.fontsquirrel.com/tools/webfont-generator) to convert your font.

<p class="notice warning">Please make sure that the license for the font you want to use allows for free web use.</p>

If you want a good source of great fonts that are generally ok to use for personal projects, take a look at [Google Fonts](https://fonts.google.com) then use the [Google webfont helper](https://gwfh.mranftl.com/fonts) to download the font you want in the correct format.

Once you have the font file(s), copy and paste them to the `/content` folder (I would recommend creating a new `fonts` folder to keep things nice and clean.

Lets say the font you want to use a font called `super-sans`, which has 4 variables (normal, bold, italic, bold italic), and each is provided in both `woff` and `woff2` format. All you need to do is add the following custom CSS to your Pure Blog site and you're good to go:

```
@font-face {
  font-family: 'super-sans';
  src: url('/content/fonts/super-sans-normal.woff2') format('woff2'),
       url('/content/fonts/super-sans-normal.woff') format('woff');
       font-weight: normal;
       font-display: swap;
       font-style: normal;
}

@font-face {
  font-family: 'super-sans';
  src: url('/content/fonts/super-sans-italic.woff2') format('woff2'),
       url('/content/fonts/super-sans-italic.woff') format('woff');
       font-weight: normal;
       font-display: swap;
       font-style: italic;
}

@font-face {
  font-family: 'super-sans';
  src: url('/content/fonts/super-sans-bold.woff2') format('woff2'),
       url('/content/fonts/super-sans-bold.woff') format('woff');
       font-weight: bold;
       font-display: swap;
       font-style: normal;
}

@font-face {
  font-family: 'super-sans';
  src: url('/content/fonts/super-sans-bold-italic.woff2') format('woff2'),
       url('/content/fonts/super-sans-bold-italic.woff') format('woff');
       font-weight: bold;
       font-display: swap;
       font-style: italic;
}
```

What this CSS does is tell Pure Blog that you want to use this font, but you haven't actually declared in your CSS *where* you want to use it. So in order to replace the font on the entire website, you also need to add this little snippet of CSS too:

```
:root {
  --font-stack: "super-sans", system-ui, sans-serif;
}
```

This tells Pure Blog to load your custom font, but if it fails, fallback to the system sans font.

Simple! 🙃
