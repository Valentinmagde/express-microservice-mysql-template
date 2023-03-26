import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 * 
 * Class Auth
 */
class Auth {

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
  }

  /**
   * Generate an internal token used by the gateway to communicate with microservices that does not require user authentication 
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

    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        publicKey,
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
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

const auth = new Auth();
export default auth;