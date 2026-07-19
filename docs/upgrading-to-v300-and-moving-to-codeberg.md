---
title: Upgrading to v3.0.0 and Moving to GitHub
description: More info on the v3.0.0 upgrade process, and the move to GitHub.
date: 2026-05-08
---

[v3.0.0](https://github.com/kevquirk/pureblog/releases/tag/v3.0.0) of Pure Blog has brought with it a tonne of changes. While there aren't any new features, it's a huge maintenance release that warranted a major version bump.

However, one of the things that changed was the Pure Blog updater tool, which means that if you were to try and update to v3.0.0 using the current updater, it would break your site.

This is because of a compatibility problem where the old updater doesn't know what to do with the new file structure, so they can't be pulled down, and they won't be pulled down until the updater is updated. So we're in a quandary.

## Moving to GitHub

I've been [moving away from GitHub](https://kevquirk.com/thoughts-on-leaving-github) over the last week or so, but I've held off moving my public code repositories so far. However, because of the challenges with the updater tool and v3.0.0, I wanted a way to formally release the latest version, but in a way that blocks Pure Blog users from using the updater.

[David](https://forkingmad.blog/) had the idea to use this as an opportunity to flip the switch to GitHub, thus allowing me to do a proper release, yet protect existing v2.x users as the existing updater will look to GitHub, where no new update has been published.

## Next steps

v3.0.0 is [already published on GitHub](https://github.com/kevquirk/pureblog/releases/tag/v3.0.0), so now I will release a small update on the v2.x GitHub repo that simply adds a notice in the admin area that explains the move to GitHub, and linking to this post.

Then you can all do a manual upgrade to v3.0.0 and from then on, things should be easier. As part of the v3.0.0 release, I've added a feature to the updater that will allow me to add a flag that tells Pure Blog not to download a release as it had breaking changes, and instead pushes you to the release notes.

This should prevent this from happening again.

As always, I'm humbled and honoured that you have decided to use Pure Blog for your websites, and I hope you continue to be happy with it. If you have any questions, please go [get in touch](https://kevquirk.com/contact), or if you're having problems with your Pure Blog site, [log an issue on GitHub](https://github.com/kevquirk/pureblog/issues).
