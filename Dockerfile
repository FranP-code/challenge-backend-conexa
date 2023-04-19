FROM node:latest

RUN npm install -g pnpm pm2

WORKDIR /usr/src

COPY ["./package.json", "/usr/src/package.json"]

RUN pnpm i

COPY [".", "/usr/src"]

CMD ["pnpm", "pm2"]