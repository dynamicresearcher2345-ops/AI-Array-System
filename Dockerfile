# syntax=docker/dockerfile:1
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache nginx

COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
COPY --from=backend-build /app/backend/dist /app/backend/dist
COPY --from=backend-build /app/backend/package.json /app/backend/package.json
COPY frontend/nginx.conf /etc/nginx/nginx.conf.template

WORKDIR /app/backend
RUN npm install --omit=dev

WORKDIR /app
EXPOSE 8080
CMD ["sh","-c","sed \"s/__PORT__/${PORT:-8080}/\" /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf; PORT=4000 node /app/backend/dist/server.js & exec nginx -g 'daemon off;'"]
