---
title: Using Pure Blog With Other Server Configurations
description: You may run into problems if you're not running Apache on your web server. This guide should help.
date: 2026-03-12
---

Pure Blog ships with a `.htaccess` file that handles URL routing on Apache, so it works out of the box on most standard shared hosting. If your host uses a different web server, you'll need to configure routing manually using the instructions below.

## Nginx

Add the following to your server block configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/pureblog;
    index index.php;

    # --- Front controller -------------------------------------------------
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # --- Pretty sitemap ---------------------------------------------------
    rewrite ^/sitemap\.xml$ /sitemap.php last;

    # --- Block sensitive paths --------------------------------------------
    location ~ ^/(data|content/autosaves|content/layouts)/ {
        deny all;
    }

    location ~ \.md$ {
        deny all;
    }

    # --- Block PHP execution in content/ ----------------------------------
    # Must be placed above the general PHP block to intercept uploaded files
    location ~* ^/content/.*\.php[0-9]?$ {
        deny all;
    }

    # --- PHP processor ----------------------------------------------------
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # --- Static asset caching ---------------------------------------------
    location ~* \.(woff|woff2|ttf)$ {
        expires 3m;
        add_header Cache-Control "public, no-transform";
    }

    location ~* \.(css|js|gif|jpg|jpeg|png|svg|webp|ico)$ {
        expires 1m;
        add_header Cache-Control "public, no-transform";
    }
}
```

Replace `yourdomain.com` with your domain, `/path/to/pureblog` with the path to your Pure Blog installation, and `unix:/var/run/php/php-fpm.sock` with the correct PHP-FPM socket path for your server.

## Caddy

Add the following to your `Caddyfile`:

```caddy
yourdomain.com {
	root * /path/to/pureblog

	# --- Front controller -------------------------------------------------
	# Serve existing files and directories, send everything else to index.php.
	# php_fastcgi already does this internally, so no explicit try_files is needed.
	# Adjust the socket path or use 127.0.0.1:9000 for a TCP pool.
	php_fastcgi unix//var/run/php/php-fpm.sock
	file_server

	# --- Pretty sitemap ---------------------------------------------------
	# Rewrite sitemap.xml to sitemap.php
	rewrite /sitemap.xml /sitemap.php

	# --- Block sensitive paths --------------------------------------------
	# Prevent access to runtime state, draft autosaves, templates, and raw Markdown posts
	@blocked path /data/* /content/autosaves/* /content/layouts/* *.md
	handle @blocked {
		error 403
	}

	# Prevent execution of any uploaded PHP files under the content directory
	@content_php {
		path /content/*
		path_regexp \.(php[0-9]?|phtml)$
	}
	handle @content_php {
		error 403
	}

	# --- Static asset caching ---------------------------------------------
	@fonts path *.woff2 *.woff *.ttf
	header @fonts Cache-Control "public, max-age=7776000"

	@static path *.css *.js *.gif *.jpg *.jpeg *.png *.svg *.webp *.ico
	header @static Cache-Control "public, max-age=2592000"

	# --- Optional: restrict /admin by IP ----------------------------------
	# Add your public IP addresses to the remote_ip condition to restrict access
	# @admin_denied {
	#	path /admin /admin/*
	#	not remote_ip 11.22.33.44 55.66.77.88
	# }
	# handle @admin_denied {
	#	error 403
	# }
}
```

Replace `yourdomain.com` with your domain, `/path/to/pureblog` with the path to your Pure Blog installation, and `/var/run/php/php-fpm.sock` with the correct path to your PHP-FPM socket.

*Special thanks to [Jack Baty](https://baty.net/) for providing this improved Caddy configuration.*

## LiteSpeed

LiteSpeed is largely Apache-compatible and should honour the `.htaccess` file that ships with Pure Blog without any additional configuration. If you find it isn't working, check that `.htaccess` override is enabled in your LiteSpeed virtual host configuration.

If you're using OpenLiteSpeed, add the following rewrite rules to your virtual host configuration:

```
rewrite  {
    enable                  1
    autoLoadHtaccess        1
}
```

Enabling `autoLoadHtaccess` will cause OpenLiteSpeed to read the included `.htaccess` file automatically.

## IIS (Windows Server)

Create a `web.config` file in the Pure Blog root directory with the following contents:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <!-- Block access to sensitive directories and files -->
                <rule name="Block sensitive paths" stopProcessing="true">
                    <match url="^(data/|content/autosaves/|content/layouts/|.*\.md$)" />
                    <action type="CustomResponse" statusCode="403" statusReason="Forbidden" statusDescription="Access is forbidden." />
                </rule>

                <!-- Prevent execution of uploaded PHP files -->
                <rule name="Block PHP in content" stopProcessing="true">
                    <match url="^content/.*\.ph(p[0-9]?|tml)$" />
                    <action type="CustomResponse" statusCode="403" statusReason="Forbidden" statusDescription="Access is forbidden." />
                </rule>

                <!-- Pretty sitemap -->
                <rule name="Sitemap" stopProcessing="true">
                    <match url="^sitemap\.xml$" />
                    <action type="Rewrite" url="sitemap.php" />
                </rule>

                <!-- Front controller -->
                <rule name="Pure Blog" stopProcessing="true">
                    <match url="^(.*)$" />
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="index.php" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

This requires the **IIS URL Rewrite** module to be installed, which can be downloaded from the Microsoft IIS website.

## UberSpace

If you want to use PureBlog on [Uberspace](https://uberspace.de) you have to add an additional line in `.htaccess`, right after the opening `RewriteEngine On`:

```
RewriteEngine On

# add if on uberspace.de
RewriteBase /

<<< REST OF .htaccess file >>>

```
