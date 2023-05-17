/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import customResponse from './src/app/utils/custom-response.util';
import Routes from './src/app/routes/routes';
import statusCode from './src/app/utils/status-code.util';
import errorNumbers from './src/app/utils/error-numbers.util';
import config from './src/config';
import AppConfig from './src/core/app';

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

    const port: number = config.node_server_port as number;
    const host: string = config.node_server_host;

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server()
server.startTheServer();