FROM node:12-alpine as base
WORKDIR /usr/bin/web-player/app

FROM base as source
COPY app/package.json package.json
RUN npm install
COPY app .

FROM source as browser-tests
RUN npm run prod:build -- --config-name browser-tests
CMD npm run test:browser:run -- --browsers bs_chrome_87_mac

FROM source as builder
RUN npm run lint
RUN npm run test:unit
RUN npm run prod:build
RUN npm prune --production

FROM base as production
COPY --from=builder /usr/bin/web-player/app/dist/client ./dist/client
COPY --from=builder /usr/bin/web-player/app/dist/server ./dist/server
COPY --from=builder /usr/bin/web-player/app/package.json ./package.json
COPY --from=builder /usr/bin/web-player/app/node_modules ./node_modules
USER node
CMD ["npm", "run", "prod:start"]
