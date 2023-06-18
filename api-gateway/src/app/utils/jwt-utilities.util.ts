import jwt from 'jsonwebtoken';
import config from '../../config';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-03-26
 *
 * Class JwtUtilities
 */
class JwtUtilities {

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