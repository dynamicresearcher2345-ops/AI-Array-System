FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

FROM node:20-alpine AS backend-build
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install
COPY backend ./
RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
COPY --from=backend-build /app/backend /app/backend

COPY nginx.conf.template /etc/nginx/conf.d/default.conf
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]
