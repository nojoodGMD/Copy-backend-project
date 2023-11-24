import 'dotenv/config';

export const dev = {
  app: {
    port: Number(process.env.SERVER_PORT) || 3002,
  },
  db: {
    url: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/e-commerce-db",
  }
};
