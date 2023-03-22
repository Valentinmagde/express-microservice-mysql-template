import { Application } from 'express';
import { expressjwt, GetVerificationKey, Params } from 'express-jwt';
import publicRoutes from './jwt-route';

class JWT {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  setJWTConfig() {
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
