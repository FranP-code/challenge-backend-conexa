export default {
  api: {
    port: process.env.PORT ?? 3000
  },
  mongo: {
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    url: process.env.MONGO_URI,
    user: process.env.MONGO_INITDB_ROOT_USERNAME
  }
};
