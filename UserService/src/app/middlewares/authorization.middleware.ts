import { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import i18n from "../../core/i18n";
import customResponse from "../utils/custom-response.util";
import errorNumbers from "../utils/error-numbers.util";
import statusCode from "../utils/status-code.util";
import cacheManager from "../../core/cache";
import config from "../../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-03-26
 *
 * Class Authorization
 */
class Authorization {
  private app?: Application;

  /**
   * Create a new Authorization instance.
   *
   * @return void
   */
  constructor(app?: Application) {
    this.app = app;
  }

  /**
   * Check if user is authenticated
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param Request req
   * @param Response res
   * @param NextFunction next
   * @returns any of next function or unauthorize message
   */
  public isAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.indexOf(config.swagger_base_url) > -1) return next();
    else {
      const public_key = config.node_server_public_key as string;
      const authorization = req.headers.authorization;
      const token =
        authorization && authorization.slice(7, authorization.length); // Bearer XXXXXX

      // token provided?
      if (token) {
        cacheManager
          .connectToRedis()
          .then(async (redisClient) => {
            const inDenyList: string | null = await redisClient.get(
              `bl_${token}`
            );

            // token in deny list?
            if (inDenyList) {
              const response = {
                status: statusCode.HTTP_UNAUTHORIZED,
                errNo: errorNumbers.invalid_token,
                errMsg: i18n.__("user.unauthorize.IVALID_TOKEN"),
              };

              return customResponse.error(response, res);
            } else {
              // token valid?
              jwt.verify(token, public_key, (err, decode) => {
                if (err) {
                  const response = {
                    status: statusCode.HTTP_UNAUTHORIZED,
                    errNo: errorNumbers.invalid_token,
                    errMsg: i18n.__("user.unauthorize.IVALID_TOKEN"),
                  };

                  return customResponse.error(response, res);
                } else {
                  req.user = decode;
                  next();
                }
              });
            }
          })
          .catch((error) => {
            const response = {
              status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
              errNo: errorNumbers.generic_error,
              errMsg: error?.message || error,
            };

            return customResponse.error(response, res);
          });
      } else {
        const response = {
          status: statusCode.HTTP_UNAUTHORIZED,
          errNo: errorNumbers.token_not_found,
          errMsg: i18n.__("user.unauthorize.NO_TOKEN"),
        };

        return customResponse.error(response, res);
      }
    }
  };

  /**
   * Check if user is authenticated
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param Request req
   * @param Response res
   * @param NextFunction next
   * @returns any of next function or unauthorize message
   */
  public auth = (req: Request) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || "somethingsecret",
        (err, decode) => {
          if (err) {
            return null;
          } else {
            req.user = decode;
          }
        }
      );
    } else {
      return null;
    }
    return req.user;
  };

  /**
   * Check if user is administrator
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param Request req
   * @param Response res
   * @param NextFunction next
   * @returns any of next function or unauthorize message
   */
  public isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      const response = {
        status: statusCode.HTTP_UNAUTHORIZED,
        errNo: errorNumbers.validator,
        errMsg: i18n.__("user.unauthorize.INVALID_ADMIN_TOKEN"),
      };

      return customResponse.error(response, res);
    }
  };

  /**
   * Check if user is seller
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param Request req
   * @param Response res
   * @param NextFunction next
   * @returns any of next function or unauthorize message
   */
  public isSeller = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isSeller) {
      next();
    } else {
      const response = {
        status: statusCode.HTTP_UNAUTHORIZED,
        errNo: errorNumbers.validator,
        errMsg: i18n.__("user.unauthorize.INVALID_SELLER_TOKEN"),
      };

      return customResponse.error(response, res);
    }
  };

  /**
   * Check if user is seller or administrator
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param Request req
   * @param Response res
   * @param NextFunction next
   * @returns any of next function or unauthorize message
   */
  public isSellerOrAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: "Invalid Admin/Seller Token" });
      const response = {
        status: statusCode.HTTP_UNAUTHORIZED,
        errNo: errorNumbers.validator,
        errMsg: i18n.__("user.unauthorize.INVALID_ADMIN_OR_SELLER"),
      };

      return customResponse.error(response, res);
    }
  };

  /**
   * Set JWT config
   *
   * @returns void
   */
  // public setJWTConfig() {
  //   this.app?.use(this.isAuth); // General middleware
  // }
}

const authorization = new Authorization();
export default authorization;