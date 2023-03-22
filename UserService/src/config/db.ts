import mongodb from 'mongoose';
import * as redis from 'redis';

class MongoDB {
  private mongoClient;

  constructor() {
    this.mongoClient = mongodb;
  }
  
  onConnect() {
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
