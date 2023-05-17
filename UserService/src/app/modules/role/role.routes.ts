import express, { Router } from 'express';
import dotenv from "dotenv";
import routesGrouping from '../../utils/routes-grouping.util';
import roleController from './role.controller';

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-21
 * 
 * Class RoleRoutes
 */
class RoleRoutes {
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
     * Creating all roles routes 
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-04-21
     * 
     * @returns Router
     */
    public roleRoutes() {
        return this.router.use(routesGrouping.group((router) => {
            router.use('/roles', routesGrouping.group((router) => {
                /**
                 * @swagger
                 * /v1/roles:
                 *   post:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Role
                 *     operationId: store
                 *     summary: Create a new role.
                 *     description: Add role into the system.
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/x-www-form-urlencoded:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The role's name.
                 *                 example: Admin
                 *             required:
                 *               - name
                 * 
                 *         application/json:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The role's name.
                 *                 example: Admin
                 *             required:
                 *               - name
                 * 
                 *     responses:
                 *       201:
                 *         description: Role successfully created.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    $ref: '#/components/schemas/Role'
                 *               
                 *       400:
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
                router.post('/', roleController.store);

                /**
                 * @swagger
                 * /v1/roles:
                 *   get:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Role
                 *     operationId: showAllRoles
                 *     summary: Get all roles.
                 *     description: Get all roles from the system.
                 * 
                 *     responses:
                 *       200:
                 *         description: The roles have been successfully recovered.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    type: array
                 *                    items:
                 *                      $ref: '#/components/schemas/Role'
                 *               
                 *       400:
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
                router.get('/', roleController.showAll);
            }));

            router.use('/role', routesGrouping.group((router) => {
                /**
                 * @swagger
                 * /v1/role/{roleId}:
                 *   get:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Role
                 *     operationId: show
                 *     summary: Get a role by ID.
                 *     description: Get a role by id from the system.
                 *     parameters:
                 *      - in: path
                 *        name: roleId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the role to get
                 * 
                 *     responses:
                 *       200:
                 *         description: The role has successfully retrieve.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    $ref: '#/components/schemas/Role'
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
                router.get('/:roleId', roleController.show);
                
                /**
                 * @swagger
                 * /v1/role/{roleId}:
                 *   put:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Role
                 *     operationId: roleupdate
                 *     summary: Update a role by ID.
                 *     description: Update a role by ID.
                 *     parameters:
                 *      - in: path
                 *        name: roleId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the role to get
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The role's name.
                 *                 example: Admin
                 *             required:
                 *               - name
                 *         application/x-www-form-urlencoded:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The role's name.
                 *                 example: Admin
                 *             required:
                 *               - name
                 *     responses:
                 *       200:
                 *         description: The role has successfully update.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    $ref: '#/components/schemas/Role'
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
                router.put('/:roleId', roleController.update);
                
                /**
                 * @swagger
                 * /v1/role/{roleId}:
                 *   delete:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Role
                 *     operationId: roledelete
                 *     summary: Delete a role by ID.
                 *     description: Delete a role by ID.
                 *     parameters:
                 *      - in: path
                 *        name: roleId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the role to delete
                 *     
                 *     responses:
                 *       204:
                 *         description: The role delete successfully.
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
                router.delete('/:roleId', roleController.delete);
            }));
        }));
    }
}

const roleRoutes = new RoleRoutes();
export default roleRoutes;