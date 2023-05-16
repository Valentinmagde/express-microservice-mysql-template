import { RedisClientType, createClient } from 'redis';
import i18n from './i18n-config';
import config from '../config/index.config';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 * 
 * Class CacheManager
 * 
 */
class CacheManager {
    
    /**
     * Connect to redis storage
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-04-23
     * 
     * @return RedisClientType
     */
    public async connectToRedis() {
        return new Promise<RedisClientType>(async(resolve, reject) => {
            
            const client: RedisClientType = createClient({
                url: `redis://${config.redis_db_host}:${config.redis_db_port}`
            });

            client.on('error', () => {
                reject(
                    `${i18n.__("config.cache.redis.REDIS_CONNECTION_TO")} ${config.redis_db_host}:${config.redis_db_port} ${i18n.__("config.cache.redis.FAILD")}`
                );
            });

            await client.connect();

            resolve(client);
        });
    }
}

const cacheManager = new CacheManager();
export default cacheManager;