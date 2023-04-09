/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import customResponse from './src/utils/custom.response';
import AppConfig from './src/config/app.config';
import Routes from './src/routes/routes';
import statusCode from './src/utils/status.code';
import errorNumbers from './src/utils/error.numbers';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 * 
 * Class Server
 */
class Server {
  private app;
  private http;
  
  /**
   * Create a new Server instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @return void
   */
  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
  }

  /**
   * Include config
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
   */
  public appConfig() {
    new AppConfig(this.app).includeConfig();
  }

  /** 
   * Including app Routes starts 
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
   */
  public includeRoutes() {
    new Routes(this.app).routesConfig();
  }

  /** 
   * Connect to database
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
   */
  // public connectToDB() {
  //   mongoDB.onConnect(req, res, next)
  //   .then(() => console.log('Successfully connect to the database'))
  //   .catch((error) => {
  //     const response = {
  //       status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
  //       errNo: errorNumbers.generic_error,
  //       errMsg: error?.message || error,
  //     }
      
  //     return customResponse.error(response, res);
  //   });
  // }

  /** 
   * Start the server
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
   */
  public startTheServer() {
    this.appConfig();
    this.includeRoutes();
    // Default error-handling middleware
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(error)
      }

      const response = {
        status: statusCode.HTTP_INTERNAL_SERVER_ERROR,
        errNo: errorNumbers.generic_error,
        errMsg: error?.message || error,
      }

      return customResponse.error(response, res);
    });

    const port: any = process.env.NODE_SERVER_PORT || 4000;
    const host: any = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server()
export default server ;
