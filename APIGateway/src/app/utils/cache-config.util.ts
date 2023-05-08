import { RedisClientType, createClient } from 'redis';
import i18n from '../../assets/translations';
import config from '../../configs/index.config';

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
     * @return RedisClientType
     */
    public async connectToRedis() {
        return new Promise<RedisClientType>(async(resolve, reject) => {
            
            const client: RedisClientType = createClient({
                url: `redis://${config.redis_db_host}:${config.redis_db_port}`
            });

            client.on('error', (err: any) => {
                reject(
                    `${i18n.en.cache.redis.REDIS_CONNECTION_TO} ${config.redis_db_host}:${config.redis_db_port} ${i18n.en.cache.redis.FAILD}`
                );
            });

            await client.connect();

            resolve(client);
        });
    }
}

const cacheConfig = new CacheConfig();
export default cacheConfig;