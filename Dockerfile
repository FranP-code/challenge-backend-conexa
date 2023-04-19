FROM node:latest

RUN npm install -g pnpm

WORKDIR /usr/src

COPY [".", "/usr/src"]

RUN pnpm i

RUN npm i -g pm2

CMD ["pnpm", "pm2"]