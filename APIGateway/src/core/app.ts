/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import bodyParser from "body-parser";
import cors from "cors";
import { Application } from "express";
import DBManager from "./db";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 *
 * Class AppConfig
 */
class AppConfig {
  private app;

  /**
   * Create a new UserController instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @return void
   */
  constructor(app: Application) {
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      // application specific logging, throwing an error, or other logic here
    });
    this.app = app;
  }

  /**
   * Include the config.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @return void
   */
  public includeConfig() {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
  }

  /**
   * Load the App level config.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return void
   */
  public loadAppLevelConfig() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  /**
   * Load the Express config.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return void
   */
  public loadExpressConfig() {
    new DBManager(this.app).setDBConnection();
  }
}

export default AppConfig;