import dotenv from "dotenv";

dotenv.config();

const dev = {
  // Environment
  env: process.env.NODE_ENV || "development",

  // Server config
  nodeServerPort: process.env.NODE_SERVER_PORT || 1100,
  nodeServerHost: process.env.NODE_SERVER_HOST || "localhost",
  nodeServerPublicKey: process.env.NODE_SERVER_PUBLIC_KEY?.replace(
    /\\n/g,
    "\n"
  ),

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
  mongoDbName: process.env.MONGODB_DB_NAME || "users",

  //  Mysql db
  mysqlDbHost: process.env.MYSQlDB_DB_HOST || "127.0.0.1",
  mysqlDbUser: process.env.MYSQlDB_DB_USER || "root",
  mysqlDbPassword: process.env.MYSQlDB_DB_PASSWORD || "phpuser",
  mysqlDbName: process.env.MYSQlDB_DB_NAME || "users",
  mysqlDbDialect: process.env.MYSQlDB_DB_DIALECT || "mysql",
  mysqlDbPool: {
    max: parseInt(process.env.MYSQlDB_DB_POOL_MAX as any) || 5,
    min: parseInt(process.env.MYSQlDB_DB_POOL_MIN as any) || 1,
    acquire: parseInt(process.env.MYSQlDB_DB_POOL_ACQUIRE as any) || 30000,
    idle: parseInt(process.env.MYSQlDB_DB_POOL_IDLE as any) || 10000
  },

  // Swagger documentation
  swaggerBaseUrl: process.env.SWAGGER_BASE_URL || "/v1/users/docs",
};

export default dev;