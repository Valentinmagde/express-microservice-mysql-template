import expressJwt from 'express-jwt';
import publicRoutes from './jwt-route.js';

class JWT {
  constructor(app) {
    this.app = app;
  }

  setJWTConfig() {
    this.app.use(
      expressJwt({
        secret: process.env.JWT_SECRET,
      }).unless({
        path: publicRoutes,
      }),
    );
  }
}


export default JWT;
