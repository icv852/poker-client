FROM node:18.14-buster-slim
COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM caddy:2

WORKDIR /var/www/html
COPY --from=0 /app/build .
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]