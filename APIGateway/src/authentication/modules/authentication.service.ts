import { Request } from "express";
import authorization from "../middlewares/authorization.middleware";
import cacheManager from "../../core/cache";
import jwtUtilities from "../utils/jwt-utilities.util";
import crypto from 'crypto';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 *
 * Class AuthenticationService
 */
class AuthenticationService {

  /**
   * This function will generate a public and private keypair and save to
   * current directory
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-04
   *
   * @returns {Promise<any>} the eventual completion or failure
   */
  public async generateKeyPair() : Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // Generates an object where the keys are stored in properties
        // `privateKey` and `publicKey`
        const keyPair = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096, // bits - standard for RSA keys
          publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
          },
          privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
          }
        });

        resolve(keyPair);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Logout
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   *
   * @param {Request} req http request
   *
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public async logout(req: Request) : Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        const authorization = req.headers.authorization;

        // Bearer XXXXXX
        const token =
          authorization && authorization.slice(7, authorization.length);

        if (token) {
          this.setTokenToRedis(token)
            .then((result) => resolve(result))
            .catch((error) => reject(error));
        } else {
          resolve("NO_TOKEN");
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Refresh token
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   *
   * @param {Request} req http request
   *
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public async refresh(req: Request): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        const refreshToken = req.body.refreshtoken;

        authorization
          .verifyRefreshToken(refreshToken)
          .then((result) => {
            if (result === "NO_REFRESH_TOKEN") resolve("NO_REFRESH_TOKEN");
            else if (result === "INVALID_REFRESH_TOKEN")
              resolve("INVALID_REFRESH_TOKEN");
            else {
              const authorization = req.headers.authorization;

              // Bearer XXXXXX
              const accessToken =
                authorization && authorization.slice(7, authorization.length);

              if (accessToken) {
                const accessTokenPayload = this.parseJwt(accessToken);
                const refreshTokenPayload = this.parseJwt(refreshToken);

                if (accessTokenPayload.userId == refreshTokenPayload.userId) {
                  accessTokenPayload._id = accessTokenPayload.userId;
                  const { accessToken, refreshToken } =
                    jwtUtilities.generateToken(accessTokenPayload);

                  if (accessToken == null || refreshToken == null) {
                    resolve("NO_TOKEN");
                  } else {
                    this.setTokenToRedis(accessToken);
                    this.setTokenToRedis(refreshToken);

                    resolve({ accessToken, refreshToken });
                  }
                }
              } else {
                resolve("NO_TOKEN");
              }
            }
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  // --------------------------------------------------------------------------
  // Private functions
  // --------------------------------------------------------------------------

  /**
   * Decode token
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-02
   *
   * @param {string} token the user token
   * @returns {any} the token payload
   */
  private parseJwt = (token: string): any => {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  };

  /**
   * Decode token
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-02
   *
   * @param {string} token the user token
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  private setTokenToRedis = (token: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      if (token) {
        // Connect to redis database
        cacheManager
          .connectToRedis()
          .then(async (redisClient) => {
            // JWT payload
            const jwtPayload = this.parseJwt(token);

            const tokenKey = `bl_${token}`;
            await redisClient.set(tokenKey, token);
            await redisClient.expireAt(tokenKey, jwtPayload.exp);

            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };
}

const authenticationService = new AuthenticationService();
export default authenticationService;