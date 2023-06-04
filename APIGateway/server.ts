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
   * @returns {void}
   */
  public appConfig(): void {
    new AppConfig(this.app).includeConfig();
  }

  /**
   * Including app Routes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-26-03
   *
   * @returns {void}
   */
  public includeRoutes(): void {
    new AppRoutes(this.app).routesConfig();
  }

  /**
   * Start the server
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-26-03
   *
   * @returns {void}
   */
  public startTheServer(): void {
    this.appConfig();
    this.includeRoutes();

    const port: number = config.nodeServerPort as number;
    const host: string = config.nodeServerHost;

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const server = new Server();
server.startTheServer();