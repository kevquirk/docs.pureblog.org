---
title: "Quick Tip: Secure Your CMS With IP Filtering"
description: A simple tip for securing your admin CMS with IP filtering.
date: 2026-02-03
---

Pure Blog is pretty secure out the box, but there's always more we can do to secure our stuff. Be default the admin CMS is open to everyone on the Internet, but you can add filtering so only certain IP addresses are able to access `/admin`.

To do this, you need to create a file called `.htaccess` in the `/admin` folder and add the following to it:

```
<IfModule mod_authz_core.c>
    Require ip 11.22.33.44
    Require ip 55.66.77.88
</IfModule>

# Fallback for older Apache (2.2) if needed
<IfModule !mod_authz_core.c>
    Order deny,allow
    Deny from all
    Allow from 11.22.33.44
    Allow from 55.66.77.88
</IfModule>
```

This setup would allow both `11.22.33.44` and `55.66.77.88` to access your admin CMS. If you only want to allow 1 IP address, just remove one of the `Require ip` and `Allow from` lines from the file. Similarly if you want to add additional IP address, just add lines.

If an IP not listed in the file attempts to access your admin CMS, they will receive an `Access Denied` error.

If you ever want to remove these IP restrictions, just delete the `.htaccess` file from your `/admin` folder.

Simple! 🙃
