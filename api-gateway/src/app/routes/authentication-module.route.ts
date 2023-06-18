import express, { Router } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import routesGrouping from "../utils/routes-grouping.util";
import
  authenticationRoutes
from "../../authentication/modules/authentication.route";
import
  swaggerauthenticationOptions
from "../../resources/swagger/authentication-docs/authentication-docs.json";

dotenv.config();

const specs = swaggerJSDoc(swaggerauthenticationOptions);

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-22
 *
 * Class AutheModuleRoutes
 */
class AuthenticationModuleRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  // --------------------------------------------------------------------------
  // Public functions
  // --------------------------------------------------------------------------

  /**
   * Creating all authentication routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-22
   *
   * @returns {Router} of authentication
   */
  public authenticationRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        // Includes authentication routes
        router.use(authenticationRoutes.authenticationRoutes());

        // Authentication swagger documentation
        router.use(
          "/auth",
          routesGrouping.group((router) => {
            router.use(
              "/docs",
              swaggerUi.serveFiles(undefined, specs),
              swaggerUi.setup(undefined, specs)
            );

            router.get("/docs.json", (req, res) => {
              res.setHeader("Content-Type", "application/json");
              res.send(specs);
            });
          })
        );
      })
    );
  }

  /**
   * Creating all authentication routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-22
   *
   * @returns {Router} of authentication swagger documentation
   */
  public authenticationDocsRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        // Authentication swagger documentation
        router.use(
          "/auth",
          routesGrouping.group((router) => {
            router.use(
              "/docs",
              swaggerUi.serveFiles(undefined, specs),
              swaggerUi.setup(undefined, specs)
            );

            router.get("/docs.json", (req, res) => {
              res.setHeader("Content-Type", "application/json");
              res.send(specs);
            });
          })
        );
      })
    );
  }
}

const authenticationModuleRoutes = new AuthenticationModuleRoutes();
export default authenticationModuleRoutes;