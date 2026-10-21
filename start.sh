#!/bin/sh
set -eu

cd /app/backend
npm install --omit=dev --no-audit --no-fund
node dist/server.js > /tmp/backend.log 2>&1 &

nginx -g 'daemon off;'
