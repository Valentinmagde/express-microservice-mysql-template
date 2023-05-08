import { Application, NextFunction, Request, Response } from 'express';
import mongoose, { Connection } from 'mongoose';
import * as redis from 'redis';
import customResponse from './custom-response.util';
import errorNumbers from './error-numbers.util';
import statusCode from './status-code.util';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class MongoDB
 */
class DBManager {
  private app?: Application;
  /**
   * Create a new MongoDB instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @return void
   */
  constructor(app?: Application) {
    this.app = app;
  }
  
  /**
   * Connect to database.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @return promise
   */
  public onConnect(req: Request, res: Response, next: NextFunction) {
    // Except documentation route for authentication
    if (req.path.indexOf('/v1/users/docs') > -1) return next();
    else{
      mongoose.connect(process.env.MONGODB_DB_URL as string)
      .then(() => {
        next();
      })
      .catch(error => {
        const response = {
          status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
          errNo: errorNumbers.generic_error,
          errMsg: error?.message || error,
        }
        
        return customResponse.error(response, res);
      });
    }
  }

  /** 
   * Set db connection
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
   */
  public setDBConnection() {
    this.app?.use(this.onConnect); // General middleware
  }
}

const redisClient = redis.createClient();
export default DBManager;
export { redisClient };