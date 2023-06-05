import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import errorNumbers from "../utils/error-numbers.util";
import statusCode from "../utils/status-code.util";
import customResponse from "../utils/custom-response.util";
import i18n from "../../core/i18n";
import cacheConfig from "../../core/cache";
import config from "../../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 *
 * Class Authentication
 */
class Authorization {
  /**
   * Check if user is authenticated
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   * @param {NextFunction} next the callback
   * @returns {void}
   */
  public isAuth = (req: Request, res: Response, next: NextFunction): void => {
    const publicKey = config.nodeServerPublicKey as string;
    const authorization = req.headers.authorization;

    // Bearer XXXXXX
    const token = authorization && authorization.slice(7, authorization.length);

    // token provided?
    if (token) {
      cacheConfig
        .connectToRedis()
        .then(async (redisClient) => {
          const inDenyList = await redisClient.get(`bl_${token}`);

          // token in deny list?
          if (inDenyList) {
            const response = {
              status: statusCode.httpUnauthorized,
              errNo: errorNumbers.invalidToken,
              errMsg: i18n.__("unauthorize.invalidToken"),
            };

            return customResponse.error(response, res);
          }
          else {
            // token valid?
            jwt.verify(token, publicKey, (err, decode) => {
              if (err) {
                const response = {
                  status: statusCode.httpUnauthorized,
                  errNo: errorNumbers.invalidToken,
                  errMsg: i18n.__("unauthorize.invalidToken"),
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
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpUnauthorized,
        errNo: errorNumbers.tokenNotFound,
        errMsg: i18n.__("unauthorize.noToken"),
      };

      return customResponse.error(response, res);
    }
  };

  /**
   * Verify refresh token
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   *
   * @param {string} refreshToken the refresh token
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public verifyRefreshToken = (refreshToken: string):Promise<unknown> => {
    return new Promise((resolve, reject) => {
      try {
        const publicKey = config.nodeServerPublicKey as string;

        // token provided?
        if (refreshToken) {
          cacheConfig
            .connectToRedis()
            .then(async (redisClient) => {
              const inDenyList = await redisClient.get(`bl_${refreshToken}`);

              // token in deny list?
              if (inDenyList) {
                resolve("INVALID_REFRESH_TOKEN");
              } else {
                // token valid?
                jwt.verify(refreshToken, publicKey, (err, decode) => {
                  if (err) {
                    reject(err);
                  } else {
                    const tokenPayload = JSON.parse(JSON.stringify(decode));

                    if (tokenPayload.email) resolve("INVALID_REFRESH_TOKEN");
                    else resolve(decode);
                  }
                });
              }
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve("NO_REFRESH_TOKEN");
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}

const authorization = new Authorization();
export default authorization;