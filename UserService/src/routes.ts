import userController from 'controllers/v1/user-controller';
import { Application } from 'express';

class Routes {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {

    // Users routes
    this.app.post('/register', userController.registerRouteHandler);
    this.app.post('/login', userController.loginRouteHandler);
    this.app.get('/user/:userId', userController.getUserDetailsHandler);
    this.app.get('*', userController.routeNotFoundHandler);
  }

  routesConfig() {
    this.appRoutes();
  }
}

export default Routes;
