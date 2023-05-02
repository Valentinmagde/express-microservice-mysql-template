import { createClient } from 'redis';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 * 
 * Class CacheConfig
 * 
 */
class CacheConfig {
    
    /**
     * Connect to redis storage
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-04-23
     * 
     * @return any
     */
    public async connectToRedis() {
        const port: any = process.env.REDIS_DB_PORT || 6379;
        const host: any = process.env.REDIS_DB_URL || '127.0.0.1';
        const user: any = process.env.REDIS_DB_USER || 'valentin';
        const password: any = process.env.REDIS_DB_PASSWORD || 'phpuser';
        
        const client = createClient({
            url: `redis://${host}:${port}`
        });

        client.on('error', (err: any) => {
            console.log('Redis Client Error', err)
        });

        await client.connect();

        return client;
    }
}

const cacheConfig = new CacheConfig();
export default cacheConfig;