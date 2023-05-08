import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import errorNumbers from '../utils/error-numbers.util';
import statusCode from '../utils/status-code.util';
import customResponse from '../utils/custom-response.util';
import i18n from '../../assets/translations';
import cacheConfig from '../utils/cache-config.util';
import config from '../../configs/index.config';

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
   * @param Request req 
   * @param Response res 
   * @param NextFunction next 
   * @returns any of next function or unauthorize message
   */
  public isAuth = (req: Request, res: Response, next: NextFunction) => {
    const public_key = config.node_server_public_key as string;
    const authorization = req.headers.authorization;
    const token = authorization && authorization.slice(7, authorization.length); // Bearer XXXXXX

    // token provided?
    if(token){
      cacheConfig.connectToRedis()
      .then(async(redisClient) => {
        const inDenyList = await redisClient.get(`bl_${token}`);
        
        // token in deny list?
        if (inDenyList) {
            const response = {
              status: statusCode.HTTP_UNAUTHORIZED,
              errNo: errorNumbers.invalid_token,
              errMsg: i18n.en.unauthorize.INVALID_TOKEN,
            }
      
            return customResponse.error(response, res);
        }
        else{
          // token valid?
          jwt.verify(
            token,
            public_key,
            (err, decode) => {
              if (err) {
                const response = {
                  status: statusCode.HTTP_UNAUTHORIZED,
                  errNo: errorNumbers.invalid_token,
                  errMsg: i18n.en.unauthorize.INVALID_TOKEN,
                }

                return customResponse.error(response, res);
              } else {
                req.user = decode;
                next();
              }
            }
          );
        }
      })
      .catch(error => {
          const response = {
              status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
              errNo: errorNumbers.generic_error,
              errMsg: error?.message || error,
          }

          return customResponse.error(response, res);
      });
    }
    else {
      const response = {
        status: statusCode.HTTP_UNAUTHORIZED,
        errNo: errorNumbers.token_not_found,
        errMsg: i18n.en.unauthorize.NO_TOKEN,
      }

      return customResponse.error(response, res);
    }
  };

  /**
   * Verify refresh token
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   * 
   * @param Request req 
   * @param Response res 
   * @param NextFunction next 
   * @returns any of next function or unauthorize message
   */
  public verifyRefreshToken = (refreshToken: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const public_key = config.node_server_public_key as string;

        // token provided?
        if(refreshToken){
          cacheConfig.connectToRedis()
          .then(async(redisClient) => {
            const inDenyList = await redisClient.get(`bl_${refreshToken}`);
            
            // token in deny list?
            if (inDenyList) {
              resolve('INVALID_REFRESH_TOKEN');
            }
            else{
              // token valid?
              jwt.verify(
                refreshToken,
                public_key,
                (err, decode) => {
                  if (err) {
                    reject(err);
                  } else {
                    const tokenPayload = JSON.parse(JSON.stringify(decode));
                    
                    if(tokenPayload.email)
                      resolve('INVALID_REFRESH_TOKEN');
                    else
                      resolve(decode);
                  }
                }
              );
            }
          })
          .catch(error => {
              reject(error);
          });
        }
        else {
          resolve('NO_REFRESH_TOKEN');
        }
      }
      catch(error){
        reject(error);
      }
    });
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
  public auth = (req: Request, res: Response, next: NextFunction) => {
    const public_key = config.node_server_public_key as string;
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        public_key,
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
      res.status(401).send({ message: 'Invalid Admin Token' });
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
      res.status(401).send({ message: 'Invalid Seller Token' });
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
  public isSellerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin/Seller Token' });
    }
  }
}

const authorization = new Authorization();
export default authorization;