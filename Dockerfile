FROM node:latest

RUN npm install -g pnpm

WORKDIR /usr/src

COPY [".", "/usr/src"]

RUN pnpm i

RUN npm i -g pm2

# RUN npx tsc

# RUN pm2 start dist/storage/index.js

CMD ["pnpm", "pm2"]