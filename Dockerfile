FROM node:13.12.0-alpine as builder
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /build /usr/share/nginx/html
COPY /nginx/yin-web /etc/nginx/sites-available/yin-web
COPY /nginx/yin-web /etc/nginx/sites-enabled/yin-web
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]