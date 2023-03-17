import mongodb from 'mongoose';
import redis from 'redis';

class MongoDB {
  constructor() {
    this.mongoClient = mongodb.MongoClient;
    this.ObjectID = mongodb.ObjectID;
  }

  onConnect() {
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(
        process.env.MONGODB_DB_URL, {
          useNewUrlParser: true,
        },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            resolve([client.db('users'), this.ObjectID, client]);
          }
        },
      );
    });
  }
}

const mongoDB = new MongoDB();
const redisClient = redis.createClient();
export { mongoDB, redisClient }
