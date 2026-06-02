---
title: "Quick Tip: Add Emojis to Your Notice Boxes"
date: 2026-02-04
---

Notice boxes in Pure Blog are pretty basic, they're just a coloured box that calls out some text within them. But on this site, I've added some customisations to the notice boxes so that it adds an emoji to the left of the text, depending on the notice type.

Here's some examples:

<p class="notice">This is a <b>normal</b> notice and it has a simple note emoji to the left.</p>

<p class="notice tip">This is a <b>tip</b> notice and it has a light bulb emoji to the left.</p>

<p class="notice announce">This is a <b>announcement</b> notice and it has a megaphone emoji to the left.</p>

<p class="notice warning">This is a <b>warning</b> notice and it has a hazard emoji to the left.</p>

First of all, let's look at how you would add one of these notices to a page or post. All you need to do is add one of the following lines of HTML:

```html
<p class="notice">This is a <b>normal</b> notice and it has a simple note emoji to the left.</p>

<p class="notice tip">This is a <b>tip</b> notice and it has a light bulb emoji to the left.</p>

<p class="notice announce">This is an <b>announcement</b> notice and it has a megaphone emoji to the left.</p>

<p class="notice warning">This is a <b>warning</b> notice and it has a hazard emoji to the left.</p>
```

If you prefer not to use HTML, you can do it in Markdown too, which allows you to use markdown within the notice as well:

```markdown
This is a **normal** notice and it has a simple note emoji to the left. {.notice}

This is a **tip** notice and it has a simple note emoji to the left. {.notice .tip}

This is an **announcement** notice and it has a simple note emoji to the left. {.notice .announce}

This is a **warning** notice and it has a simple note emoji to the left. {.notice .warning}
```

Then, add this custom front-end CSS to your Pure Blog and you should be good to go:

```
.notice,
.notice.announce,
.notice.tip,
.notice.warning {
  position: relative;
  padding-left: 4rem;
}

.notice::before,
.notice.announce::before,
.notice.tip::before,
.notice.warning:before {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  line-height: 1;
}

.notice::before {
  content: "📝";
}

.notice.announce::before {
  content: "📣";
}

.notice.tip::before {
  content: "💡";
}

.notice.warning::before {
  content: "⚠️";
}
```

This simple tweak should give you some slightly nicer notice boxes for your Pure Blog.
