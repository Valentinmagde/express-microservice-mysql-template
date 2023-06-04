import jwt from 'jsonwebtoken';
import config from '../../config';
import
  AuthenticationType,
  { GenerateTokenType }
from '../modules/authentication.type';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 *
 * Class JwtUtilities
 */
class JwtUtilities {

  /**
   * Generate token
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param {AuthenticationType} user The user details.
   * @returns {GenerateTokenType} the json web token
   */
  public generateToken = (user: AuthenticationType): GenerateTokenType => {
    const privateKey = config.nodeServerPrivateKey as string;
    const accessTokenLife = config.accessTokenLife || 0;
    const refreshTokenLife = config.refreshTokenLife || 0;

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
        // One hour for expiration time
        exp: Math.floor(Date.now() / 1000) + accessTokenLife
      },
      privateKey,
      {algorithm: 'RS256'}
    );

    // Creating refresh token not that expiry of refresh
    //token is greater than the access token
    const refreshToken =  jwt.sign(
      {
        userId: user._id,
        // One day for expiration time
        exp: Math.floor(Date.now() / 1000) + refreshTokenLife
      },
      privateKey,
      {algorithm: 'RS256'}
    );

    return ({ accessToken, refreshToken });
  }

  /**
   * Generate an internal token used by the gateway to
   * communicate with microservices that does not require
   * user authentication
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @returns {string} jwt
   */
  public generateInternToken = (): string => {
    const privateKey = config.nodeServerPrivateKey as string;
    const accessTokenLife = config.accessTokenLife || 0;

    return jwt.sign(
      {
        // One hour for expiration time
        exp: Math.floor(Date.now() / 1000) + accessTokenLife
      },
      privateKey,
      {algorithm: 'RS256'}
    );
  }
}

const jwtUtilities = new JwtUtilities();
export default jwtUtilities;