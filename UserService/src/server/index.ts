/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import customResponse from '../app/utils/custom-response.util';
import AppConfig from '../app/utils/app-config.util';
import Routes from '../app/routes/routes';
import statusCode from '../app/utils/status-code.util';
import errorNumbers from '../app/utils/error-numbers.util';

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
server.startTheServer();