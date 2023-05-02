import { Application, Request, Response } from 'express';
import userRoutes from '../modules/user/user.routes';
import swaggerOptions from '../configs/swagger/user-docs/user-docs.json';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import roleRoutes from '../modules/role/role.routes';
import routesGrouping from '../utils/routes.grouping.utils';
import genderRoutes from '../modules/gender/gender.routes';
import statusCode from '../utils/status.code.utils';
import errorNumbers from '../utils/error.numbers.utils';
import customResponse from '../utils/custom.response.utils';
import i18n from '../configs/translations';

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
    this.app.use('/v1', routesGrouping.group((router) => {
      // Includes user routes
      router.use(userRoutes.userRoutes());
      
      // Includes role routes
      router.use(roleRoutes.roleRoutes());

      // Includes gender routes
      router.use(genderRoutes.genderRoutes());
      
      // Swagger documentation
      router.use(
        "/users/docs",
        swaggerUi.serve,
        swaggerUi.setup(this.specs)
      );
      router.get("/users/docs.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(this.specs);
      });
    }));

    // error handler for not found router
    this.app.get('*', (req: Request, res: Response) => {
      const response = {
        status: statusCode.HTTP_NOT_FOUND,
        errNo: errorNumbers.resource_not_found,
        errMsg: i18n.en.others.ROUTE_NOT_FOUND,
      }
  
      return customResponse.error(response, res);
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