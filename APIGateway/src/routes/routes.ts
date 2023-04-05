import httpProxy from 'express-http-proxy';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import { Application, NextFunction, Request, Response } from 'express';
import userRoutes from './v1/user.routes';
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../../swagger.json";

dotenv.config();

const productServiceProxy = httpProxy(process.env.PRODUCT_SERVICE_URL as string);
const orderServiceProxy = httpProxy(process.env.ORDER_SERVICE_URL as string);

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
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
   * @since 2023-26-03
   * 
   * @returns void
  */
  public appRoutes() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // Swagger documentation
    this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(undefined, swaggerOptions));
    // Includes user routes
    this.app.use('/api/v1', userRoutes.userRoutes());

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
      res.status(404).send('Route not found');
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

export default Routes;
