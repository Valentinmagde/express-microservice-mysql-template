/* eslint-disable no-console */
import express from "express";
import http from "http";
import AppRoutes from "./src/app/routes/app.route";
import AppConfig from "./src/core/app";
import config from "./src/config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
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
   * @since 2023-26-03
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
   * @since 2023-05-09
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
   * @since 2023-26-03
   *
   * @returns void
   */
  public includeRoutes() {
    new AppRoutes(this.app).routesConfig();
  }

  /**
   * Start the server
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-26-03
   *
   * @returns void
   */
  public startTheServer() {
    this.appConfig();
    this.includeRoutes();

    const port: number = config.node_server_port as number;
    const host: string = config.node_server_host;

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server();
server.startTheServer();