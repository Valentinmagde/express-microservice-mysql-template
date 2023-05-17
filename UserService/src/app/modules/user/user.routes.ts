import express, { Router } from 'express';
import dotenv from "dotenv";
import routesGrouping from '../../utils/routes-grouping.util';
import userController from './user.controller';

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-21
 * 
 * Class UserRoutes
 */
class UserRoutes {
    private router: Router;

    /**
     * Create a new Routes instance.
     *
     * @return void
     */
    constructor() {
        this.router = express.Router({mergeParams: true});
    }

    /** 
     * Creating all user routes 
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-04-21
     * 
     * @returns Router
     */
    public userRoutes() {
        return this.router.use(routesGrouping.group((router) => {
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
                 *                 description: Gender ID
                 *                 required: true
                 *                 type: string
                 *                 example: 6442aa155564a41669de60cb
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
                 * // @swagger
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
                 * /v1/user/{userId}/role/{roleId}/assign:
                 *   get:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - User
                 *     operationId: assignrole
                 *     summary: Assign a role to a user.
                 *     description: Assign a role to a user.
                 *     parameters:
                 *      - in: path
                 *        name: userId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the user to get
                 *      - in: path
                 *        name: roleId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the role to get
                 * 
                 *     responses:
                 *       200:
                 *         description: The role successfully assigned to a user.
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
                router.get('/:userId/role/:roleId/assign', userController.assign);

                /**
                 * @swagger
                 * /v1/user/{userId}/role/{roleId}/unassign:
                 *   get:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - User
                 *     operationId: unassignrole
                 *     summary: Unassign a role to a user.
                 *     description: Unassign a role to a user.
                 *     parameters:
                 *      - in: path
                 *        name: userId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the user to get
                 *      - in: path
                 *        name: roleId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the role to get
                 * 
                 *     responses:
                 *       200:
                 *         description: The role successfully unassigned to a user.
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
                router.get('/:userId/role/:roleId/unassign', userController.unassign);
                
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
                 *       204:
                 *         description: The user deleted successfully.
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
    }
}

const userRoutes = new UserRoutes();
export default userRoutes;