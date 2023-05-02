import { Request } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

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
    const privateKeyPath = require.resolve("../configs/keys/private.key");
    const privateKey = fs.readFileSync(privateKeyPath, { encoding: "utf8", flag: "r" });

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
    const privateKeyPath = require.resolve("../configs/keys/private.key");
    const privateKey = fs.readFileSync(privateKeyPath, { encoding: "utf8", flag: "r" });

    return jwt.sign(
      {
        // isAdmin: req.user.isAdmin,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // One hour for expiration time
      },
      privateKey,
      {algorithm: 'RS256'}
    );
  }
}

const authentication = new Authentication();
export default authentication;