/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import AppConfig from './config/app.config';
import { mongoDB } from './config/db';
import Routes from './routes';

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
  public connectToDB() {
    mongoDB.onConnect();
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
    this.connectToDB();

    const port: any = process.env.NODE_SERVER_POST || 4000;
    const host: any = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server()
export default server ;
