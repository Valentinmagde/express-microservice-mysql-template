import dotenv from "dotenv";

dotenv.config();

const prod = {
     // Environment
    env: process.env.NODE_ENV || 'production',

    // Server config
    node_server_port: process.env.NODE_SERVER_PORT || 1000,
    node_server_private_key: process.env.NODE_SERVER_PRIMARY_KEY?.replace(/\\n/, '\n'),
    node_server_public_key: process.env.NODE_SERVER_PUBLIC_KEY?.replace(/\\n/, '\n'),

    // Micro services url
    user_service_url: process.env.USER_SERVICE_URL || 'http://localhost:1100',
    product_service_url: process.env.PRODUCT_SERVICE_URL || 'http://localhost:1300',
    order_service_url: process.env.ORDER_SERVICE_URL || 'http://localhost:1400',

    // Token config
    access_token_life: Math.floor(Date.now() / 1000) + (60 * 60), // One hour for expiration time
    refresh_token_life: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // One day for expiration time

    // Redis db
    redis_db_port: process.env.REDIS_DB_PORT || 6379,
    redis_db_host: process.env.REDIS_DB_URL || '127.0.0.1',
    redis_db_user: process.env.REDIS_DB_USER || 'valentin',
    redis_db_password: process.env.REDIS_DB_PASSWORD || 'phpuser',
};

export default prod;