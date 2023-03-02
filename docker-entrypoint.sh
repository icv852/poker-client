#!/bin/sh
set -eu

echo 'SERVER_URL = "'${SERVER_URL}'"' > /var/www/html/config.js

exec caddy file-server