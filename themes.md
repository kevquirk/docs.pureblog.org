---
title: Themes
description: Some example themes that you can use on your Pure Blog site.
layout: doc.njk
tags: docs
permalink: /themes/
---

This is a list of themes that you can use on your own Pure Blog site. All you need to do is navigate to **Settings → Theme** and update the appropriate colours for light or dark under the **Site Custom Colours** section.

<p class="notice">If you're using a theme you'd like to add to this list, please <a href="https://kevquirk.com/contact">get in touch</a>.</p>

{% for theme in themes %}
<div class="card">
  <h2>{{ theme.name }}</h2>
  <img src="/assets/images/themes/{{ theme.image }}" alt="{{ theme.name }} theme screenshot">
  <table class="themes">
    <thead>
      <tr><th>Variable</th><th>Colour</th><th>Hex Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Background</td><td><span style="background:{{ theme.bg }};border:var(--standard-border);padding:0 13px;"></span></td><td><code>{{ theme.bg }}</code></td></tr>
      <tr><td>Text</td><td><span style="background:{{ theme.text }};border:var(--standard-border);padding:0 13px;"></span></td><td><code>{{ theme.text }}</code></td></tr>
      <tr><td>Accent</td><td><span style="background:{{ theme.accent }};border:var(--standard-border);padding:0 13px;"></span></td><td><code>{{ theme.accent }}</code></td></tr>
      <tr><td>Border</td><td><span style="background:{{ theme.border }};border:var(--standard-border);padding:0 13px;"></span></td><td><code>{{ theme.border }}</code></td></tr>
      <tr><td>Accent Background</td><td><span style="background:{{ theme.accent_bg }};border:var(--standard-border);padding:0 13px;"></span></td><td><code>{{ theme.accent_bg }}</code></td></tr>
    </tbody>
  </table>
</div>
{% endfor %}