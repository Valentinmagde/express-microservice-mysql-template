import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import errorNumbers from '../utils/error.numbers';
import statusCode from '../utils/status.code';
import customResponse from '../utils/custom.response';
import dotenv from "dotenv";
import redisDB from '../utils/redis.db';
import i18n from '../i18n';

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 * 
 * Class Authentication
 */
class Authentication {

  /**
   * Generate token
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   * 
   * @param any user 
   * @returns string jwt
   */
  public generateToken = (user: any) => {
    const privateKey = fs.readFileSync(path.join(__dirname,'private.key'));

    //creating a access token
    const accessToken =  jwt.sign(
      {
        userId: user._id,
        username: user.username,
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
        gender: user.gender,
        roles: user.roles,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // One hour for expiration time
      },
      privateKey,
      {algorithm: 'RS256'}
    );

    // Creating refresh token not that expiry of refresh 
    //token is greater than the access token
    const refreshToken =  jwt.sign(
      {
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // One day for expiration time
      },
      privateKey,
      {algorithm: 'RS256'}
    );

    return ({ accessToken, refreshToken });
  }

  /**
   * Generate an internal token used by the gateway to communicate with 
   * microservices that does not require user authentication 
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   * 
   * @param any user 
   * @returns string jwt
   */
  public generateGatewayToken = (req: Request) => {
    const privateKey = fs.readFileSync(path.join(__dirname,'private.key'));

    return jwt.sign(
      {
        // isAdmin: req.user.isAdmin,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // One hour for expiration time
      },
      privateKey,
      {algorithm: 'RS256'}
    );
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
    const publicKey = fs.readFileSync(path.join(__dirname,'public.key'));
    const authorization = req.headers.authorization;
    const token = authorization && authorization.slice(7, authorization.length); // Bearer XXXXXX

    // token provided?
    if(token){
      redisDB.onConnect()
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
            publicKey,
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
        const publicKey = fs.readFileSync(path.join(__dirname,'public.key'));

        // token provided?
        if(refreshToken){
          redisDB.onConnect()
          .then(async(redisClient) => {
            const inDenyList = await redisClient.get(`bl_${refreshToken}`);
            
            // token in deny list?
            if (inDenyList) {
                resolve('INVALID_TOKEN');
            }
            else{
              // token valid?
              jwt.verify(
                refreshToken,
                publicKey,
                (err, decode) => {
                  if (err) {
                    reject(err);
                  } else {
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
          resolve('NO_TOKEN');
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
    const publicKey = fs.readFileSync(path.join(__dirname,'public.key'));
    const authorization = req.headers.authorization;

    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        publicKey,
        (err, decode) => {
          if (err) {
            return null;
          } else {
            // console.log(decode);
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

const authentication = new Authentication();
export default authentication;