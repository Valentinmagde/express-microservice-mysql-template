import { Application } from 'express';
import { expressjwt } from 'express-jwt';
import publicRoutes from './jwt.route';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 * 
 * Class JWT
 */
class JWT {
  private app: Application;

  /**
   * Create a new JWT instance.
   *
   * @return void
   */
  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Set JWT config
   * 
   * @returns void
   */
  public setJWTConfig() {
    this.app.use(
      expressjwt({
        secret: process.env.JWT_SECRET as any,
        algorithms: ['HS256'] 
      }).unless({
        path: publicRoutes,
      }),
    );
  }
}

export default JWT;
