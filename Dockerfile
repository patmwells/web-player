FROM node:12-alpine as base
WORKDIR /usr/bin/web-player/app

FROM base as builder
COPY app/package.json package.json
RUN npm install
COPY app .
RUN npm run lint
RUN npm run test:unit
RUN npm run prod:build

FROM selenium/standalone-chrome:87.0 as chrome
USER root
COPY --from=builder /usr/bin/web-player/app .
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs && \
    node -v && \
    npm -v
ENV KARMA_BROWSER='ChromeHeadless'
RUN npm run test:browser:run

FROM builder as staged
COPY --from=chrome /dist/test ./dist/test
RUN npm prune --production

FROM base as prod
COPY --from=staged /usr/bin/web-player/app/dist/client ./dist/client
COPY --from=staged /usr/bin/web-player/app/dist/server ./dist/server
COPY --from=staged /usr/bin/web-player/app/package.json ./package.json
COPY --from=staged /usr/bin/web-player/app/node_modules ./node_modules
USER node
CMD ["npm", "run", "prod:start"]
