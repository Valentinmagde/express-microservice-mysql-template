/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import AppConfig from './config/app-config';
import { mongoDB } from './config/db';
import Routes from './routes';

class Server {
  private app;
  private http;
  
  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
  }

  appConfig() {
    new AppConfig(this.app).includeConfig();
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  /* Including app Routes ends */

  /** Connect to database */
  connectToDB() {
    mongoDB.onConnect();
  }

  startTheServer() {
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
