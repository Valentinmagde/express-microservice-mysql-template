import { Application, NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';
import i18n from '../i18n';
import customResponse from '../utils/custom.response';
import errorNumbers from '../utils/error.numbers';
import statusCode from '../utils/status.code';

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

    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // One hour for expiration time
      },
      privateKey,
      {algorithm: 'RS256'}
    );
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
  public isAuth = (req: Request, res: Response, next: NextFunction) => {
    // Except documentation route for authentication
    if (req.path.indexOf('/v1/users/docs') > -1) return next();
    else{
      const publicKey = fs.readFileSync(path.join(__dirname,'public.key'));
      const authorization = req.headers.authorization;

      if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX

        jwt.verify(
          token,
          publicKey,
          (err, decode) => {
            if (err) {
              const response = {
                status: statusCode.HTTP_UNAUTHORIZED,
                errNo: errorNumbers.invalid_token,
                errMsg: i18n.en.user.unauthorize.IVALID_TOKEN,
              }
        
              return customResponse.error(response, res);
            } else {
              req.user = decode;
              next();
            }
          }
        );
      } else {
        const response = {
          status: statusCode.HTTP_UNAUTHORIZED,
          errNo: errorNumbers.token_not_found,
          errMsg: i18n.en.user.unauthorize.NO_TOKEN,
        }

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
  public auth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret',
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
        errMsg: i18n.en.user.unauthorize.INVALID_ADMIN_TOKEN,
      }

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
        errMsg: i18n.en.user.unauthorize.INVALID_SELLER_TOKEN,
      }

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
  public isSellerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin/Seller Token' });
      const response = {
        status: statusCode.HTTP_UNAUTHORIZED,
        errNo: errorNumbers.validator,
        errMsg: i18n.en.user.unauthorize.INVALID_ADMIN_OR_SELLER
      }

      return customResponse.error(response, res);
    }
  }

  /**
   * Set JWT config
   * 
   * @returns void
   */
  public setJWTConfig() {
    this.app?.use(this.isAuth); // General middleware
  }
}

export default Authorization;
