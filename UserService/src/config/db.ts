import mongodb from 'mongoose';
import * as redis from 'redis';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class MongoDB
 */
class MongoDB {
  private mongoClient;

  /**
   * Create a new MongoDB instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @return void
   */
  constructor() {
    this.mongoClient = mongodb;
  }
  
  /**
   * Connect to database.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @return promise
   */
  public onConnect() {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(process.env.MONGODB_DB_URL as string)
      .then(client => resolve(client))
      .catch(error => reject(error));
    });
  }
}

const mongoDB = new MongoDB();
const redisClient = redis.createClient();
export { mongoDB, redisClient }
