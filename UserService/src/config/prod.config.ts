import dotenv from "dotenv";

dotenv.config();

const prod = {
    // Environment
    env: process.env.NODE_ENV || 'production',

    // Server config
    node_server_port: process.env.NODE_SERVER_PORT || 1100,
    node_server_public_key: process.env.NODE_SERVER_PUBLIC_KEY?.replace(/\\n/, '\n'),

    // Redis db
    redis_db_port: process.env.REDIS_DB_PORT || 6379,
    redis_db_host: process.env.REDIS_DB_HOST || '127.0.0.1',
    redis_db_user: process.env.REDIS_DB_USER || 'valentin',
    redis_db_password: process.env.REDIS_DB_PASSWORD || 'password',
    redis_db_name: process.env.REDIS_DB_NAME || 'redis',

    // Mongo db
    mongo_db_host: process.env.MONGODB_DB_HOST || '127.0.0.1',
    mongo_db_port: process.env.MONGODB_DB_PORT || '27017',
    mongo_db_user: process.env.MONGODB_DB_USER || 'valentin',
    mongo_db_password: process.env.MONGODB_DB_PASSWORD || 'password',
    mongo_db_name: process.env.MONGODB_DB_NAME || 'users',

    // Swagger documentation
    swagger_base_url: process.env.SWAGGER_BASE_URL || '/v1/users/docs',
};

export default prod;