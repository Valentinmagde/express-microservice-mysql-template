import httpProxy from 'express-http-proxy';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { Application } from 'express';
import userServiceRoutes from './user.service.routes';
import swaggerUi from "swagger-ui-express";
import swaggerMicroservicesOptions from "../configs/swagger/microservices-docs/microservices-docs.json";
import statusCode from '../utils/status.code.utils';
import errorNumbers from '../utils/error.numbers.utils';
import i18n from '../configs/translations';
import customResponse from '../utils/custom.response.utils';
import routesGrouping from '../utils/routes.grouping.utils';
import authenticationRoutes from './authentication.routes';
import swaggerauthenticationOptions from '../configs/swagger/authentication-docs/authentication-docs.json';
import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

const productServiceProxy = httpProxy(process.env.PRODUCT_SERVICE_URL as string);
const orderServiceProxy = httpProxy(process.env.ORDER_SERVICE_URL as string);
const specs = swaggerJSDoc(swaggerauthenticationOptions);

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
   * @return void
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
   * @returns void
  */
  public appRoutes() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use('/v1', routesGrouping.group((router) => {
      // Swagger documentation route
      router.use(
        '/docs', 
        swaggerUi.serveFiles(undefined, swaggerMicroservicesOptions), 
        swaggerUi.setup(undefined, swaggerMicroservicesOptions)
      );
      
      // Includes user routes
      router.use(userServiceRoutes.userServiceRoutes());
      
      // Includes authentication routes
      router.use(authenticationRoutes.authenticationRoutes());

      // Swagger documentation
      router.use(
        "/auth/docs", 
        swaggerUi.serveFiles(undefined, specs), 
        swaggerUi.setup(undefined, specs)
      );
      
      router.get("/auth/docs.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(specs);
      });
    }));

    this.app.get('/product/:productId', (req, res, next) => {
      productServiceProxy(req, res, next);
    });

    this.app.get('/product', (req, res, next) => {
      productServiceProxy(req, res, next);
    });


    this.app.post('/order', (req, res, next) => {
      orderServiceProxy(req, res, next);
    });

    this.app.get('/order', (req, res, next) => {
      orderServiceProxy(req, res, next);
    });

    // error handler for not found router
    this.app.get('*', (req, res, next) => {
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
   * @since 2023-26-03
   * 
   * @returns void
   */
  public routesConfig() {
    this.appRoutes();
  }
}

export default AppRoutes;