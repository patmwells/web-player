FROM node:12-alpine as base
WORKDIR /usr/bin/web-player/app

FROM base as builder
COPY app/package.json package.json
RUN npm install
COPY app .
RUN npm run lint
RUN npm run test:unit
RUN npm run prod:build

FROM selenium/standalone-chrome:87.0 as chrome-87-tests
COPY --from=builder /usr/bin/web-player/app .
USER root
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get install -y nodejs
RUN npm run test:browser:run -- --browsers ChromeHeadless

FROM builder as packaged
COPY --from=chrome-87-tests /dist/test ./dist/test/chrome-87
RUN npm prune --production

FROM base as production
COPY --from=packaged /usr/bin/web-player/app/dist/client ./dist/client
COPY --from=packaged /usr/bin/web-player/app/dist/server ./dist/server
COPY --from=packaged /usr/bin/web-player/app/package.json ./package.json
COPY --from=packaged /usr/bin/web-player/app/node_modules ./node_modules
USER node
CMD ["npm", "run", "prod:start"]
