import { Application, Request, Response } from "express";
import userRoutes from "../modules/user/user.routes";
import swaggerOptions from "../../resources/swagger/user-docs/user-docs.json";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import roleRoutes from "../modules/role/role.routes";
import routesGrouping from "../utils/routes-grouping.util";
import genderRoutes from "../modules/gender/gender.routes";
import statusCode from "../utils/status-code.util";
import errorNumbers from "../utils/error-numbers.util";
import customResponse from "../utils/custom-response.util";
import i18n from "../../core/i18n";
import setLocale from "../middlewares/set-locale.middleware";
import authorization from "../middlewares/authorization.middleware";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 *
 * Class Routes
 */
class Routes {
  private app: Application;
  private specs: object;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-23
   *
   * @param {Application} app express application
   */
  constructor(app: Application) {
    this.app = app;
    this.specs = swaggerJSDoc(swaggerOptions);
  }

  /**
   * Creating app Routes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-23
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
          authorization.isAuth,
          routesGrouping.group((router) => {
            // Includes user routes
            router.use(userRoutes.userRoutes());

            // Includes role routes
            router.use(roleRoutes.roleRoutes());

            // Includes gender routes
            router.use(genderRoutes.genderRoutes());
          })
        );

        // Swagger documentation
        router.use("/users/docs", swaggerUi.serve, swaggerUi.setup(this.specs));
        router.get("/users/docs.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(this.specs);
        });
      })
    );

    // error handler for not found router
    this.app.get("*", (req: Request, res: Response) => {
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
   * @since 2023-03-23
   *
   * @returns {void}
   */
  public routesConfig(): void {
    this.appRoutes();
  }
}

export default Routes;