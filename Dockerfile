FROM node:20-bullseye-slim
# RUN apk add --no-cache bash
ENV NODE_ENV production

WORKDIR usr/src/app
COPY dist dist/
COPY node_modules node_modules/


CMD ["node", "./dist/server/server.js"]

EXPOSE 8080
