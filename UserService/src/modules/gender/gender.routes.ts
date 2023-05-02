import express, { Router } from 'express';
import dotenv from "dotenv";
import routesGrouping from '../../utils/routes.grouping.utils';
import genderController from './gender.controller';

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-21
 * 
 * Class GenderRoutes
 */
class GenderRoutes {
    private router: Router;

    /**
     * Create a new Routes instance.
     *
     * @return void
     */
    constructor() {
        this.router = express.Router();
    }

    /** 
     * Creating all gender routes 
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-04-21
     * 
     * @returns Router
     */
    public genderRoutes() {
        return this.router.use(routesGrouping.group((router) => {
            router.use('/genders', routesGrouping.group((router) => {
                /**
                 * @swagger
                 * /v1/genders:
                 *   post:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Gender
                 *     operationId: genderstore
                 *     summary: Create a new gender.
                 *     description: Add gender into the system.
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/x-www-form-urlencoded:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The gender's name.
                 *                 example: Male
                 *             required:
                 *               - name
                 * 
                 *         application/json:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The gender's name.
                 *                 example: Male
                 *             required:
                 *               - name
                 * 
                 *     responses:
                 *       201:
                 *         description: Gender successfully created.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    $ref: '#/components/schemas/Gender'
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
                router.post('/', genderController.store);

                /**
                 * @swagger
                 * /v1/genders:
                 *   get:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Gender
                 *     operationId: showAllGenders
                 *     summary: Get all genders.
                 *     description: Get all genders from the system.
                 * 
                 *     responses:
                 *       200:
                 *         description: The gender have been successfully recovered.
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
                 *                      $ref: '#/components/schemas/Gender'
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
                router.get('/', genderController.showAll);
            }));

            router.use('/gender', routesGrouping.group((router) => {
                /**
                 * @swagger
                 * /v1/gender/{genderId}:
                 *   get:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Gender
                 *     operationId: showGender
                 *     summary: Get a gender by ID.
                 *     description: Get a gender by id from the system.
                 *     parameters:
                 *      - in: path
                 *        name: genderId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the gender to get
                 * 
                 *     responses:
                 *       200:
                 *         description: The gender has successfully retrieve.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    $ref: '#/components/schemas/Gender'
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
                router.get('/:genderId', genderController.show);
                
                /**
                 * @swagger
                 * /v1/gender/{genderId}:
                 *   put:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Gender
                 *     operationId: genderupdate
                 *     summary: Update a gender by ID.
                 *     description: Update a gender by ID.
                 *     parameters:
                 *      - in: path
                 *        name: genderId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the gender to get
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The gender's name.
                 *                 example: Male
                 *             required:
                 *               - name
                 *         application/x-www-form-urlencoded:
                 *           schema:
                 *             type: object
                 *             properties:
                 *               name:
                 *                 type: string
                 *                 description: The gender's name.
                 *                 example: Male
                 *             required:
                 *               - name
                 *     responses:
                 *       200:
                 *         description: The gender has successfully update.
                 *         content:
                 *           application/json:
                 *             schema:
                 *                type: object
                 *                properties:
                 *                  status:
                 *                    type: string
                 *                    example: Ok
                 *                  data:
                 *                    $ref: '#/components/schemas/Gender'
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
                router.put('/:genderId', genderController.update);
                
                /**
                 * @swagger
                 * /v1/gender/{genderId}:
                 *   delete:
                 *     security:
                 *      - bearerAuth: []
                 *     tags:
                 *     - Gender
                 *     operationId: genderdelete
                 *     summary: Delete a gender by ID.
                 *     description: Delete a gender by ID.
                 *     parameters:
                 *      - in: path
                 *        name: genderId
                 *        schema:
                 *          type: string
                 *        required: true
                 *        description: String ID of the gender to delete
                 *     
                 *     responses:
                 *       204:
                 *         description: The gender delete successfully.
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
                router.delete('/:genderId', genderController.delete);
            }));
        }));
    }
}

const genderRoutes = new GenderRoutes();
export default genderRoutes;