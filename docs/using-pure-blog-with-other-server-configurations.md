---
title: Using Pure Blog With Other Server Configurations
description: You may run into problems if you're not running Apache on your web server. This guide should help.
date: 2026-03-12
---

Pure Blog ships with a `.htaccess` file that handles URL routing on Apache, so it works out of the box on most standard shared hosting. If your host uses a different web server, you'll need to configure routing manually using the instructions below.

## Nginx

Add the following to your server block configuration:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location ~ \.php$ {
    try_files $uri =404;
    fastcgi_pass unix:/var/run/php/php-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```

Replace `unix:/var/run/php/php-fpm.sock` with the correct PHP-FPM socket path for your server.

## Caddy

Add the following to your `Caddyfile`:

```
yourdomain.com {
    root * /path/to/pureblog
    php_fastcgi unix//var/run/php/php-fpm.sock
    file_server
    try_files {path} {path}/ /index.php?{query}
}
```

Replace `yourdomain.com` with your domain, `/path/to/pureblog` with the path to your Pure Blog installation, and the PHP-FPM socket path as appropriate.

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
