import { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import customResponse from "../app/utils/custom-response.util";
import errorNumbers from "../app/utils/error-numbers.util";
import statusCode from "../app/utils/status-code.util";
import config from "../config";

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
   * @param {Application} app the application
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
   * @param {Request} req the http request
   * @param {Response} res the http response
   * @param {NextFunction} next the callback
   *
   * @return {void}
   */
  public onConnect(req: Request, res: Response, next: NextFunction): void {
    const swaggerMicroBaseUrl = config.swaggerBaseUrl;
    const swaggerAuthBaseUrl = config.swaggerAuthBaseUrl;

    // Except documentation route for authentication
    if (
      req.path.indexOf(swaggerMicroBaseUrl) > -1 ||
      req.path.indexOf(swaggerAuthBaseUrl) > -1
    )
      next();
    else {
      const mongoUrl = `mongodb://${config.mongoDbHost}:
        ${config.mongoDbPort}/${config.mongoDbName}`;

      mongoose
        .connect( mongoUrl.replace(/\s+/g, ''))
        .then(() => {
          next();
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
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
   * @since 2023-03-23
   *
   * @returns {void}
   */
  public setDBConnection(): void {
    this.app?.use(this.onConnect); // General middleware
  }
}

export default DBManager;