import dotenv from "dotenv";

dotenv.config();

const dev = {
  // Environment
  env: process.env.NODE_ENV || "development",

  // Server config
  nodeServerPort: process.env.NODE_SERVER_PORT || 1000,
  nodeServerHost: process.env.NODE_SERVER_HOST || "localhost",
  nodeServerPrivateKey: process.env.NODE_SERVER_PRIMARY_KEY?.replace(
    /\\n/g,
    "\n"
  ),
  nodeServerPublicKey: process.env.NODE_SERVER_PUBLIC_KEY?.replace(
    /\\n/g,
    "\n"
  ),

  // Micro services url
  userServiceUrl: process.env.USER_SERVICE_URL || "http://localhost:1100",
  productServiceUrl:
    process.env.PRODUCT_SERVICE_URL || "http://localhost:1300",
  orderServiceUrl: process.env.ORDER_SERVICE_URL || "http://localhost:1400",

  // Token config
  // One hour for expiration time (time in seconds)
  accessTokenLife: 60 * 60,
  // One day for expiration time (time in seconds)
  refreshTokenLife: 60 * 60 * 24,

  // Redis db
  redisDbPort: process.env.REDIS_DB_PORT || 6379,
  redisDbHost: process.env.REDIS_DB_HOST || "127.0.0.1",
  redisDbUser: process.env.REDIS_DB_USER || "valentin",
  redisDbPassword: process.env.REDIS_DB_PASSWORD || "password",
  redisDbName: process.env.REDIS_DB_NAME || "redis",

  // Mongo db
  mongoDbHost: process.env.MONGODB_DB_HOST || "127.0.0.1",
  mongoDbPort: process.env.MONGODB_DB_PORT || "27017",
  mongoDbUser: process.env.MONGODB_DB_USER || "valentin",
  mongoDbPassword: process.env.MONGODB_DB_PASSWORD || "password",
  mongoDbName: process.env.MONGODB_DB_NAME || "authentication",

  // Swagger documentation
  swaggerBaseUrl: process.env.SWAGGER_BASE_URL || "/v1/docs",
  swaggerAuthBaseUrl: process.env.SWAGGER_AUTH_BASE_URL || "/v1/auth/docs",
};

export default dev;