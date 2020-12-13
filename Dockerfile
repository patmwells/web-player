FROM node:12-alpine as base
WORKDIR /usr/bin/web-player/app

FROM base as builder
COPY app/package.json package.json
RUN npm install
COPY app .
RUN npm run lint
RUN npm run test:unit
RUN npm run build:prod
RUN npm prune --production

FROM base as prod
COPY --from=builder /usr/bin/web-player/app/dist/client ./dist/client
COPY --from=builder /usr/bin/web-player/app/dist/server ./dist/server
COPY --from=builder /usr/bin/web-player/app/package.json ./package.json
COPY --from=builder /usr/bin/web-player/app/node_modules ./node_modules
CMD ["node", "dist/server/index.js"]
