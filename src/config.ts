const storePort = process.env.STORE_PORT ?? 27080;
const authPort = process.env.AUTH_PORT ?? 5000;

export default {
  api: {
    port: process.env.PORT ?? 3000
  },
  auth: {
    hashSaltTimes: process.env.HASH_SALT_TIMES ?? 8,
    port: authPort,
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
