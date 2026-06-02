---
title: Setting Time Zones and Date Format
description: How to set your time zone and customise the date format.
date: 2026-02-26
---

Pure Blog version 1.6.4 introduces some new options for setting both your time zone and customising the way in which the date and time are formatted.

Pure Blog defaults to UTC time and a date format of `February 15, 2026`. But you may be in New York, so post publishing times will be wrong. Or maybe you want to use `15/02/2026` as your chosen date format.

Now you can do this.

There are 2 new options in Settings that allow you to set both your time zone and the date/time format. Both time zone and date/time formatting need to use PHP's formatting. Here's some reference guides from the PHP docs:

* [PHP time zone list](https://www.php.net/manual/en/timezones.php)
* [PHP date & time formatting](https://www.php.net/manual/en/datetime.format.php)

The time zone is pretty straightforward, but if you're struggling to work out the PHP docs for date and time, here are some common examples along with what the output would look like:


| Format | Description | Example Output |
|--------|-------------|----------------|
| Y-m-d | ISO date | 2026-02-26 |
| d/m/Y | UK date | 26/02/2026 |
| j F Y | Day month full text | 26 February 2026 |
| D, d M Y | Short textual date | Thu, 26 Feb 2026 |

| Format | Description | Example Output |
|--------|-------------|----------------|
| H:i | 24h time | 15:15 |
| H:i:s | 24h time with seconds | 15:15:09 |
| g:i a | 12h time, am/pm | 3:15 pm |
| h:i:s A | 12h with seconds | 03:15:09 PM |

| Format | Description | Example Output |
|--------|-------------|----------------|
| Y-m-d H:i | Date and time | 2026-02-26 15:15 |
| Y-m-d H:i:s | Date and time with seconds | 2026-02-26 15:15:09 |
| d/m/Y H:i | UK date and time | 26/02/2026 15:15 |
| D, d M Y H:i | Textual date and time | Thu, 26 Feb 2026 15:15 |
