import userController from '../controllers/v1/user.controller';
import { Application } from 'express';
import routesGrouping from '../utils/routes.grouping';
import SwaggerDocs from '../v1/swagger';

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
    // All users routes
    this.app.use('/api/v1', routesGrouping.group((router) => {
      
      router.use('/users', routesGrouping.group((router) => {
          router.post('/', userController.registerRouteHandler);
          router.post('/login', userController.loginRouteHandler);
      }));

      router.use('/user', routesGrouping.group((router) => {
          router.get('/:userId', userController.getUserDetailsHandler);
      }));
    }));
    
    // Route-Handler to visit our docs
    this.app.use(new SwaggerDocs(this.app, 4000).swaggerDocs);
    
    // error handler for not found router
    this.app.get('*', userController.routeNotFoundHandler);
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