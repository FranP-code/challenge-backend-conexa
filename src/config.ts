const storePort = process.env.STORE_PORT ?? 27080;
const authPort = process.env.AUTH_PORT ?? 5000;
const appPort = process.env.APP_PORT ?? 5200;

export default {
  api: {
    port: process.env.PORT ?? 3000
  },
  app: {
    port: appPort,
    url: process.env.APP_URL ?? `http://127.0.0.1:${appPort}`
  },
  auth: {
    hashSaltTimes: process.env.AUTH_HASH_SALT_TIMES ?? 8,
    port: authPort,
    secretValue: process.env.AUTH_SECRET_VALUE ?? 'secretvalue',
    url: process.env.AUTH_URL ?? `http://127.0.0.1:${authPort}`
  },
  mongo: {
    url: process.env.MONGO_URI ?? 'mongodb://db/appdb'
  },
  store: {
    port: storePort,
    url: process.env.STORE_URL ?? `http://127.0.0.1:${storePort}`
  }
};
