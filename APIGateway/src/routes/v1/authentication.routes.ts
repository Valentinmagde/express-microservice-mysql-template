import authentication from '../../authentication.modules/authentication';
import express, { Application, NextFunction, Request, Response, Router } from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from "dotenv";
import routesGrouping from '../../utils/routes.grouping';
import statusCode from '../../utils/status.code';
import customResponse from '../../utils/custom.response';
import errorNumbers from '../../utils/error.numbers';
import i18n from '../../i18n';
import redisDB from '../../utils/redis.db';
import authenticationController from '../../authentication.modules/controllers/authentication.controller';

dotenv.config();

const loginUrl = '/v1/users/login';

const userServiceProxy = httpProxy(
    process.env.USER_SERVICE_URL as string,
    {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
            const data = JSON.parse(proxyResData.toString('utf8'));

            // Add the access token and refresh token information 
            // in the response when it is the login
            if(userReq.url == loginUrl && userRes.statusCode == statusCode.HTTP_OK){
                data.data = authentication.generateToken(data.data);
            }

            return JSON.stringify(data);
        }
    }
);

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-22
 * 
 * Class AuthenticationRoutes
 */
class AuthenticationRoutes {
    private router: Router;

    /**
     * Create a new Routes instance.
     *
     * @return void
     */
    constructor() {
        this.router = express.Router();
    }

    // ---------------------------------------------------------------------------------------
    // Public functions
    // ---------------------------------------------------------------------------------------

    /** 
     * Creating all authentication routes 
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-04-22
     * 
     * @returns Router
     */
    public authenticationRoutes() {
        return this.router.use('/auth', routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/auth/login:
             *   post:
             *     tags:
             *     - Authentication
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
            router.post('/login', (req, res, next) => {
                const bearerToken = authentication.generateGatewayToken(req);

                // Set request header authorization with generic gateway
                req.headers.authorization = `Bearer ${bearerToken}`;

                // Update url with original url which contain all path
                req.url = loginUrl;
                
                userServiceProxy(req, res, next);
            });
            
            /**
             * @swagger
             * /v1/auth/logout:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Authentication
             *     operationId: logout
             *     summary: Logs out current logged in user session.
             *     description: Logs out current logged in user session.
             *     
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
            router.post('/logout', authentication.isAuth, authenticationController.logout);

            /**
             * @swagger
             * /v1/auth/refresh:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Authentication
             *     operationId: refresh
             *     summary: Refresh acces token.
             *     description: Refresh acces token.
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               refreshtoken:
             *                 type: string
             *                 description: The refresh token.
             *             required:
             *               - refreshtoken
             *     responses:
             *       200:
             *         description: The access token has successfully refresh.
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
            router.post('/refresh', authentication.isAuth, authenticationController.refresh);
        }));
    }
}

const authenticationRoutes = new AuthenticationRoutes();
export default authenticationRoutes;
