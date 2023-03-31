/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import SwaggerDocs from './src/v1/swagger';
import AppConfig from './src/config/app.config';
import { mongoDB } from './src/config/db';
import Routes from './src/routes/routes';

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

    // expressListRoutes({ prefix: '/api/v1' }, 'API:', router );

    // var route, routes: Array<any> = [];

    // this.app._router.stack.forEach(function(middleware: any){
    //   if(middleware.route){ // routes registered directly on the app
    //       routes.push(middleware.route);
    //   } else if(middleware.name === 'router'){ // router middleware 
    //       middleware.handle.stack.forEach(function(handler: any){
    //           route = handler.route;
    //           route && routes.push(route);
    //       });
    //   }
    // });
  
    // routes.forEach(function(temp){
    //   var methods = "";
    //   for(var method in temp.methods){
    //     methods += method + ", ";
    //   }
    //   console.log(temp.path + ": " + methods);
    // });

    const port: any = process.env.NODE_SERVER_PORT || 4000;
    const host: any = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server()
export default server ;
