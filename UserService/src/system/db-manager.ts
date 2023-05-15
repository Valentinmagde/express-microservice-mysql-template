import { Application, NextFunction, Request, Response } from "express";
import mongoose, { Connection } from "mongoose";
import * as redis from "redis";
import customResponse from "../app/utils/custom-response.util";
import errorNumbers from "../app/utils/error-numbers.util";
import statusCode from "../app/utils/status-code.util";
import config from "../config/index.config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 *
 * Class DBManager
 */
class DBManager {
  private app?: Application;
  /**
   * Create a newDBManager instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @return void
   */
  constructor(app?: Application) {
    this.app = app;
  }

  /**
   * Connect to database.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @return promise
   */
  public onConnect(req: Request, res: Response, next: NextFunction) {
    const swagger_base_url = config.swagger_base_url;

    // Except documentation route for authentication
    if (req.path.indexOf(swagger_base_url) > -1) return next();
    else {
      mongoose
        .connect(
          `mongodb://${config.mongo_db_host}:${config.mongo_db_port}/${config.mongo_db_name}`
        )
        .then(() => {
          next();
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
            errNo: errorNumbers.generic_error,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    }
  }

  /**
   * Set db connection
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   *
   * @returns void
   */
  public setDBConnection() {
    this.app?.use(this.onConnect); // General middleware
  }
}

export default DBManager;