FROM node:latest

RUN npm install -g pnpm

WORKDIR /usr/src

COPY [".", "/usr/src"]

RUN pnpm i

CMD ["pnpm", "start"]