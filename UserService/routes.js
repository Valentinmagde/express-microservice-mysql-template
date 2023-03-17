import userController from './controllers/v1/user-controller.js';
// import routeHandler from './handlers/route-handler.js';

class Routes {
  constructor(app) {
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
