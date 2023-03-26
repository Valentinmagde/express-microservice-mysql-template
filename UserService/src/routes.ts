import userController from './controllers/v1/user.controller';
import { Application } from 'express';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 * 
 * Class Routes
 */
class Routes {
  private app: Application;

  /**
   * Create a new Routes instance.
   *
   * @return void
   */
  constructor(app: Application) {
    this.app = app;
  }

  /** 
   * Creating app Routes starts 
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
  */
  public appRoutes() {
    // Users routes
    this.app.post('/register', userController.registerRouteHandler);
    this.app.post('/login', userController.loginRouteHandler);
    this.app.get('/user/:userId', userController.getUserDetailsHandler);
    this.app.get('*', userController.routeNotFoundHandler);
    
    // error handler for not found router
    this.app.get('*', (req, res, next) => {
      res.status(404).send('Route not found');
    });
  }

  /**
   * Load routes
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   * 
   * @returns void
   */
  public routesConfig() {
    this.appRoutes();
  }
}

export default Routes;