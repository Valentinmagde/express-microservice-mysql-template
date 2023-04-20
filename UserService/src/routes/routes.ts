import userController from '../controllers/v1/user.controller';
import { Application } from 'express';
import userRoutes from './v1/user.routes';
import swaggerOptions from '../swagger/swagger.json';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import roleRoutes from './v1/role.routes';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 * 
 * Class Routes
 */
class Routes {
  private app: Application;
  private specs: any;

  /**
   * Create a new Routes instance.
   *
   * @return void
   */
  constructor(app: Application) {
    this.app = app;
    this.specs = swaggerJSDoc(swaggerOptions);
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
    // Includes user routes
    this.app.use('/v1', userRoutes.userRoutes());
    
    // Includes role routes
    this.app.use('/v1', roleRoutes.roleRoutes());
    
    // Swagger documentation
    this.app.use(
      "/v1/users/docs",
      swaggerUi.serve,
      swaggerUi.setup(this.specs)
    );
    this.app.get("/v1/users/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(this.specs);
    });

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