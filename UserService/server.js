/* eslint-disable no-console */
import express from 'express';
import http from 'http';
import AppConfig from './config/app-config.js';
import { mongoDB } from './config/db.js';
import Routes from './routes.js';

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }

  appConfig() {
    new AppConfig(this.app).includeConfig();
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  /* Including app Routes ends */

  startTheServer() {
    this.appConfig();
    this.includeRoutes();

    // Connect to database
    mongoDB.onConnect();

    const port = process.env.NODE_SERVER_POST || 4000;
    const host = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server()
export default server ;
