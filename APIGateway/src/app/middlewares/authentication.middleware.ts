import jwt from 'jsonwebtoken';
import config from '../../config';
import AuthenticationType from '../modules/authentication/authentication.type';

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
  public generateToken = (user: AuthenticationType) => {
    const private_key = config.node_server_private_key as string;
    const access_token_life = config.access_token_life;
    const refresh_token_life = config.refresh_token_life;

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
        exp: access_token_life, // One hour for expiration time
      },
      private_key,
      {algorithm: 'RS256'}
    );

    // Creating refresh token not that expiry of refresh 
    //token is greater than the access token
    const refreshToken =  jwt.sign(
      {
        userId: user._id,
        exp: refresh_token_life, // One day for expiration time
      },
      private_key,
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
  public generateGatewayToken = () => {
    const private_key = config.node_server_private_key as string;
    const access_token_life = config.access_token_life;

    return jwt.sign(
      {
        // isAdmin: req.user.isAdmin,
        exp: access_token_life, // One hour for expiration time
      },
      private_key,
      {algorithm: 'RS256'}
    );
  }
}

const authentication = new Authentication();
export default authentication;