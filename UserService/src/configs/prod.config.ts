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
    redis_db_host: process.env.REDIS_DB_URL || '127.0.0.1',
    redis_db_user: process.env.REDIS_DB_USER || 'valentin',
    redis_db_password: process.env.REDIS_DB_PASSWORD || 'phpuser',

    // Swagger documentation
    swagger_basw_url: process.env.SWAGGER_BASE_URL || '/v1/users/docs',
};

export default prod;