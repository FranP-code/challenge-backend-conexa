const port = process.env.STORE_PORT ?? 27080;

export default {
  api: {
    port: process.env.PORT ?? 3000
  },
  mongo: {
    url: process.env.MONGO_URI ?? 'mongodb://db/appdb'
  },
  store: {
    port,
    url: process.env.STORE_URL ?? `http://127.0.0.1:${port}`
  }
};
