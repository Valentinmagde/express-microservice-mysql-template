import express, { Router } from "express";
import httpProxy from "express-http-proxy";
import dotenv from "dotenv";
import routesGrouping from "../utils/routes-grouping.util";
import statusCode from "../utils/status-code.util";
import authenticationController from "./authentication.controller";
import authorization from "../middlewares/authorization.middleware";
import jwtUtilities from "../utils/jwt-utilities.util";

dotenv.config();

const userServiceProxy = httpProxy(process.env.USER_SERVICE_URL as string, {
  userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
    const data = JSON.parse(proxyResData.toString("utf8"));

    // Add the access token and refresh token information
    // in the response when it is the login
    if (
      userReq.url.indexOf("/login") > -1 &&
      userRes.statusCode == statusCode.httpOk
    ) {
      data.data = jwtUtilities.generateToken(data.data);
    }

    return JSON.stringify(data);
  },
});

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
      "/auth",
      routesGrouping.group((router) => {
        /**
         * @swagger
         * /v1/{lang}/auth/generate/keypair:
         *   get:
         *     tags:
         *     - Authentication
         *     operationId: keypair
         *     summary: Generate a public and private keypair.
         *     description: Generate a public and private keypair.
         *     parameters:
         *      - in: path
         *        name: lang
         *        schema:
         *          type: string
         *          example: en
         *        required: true
         *        description: Language for the response. Supported languages
         *          ['en', 'fr']
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
         *                  type: object
         *                  properties:
         *                    publicKey:
         *                     type: string
         *                     description: The public key.
         *                    privateKey:
         *                     type: string
         *                     description: The private key.
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
        router.get(
          "/generate/keypair",
          authenticationController.generateKeyPair
        );

        /**
         * @swagger
         * /v1/{lang}/auth/login:
         *   post:
         *     tags:
         *     - Authentication
         *     operationId: login
         *     summary: Logs user into the system (Get token).
         *     description: Logs user into the system (Get token).
         *     parameters:
         *      - in: path
         *        name: lang
         *        schema:
         *          type: string
         *          example: en
         *        required: true
         *        description: Language for the response. Supported languages
         *          ['en', 'fr']
         *
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
         *                  type: object
         *                  properties:
         *                    accessToken:
         *                     type: string
         *                     description: Access token.
         *                    refreshToken:
         *                     type: string
         *                     description: Refresh token.
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
        router.post("/login", (req, res, next) => {
          const bearerToken = jwtUtilities.generateInternToken();

          // Set request header authorization with generic gateway
          req.headers.authorization = `Bearer ${bearerToken}`;

          // Update url with original url which contain all path
          req.url = `/v1/${
            JSON.parse(JSON.stringify(req.params)).lang
          }/users/login`;

          userServiceProxy(req, res, next);
        });

        /**
         * @swagger
         * /v1/{lang}/auth/logout:
         *   get:
         *     security:
         *      - bearerAuth: []
         *     tags:
         *     - Authentication
         *     operationId: logout
         *     summary: Logs out current logged in user (Destroy token).
         *     description: Logs out current logged in user (Destroy token).
         *     parameters:
         *      - in: path
         *        name: lang
         *        schema:
         *          type: string
         *          example: en
         *        required: true
         *        description: Language for the response. Supported languages
         *          ['en', 'fr']
         *
         *     responses:
         *       204:
         *         description: The user logout successfully.
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
        router.get(
          "/logout",
          authorization.isAuth,
          authenticationController.logout
        );

        /**
         * @swagger
         * /v1/{lang}/auth/refresh:
         *   post:
         *     security:
         *      - bearerAuth: []
         *     tags:
         *     - Authentication
         *     operationId: refresh
         *     summary: Refresh acces token.
         *     description: Refresh acces token.
         *     parameters:
         *      - in: path
         *        name: lang
         *        schema:
         *          type: string
         *          example: en
         *        required: true
         *        description: Language for the response. Supported languages
         *          ['en', 'fr']
         *
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
         *                  type: object
         *                  properties:
         *                    accessToken:
         *                     type: string
         *                     description: Access token.
         *                    refreshToken:
         *                     type: string
         *                     description: Refresh token.
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
        router.post(
          "/refresh",
          authorization.isAuth,
          authenticationController.refresh
        );
      })
    );
  }
}

const authenticationRoutes = new AuthenticationRoutes();
export default authenticationRoutes;