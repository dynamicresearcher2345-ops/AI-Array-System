# syntax=docker/dockerfile:1
FROM node:20-Alpine AS frontend-build
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
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app/backend
RUN npm install --omit=dev

WORKDIR /app
EXPOSE 80
CMD sh -c "node /app/backend/dist/server.js & nginx -g 'daemon off;'"
