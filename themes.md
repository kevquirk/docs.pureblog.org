---
title: Themes
description: How to use, create, and import themes in Pure Blog.
layout: doc.njk
tags: docs
permalink: /themes/
---

Pure Blog includes a built-in theme management system that makes it easy to change the look and feel of your site. You can choose from a range of bundled presets, create your own custom palettes using the Theme Creator, or import `.json` theme files.

## The Theme Collection

All available themes are displayed in a visual grid under **Settings → Design** in your Pure Blog admin dashboard. Each theme card displays:

- The theme name and status badges (**Active** for your current site theme, or **Custom** for user-created themes).
- Live colour swatches for both **Light Mode** and **Dark Mode** (Background, Text, Accent, Border, and Accent Background).
- Quick action buttons to **Apply**, **Preview**, or **Delete** (for custom themes).

## Previewing Themes

Before applying a theme to your live site, you can preview it in real time:

1. Click the **Preview** button on any theme card.
2. Pure Blog opens your site with the theme's colours applied exclusively for your logged-in administrator session. Visitors will continue seeing your active theme.
3. A sticky bar at the top of the page indicates that you are in preview mode.
4. When you are happy with how it looks, click the **Apply** button in the preview bar to activate the theme across your site.

## Theme Creator

Pure Blog includes a built-in **Theme Creator** to easily build and save custom themes without writing code:

1. On the **Settings → Design** page, open the **Theme Creator** dropdown.
2. Enter a **Theme name** (e.g. `Sunset`).
3. Enter hex colour values for **Light Mode** and/or **Dark Mode**:
   - **Background Colour**
   - **Text Colour**
   - **Accent Colour**
   - **Border Colour**
   - **Accent Background Colour**
4. Click **Save theme**. The theme is saved to `/content/themes/` and immediately added to your Theme Collection.

## Importing Themes

You can import theme files shared by other Pure Blog users or created externally:

1. Navigate to the **Import Theme** section under **Settings → Design**.
2. Select a `.json` theme file from your device.
3. Click **Import theme**. The file is uploaded to your `/content/themes/` directory and will appear in your Theme Collection.

## Theme File Format (`.json`)

Themes in Pure Blog are stored as simple JSON files. If you want to create or share theme files manually, you can use either format below.

### Dual-Mode Theme (Recommended)

A dual-mode theme specifies distinct palettes for light and dark modes:

```json
{
  "name": "Sepia",
  "light": {
    "bg": "#FBF0D9",
    "text": "#5F4B32",
    "accent": "#9E4F28",
    "border": "#D5C4A1",
    "accent_bg": "#F2E5BC"
  },
  "dark": {
    "bg": "#282828",
    "text": "#EBDBB2",
    "accent": "#FE8019",
    "border": "#504945",
    "accent_bg": "#3C3836"
  }
}
```

### Single-Mode Theme (Light or Dark Only)

If a theme is designed exclusively for light mode or dark mode, you can specify just the `light` or `dark` palette object. Applying a single-mode theme will update only the colours for that mode, leaving your other mode settings unchanged:

```json
{
  "name": "Solarized Light",
  "light": {
    "bg": "#FDF6E3",
    "text": "#657B83",
    "accent": "#268BD2",
    "border": "#93A1A1",
    "accent_bg": "#EEE8D5"
  }
}
```

Or for dark mode only:

```json
{
  "name": "Solarized Dark",
  "dark": {
    "bg": "#002B36",
    "text": "#839496",
    "accent": "#268BD2",
    "border": "#586E75",
    "accent_bg": "#073642"
  }
}
```

### Theme Collections

You can also package multiple themes into a single `.json` file by providing an array of theme objects:

```json
[
  {
    "name": "Theme One",
    "light": { ... },
    "dark": { ... }
  },
  {
    "name": "Theme Two",
    "light": { ... },
    "dark": { ... }
  }
]
```

## Deleting Custom Themes

If you want to remove a custom theme you've created or imported, click the **Delete** link on the corresponding theme card. Pure Blog will prompt for confirmation and safely remove the theme file from your `/content/themes/` folder. Bundled core themes cannot be deleted.