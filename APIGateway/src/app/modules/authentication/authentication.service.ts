import { Request } from 'express';
import authentication from '../../middlewares/authentication.middleware';
import authorization from '../../middlewares/authorization.middleware';
import cacheConfig from '../../utils/cache-config.util';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 * 
 * Class AuthenticationService
 */
class AuthenticationService {
  
  /**
   * Create a new AuthenticationService instance.
   *
   * @return void
   */
  constructor() {}

  /**
   * Logout
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   * 
   * @param any data 
   * @returns any
   */
  public async logout(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.slice(7, authorization.length); // Bearer XXXXXX
            
        if(token) {
          this.setTokenToRedis(token)
          .then((result: any) => resolve(result))
          .catch(error => reject(error));
        }
        else{
          resolve('NO_TOKEN');
        }
      } catch (error) { reject(error); }
    });
  }

  /**
   * Refresh token
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   * 
   * @param any data 
   * @returns any
   */
  public async refresh(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const refresh_token = req.body.refreshtoken;

        authorization.verifyRefreshToken(refresh_token)
        .then(result => {
          if(result === 'NO_REFRESH_TOKEN') resolve('NO_REFRESH_TOKEN');
          else if(result === 'INVALID_REFRESH_TOKEN') resolve('INVALID_REFRESH_TOKEN');
          else{
            const authorization = req.headers.authorization;
            const access_token = authorization && authorization.slice(7, authorization.length); // Bearer XXXXXX
            
            if(access_token) {
              const accessTokenPayload = this.parseJwt(access_token);
              const refreshTokenPayload = this.parseJwt(refresh_token);

              if(accessTokenPayload.userId == refreshTokenPayload.userId) {
                accessTokenPayload._id = accessTokenPayload.userId;
                const { accessToken, refreshToken } = authentication.generateToken(accessTokenPayload);

                if(accessToken == null || refreshToken == null) {
                  resolve('NO_TOKEN');
                }
                else {
                  this.setTokenToRedis(access_token);
                  this.setTokenToRedis(refresh_token);

                  resolve({ accessToken, refreshToken });
                }
              }
            }
            else{
              resolve('NO_TOKEN');
            }
          }
        })
        .catch(error => {
          reject(error);
        });
      } catch (error) {
        reject(error)
      }
    })
  }

  // ---------------------------------------------------------------------------------------
  // Private functions
  // ---------------------------------------------------------------------------------------

  private parseJwt = (token: any) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  private setTokenToRedis = (token: any) => {
    return new Promise(async (resolve, reject) => {
      if(token) {
        // Connect to redis database
        cacheConfig.connectToRedis()
        .then(async(redisClient) => {
            // JWT payload
            const jwtPayload = this.parseJwt(token);

            const token_key = `bl_${token}`;
            await redisClient.set(token_key, token);
            await redisClient.expireAt(token_key, jwtPayload.exp);

            resolve(true);
        })
        .catch(error => {
          reject(error);
        });
      }
    });
  }
}

const authenticationService = new AuthenticationService()
export default authenticationService;