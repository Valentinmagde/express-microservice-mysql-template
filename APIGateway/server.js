/* eslint-disable no-console */
import express from 'express';
import http from 'http';

import Routes from './routes.js';

class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
  }

  /* Including app Routes starts */
  includeRoutes() {
    new Routes(this.app).routesConfig();
  }
  /* Including app Routes ends */

  startTheServer() {
    this.includeRoutes();

    const port = process.env.NODE_SERVER_PORT || 8000;
    const host = process.env.NODE_SERVER_HOST || 'localhost';

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server();
export default server;