---
title: Working with Data Files
description: A quick look at using simple data files in Pure Blog for things like blogrolls and project lists.
date: 2026-02-08
---

One of the things I *really* like about my Jekyll site, was that I could work with [data files](https://jekyllrb.com/docs/datafiles/) to loop through data an spit out structured content. On my personal site, this was useful for things like [my blogroll](https://kevquirk.com/blogroll) and my [Projects page](https://kevquirk.com/projects).

I wanted to have the same feature with Pure Blog, so I built it.

## What is a data file?
It is just a small YAML file that holds a list of items. For example:

```yaml
- name: "Pure Blog"
  url: "https://pureblog.org"
  comment: "A lightweight, flat-file blogging platform."
```

You can store these in a `/data` folder in the root of your Pure Blog install, e.g:

- `data/blogroll.yml`
- `data/projects.yml`

## How do you use it in a page?
In your page content you can include a loop, like this:

```liquid
{% raw %}{% for site in site.data.blogroll %}
<div class="card">
  <h2>{{ site.name }}</h2>
  <p>{{ site.comment }}</p>
  <a class="button" href="{{ site.url }}">Visit</a>
</div>
{% endfor %}{% endraw %}
```

Pure Blog will replace that loop with your actual items at render time. I use this for my blogroll and projects page and it keeps things tidy.

## Limitations
This is **intentionally simple**. It is great for basic lists, not complex templates. If you need more power, you will likely want a proper CMS or a full static site generator.

That said, for the small web and personal sites, this gets the job done.
