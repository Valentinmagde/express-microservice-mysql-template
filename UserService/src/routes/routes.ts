import userController from '../controllers/v1/user.controller';
import { Application, NextFunction, Request, Response } from 'express';
import routesGrouping from '../utils/routes.grouping';
import swaggerOptions from '../swagger/swagger.json';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import customResponse from '../utils/custom.response';
import errorNumbers from '../utils/error.numbers';
import statusCode from '../utils/status.code';

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
    // All users routes
    this.app.use('/v1', routesGrouping.group((router) => {
      router.use('/users', routesGrouping.group((router) => {
        /**
         * @swagger
         * /v1/users:
         *   post:
         *     tags:
         *     - User
         *     operationId: register
         *     summary: Create user.
         *     description: Add user into the system.
         *     requestBody:
         *       required: true
         *       content:
         *         application/x-www-form-urlencoded:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: The user's name.
         *                 example: John
         *               lastname:
         *                 type: string
         *                 description: The user's last name.
         *                 example: Doe
         *               email:
         *                 type: string
         *                 description: The user's email.
         *                 example: admin@example.com
         *                 format: email
         *               gender:
         *                 in: query
         *                 default: 1
         *                 enum:
         *                 - 1
         *                 - 2
         *                 - 3
         *                 description: Gender values that need to be considered for filter
         *                 required: true
         *                 type: string
         *               password:
         *                 type: string
         *                 format: password
         *                 description: The user's password.
         *                 example: admin
         *             required:
         *               - username
         *               - lastname
         *               - email
         *               - gender
         *               - password
         * 
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *                 description: The user's name.
         *                 example: John
         *               lastname:
         *                 type: string
         *                 description: The user's last name.
         *                 example: Doe
         *               email:
         *                 type: string
         *                 description: The user's email.
         *                 example: admin@example.com
         *                 format: email
         *               gender:
         *                 in: query
         *                 default: 1
         *                 enum:
         *                 - 1
         *                 - 2
         *                 - 3
         *                 description: Gender values that need to be considered for filter
         *                 required: true
         *                 type: string
         *               password:
         *                 type: string
         *                 format: password
         *                 description: The user's password.
         *                 example: admin
         *             required:
         *               - username
         *               - lastname
         *               - email
         *               - gender
         *               - password
         * 
         *     responses:
         *       201:
         *         description: User successfully created.
         *         content:
         *           application/json:
         *             schema:
         *                type: object
         *                properties:
         *                  status:
         *                    type: string
         *                    example: Ok
         *                  data:
         *                    $ref: '#/components/schemas/User'
         *               
         *       400:
         *         description: Bad Request.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/400'
         *       
         *       412:
         *         description: Precondition Failed.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/412'
         *       500:
         *         description: Internal Server Error.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/500'
         * 
         */
        router.post('/', userController.register);

        /**
         * @swagger
         * /v1/users/login:
         *   post:
         *     tags:
         *     - User
         *     operationId: login
         *     summary: Logs user into the system.
         *     description: Logs user into the system.
         *     requestBody:
         *       required: true
         *       content:
         *         application/x-www-form-urlencoded:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *                 description: The user's email.
         *                 example: admin@example.com
         *               password:
         *                 type: string
         *                 format: password
         *                 description: The user's password.
         *                 example: admin
         *             required:
         *               - email
         *               - password
         *     responses:
         *       200:
         *         description: The user has successfully logged in.
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 status:
         *                  type: string
         *                  example: Ok
         *                 data:
         *                   type: array
         *                   items:
         *                     type: object
         *                     properties:
         *                       _id:
         *                         type: integer
         *                         description: The user ID.
         *                         example: 0
         *                       name:
         *                         type: string
         *                         description: The user's name.
         *                         example: Leanne Graham
         *                       email:
         *                         type: string
         *                         description: The user's email.
         *                         example: admin@example.com
         *                       isAdmin:
         *                         type: boolean
         *                         description: The user's role.
         *                         example: true
         *                       token:
         *                         type: string
         *                         description: json web token.
         *       '400':
         *         description: Bad Request.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/400'
         *       
         *       '412':
         *         description: Precondition Failed.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/412'
         * 
         *       '500':
         *         description: Internal Server Error.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/500'
         * 
         */
        router.post('/login', userController.login);
        
        // Swagger documentation
        router.use(
          "/docs",
          swaggerUi.serve,
          swaggerUi.setup(this.specs)
        );
        router.get("/docs.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(this.specs);
        });
      }));

      router.use('/user', routesGrouping.group((router) => {
        /**
         * @swagger
         * /v1/user/{userId}:
         *   get:
         *     security:
         *      - bearerAuth: []
         *     tags:
         *     - User
         *     operationId: profile
         *     summary: Get a user by ID.
         *     description: Get a user by id from the system.
         *     parameters:
         *      - in: path
         *        name: userId
         *        schema:
         *          type: string
         *        required: true
         *        description: String ID of the user to get
         * 
         *     responses:
         *       200:
         *         description: The user has successfully logged in.
         *         content:
         *           application/json:
         *             schema:
         *                type: object
         *                properties:
         *                  status:
         *                    type: string
         *                    example: Ok
         *                  data:
         *                    $ref: '#/components/schemas/User'
         * 
         *       '400':
         *         description: Bad Request.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/400'
         * 
         *       '401':
         *         description: Unauthorized.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/401'
         *       
         *       '404':
         *         description: Not Found.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/404'
         * 
         *       '500':
         *         description: Internal Server Error.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/500'
         * 
         */
        router.get('/:userId', userController.profile);
        
        /**
         * @swagger
         * /v1/user/{userId}:
         *   put:
         *     security:
         *      - bearerAuth: []
         *     tags:
         *     - User
         *     operationId: update
         *     summary: Update a user by ID.
         *     description: Update a user by ID.
         *     parameters:
         *      - in: path
         *        name: userId
         *        schema:
         *          type: string
         *        required: true
         *        description: String ID of the user to get
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               lastname:
         *                 type: string
         *                 description: The user's name.
         *                 example: John
         *               firstname:
         *                 type: string
         *                 description: The user's last name.
         *                 example: Doe
         *               gender:
         *                 in: query
         *                 default: 1
         *                 enum:
         *                 - 1
         *                 - 2
         *                 - 3
         *                 description: Gender values that need to be considered for filter
         *                 required: true
         *                 type: string
         *             required:
         *               - lastname
         *               - gender
         *         application/x-www-form-urlencoded:
         *           schema:
         *             type: object
         *             properties:
         *               lastname:
         *                 type: string
         *                 description: The user's name.
         *                 example: John
         *               firstname:
         *                 type: string
         *                 description: The user's last name.
         *                 example: Doe
         *               gender:
         *                 in: query
         *                 default: 1
         *                 enum:
         *                 - 1
         *                 - 2
         *                 - 3
         *                 description: Gender values that need to be considered for filter
         *                 required: true
         *                 type: string
         *             required:
         *               - lastname
         *               - gender
         *     responses:
         *       200:
         *         description: The user has successfully logged in.
         *         content:
         *           application/json:
         *             schema:
         *                type: object
         *                properties:
         *                  status:
         *                    type: string
         *                    example: Ok
         *                  data:
         *                    $ref: '#/components/schemas/User'
         * 
         *       '400':
         *         description: Bad Request.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/400'
         *       
         *       '401':
         *         description: Unauthorized.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/401'
         *       
         *       '404':
         *         description: Not Found.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/404'
         * 
         *       '500':
         *         description: Internal Server Error.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/500'
         * 
         */
        router.put('/:userId', userController.update);
        
        /**
         * @swagger
         * /v1/user/{userId}:
         *   delete:
         *     security:
         *      - bearerAuth: []
         *     tags:
         *     - User
         *     operationId: delete
         *     summary: Delete a user by ID.
         *     description: Delete a user by ID.
         *     parameters:
         *      - in: path
         *        name: userId
         *        schema:
         *          type: string
         *        required: true
         *        description: String ID of the user to delete
         *     
         *     responses:
         *       200:
         *         description: The user has successfully logged in.
         *         content:
         *           application/json:
         *             schema:
         *                type: object
         *                properties:
         *                  status:
         *                    type: string
         *                    example: Ok
         *                  data:
         *                    $ref: '#/components/schemas/User'
         * 
         *       '400':
         *         description: Bad Request.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/400'
         *       
         *       '401':
         *         description: Unauthorized.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/401'
         *       
         *       '404':
         *         description: Not Found.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/404'
         * 
         *       '500':
         *         description: Internal Server Error.
         *         content:
         *          application/json:
         *             schema:
         *              $ref: '#/responses/schemas/500'
         * 
         */
        router.delete('/:userId', userController.delete);
      }));
    }));
    
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