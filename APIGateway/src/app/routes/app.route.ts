import dotenv from "dotenv";
import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import
  swaggerMicroservicesOptions
from "../../resources/swagger/microservices-docs/microservices-docs.json";
import statusCode from "../utils/status-code.util";
import errorNumbers from "../utils/error-numbers.util";
import i18n from "../../core/i18n";
import customResponse from "../utils/custom-response.util";
import routesGrouping from "../utils/routes-grouping.util";
import authenticationModuleRoutes from "./authentication-module.route";
import userServiceRoutes from "./user-service.route";
import setLocale from "../middlewares/set-locale.middleware";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 *
 * Class AppRoutes
 */
class AppRoutes {
  private app: Application;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param {Application} app express application
   */
  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Creating app Routes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-26-03
   *
   * @returns {void}
   */
  public appRoutes(): void {
    this.app.use(
      "/v1",
      routesGrouping.group((router) => {
        router.use(
          "/:lang",
          setLocale.setLocale,
          routesGrouping.group((router) => {
            /******************************************************************
            * Includes all microservices routes here
            ******************************************************************/

            // user service routes
            router.use(userServiceRoutes.userServiceRoutes());

            // authentication module routes
            router.use(authenticationModuleRoutes.authenticationRoutes());
          })
        );
      })
    );

    // Swagger documentation routes
    this.app.use(
      "/v1",
      routesGrouping.group((router) => {
        // All microservice swagger documentation route
        router.use(
          "/docs",
          swaggerUi.serveFiles(undefined, swaggerMicroservicesOptions),
          swaggerUi.setup(undefined, swaggerMicroservicesOptions)
        );

        // Authentication swagger documentation
        router.use(authenticationModuleRoutes.authenticationDocsRoutes());
      })
    );

    // error handler for not found router
    this.app.get("*", (req, res) => {
      const response = {
        status: statusCode.httpNotFound,
        errNo: errorNumbers.resourceNotFound,
        errMsg: i18n.__("others.routeNotFound"),
      };

      return customResponse.error(response, res);
    });
  }

  /**
   * Load routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @returns {void}
   */
  public routesConfig(): void {
    this.appRoutes();
  }
}

export default AppRoutes;