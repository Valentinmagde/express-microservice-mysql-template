import auth from '../../auth/auth';
import express, { Application, NextFunction, Request, Response, Router } from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from "dotenv";
import helpers from '../../helpers/helpers';

dotenv.config();

const userServiceProxy = httpProxy(process.env.USER_SERVICE_URL as string);

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 * 
 * Class UserApi
 */
class UserApi {
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
     * Creating all user routes 
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-26-03
     * 
     * @returns Router
     */
    public userRoutes() {
        return this.router.use(helpers.group((router) => {
            router.use('/users', helpers.group((router) => {
                router.post('/', (req, res, next) => {
                    userServiceProxy(req, res, next);
                });

                router.post('/register', (req, res, next) => {
                    userServiceProxy(req, res, next);
                });

                router.post('/login', (req: Request, res: Response, next: NextFunction) => {
                    const bearerToken = auth.generateGatewayToken(req);
                    req.headers.authorization = `Bearer ${bearerToken}`;
        
                    userServiceProxy(req, res, next);
                });
            }));

            router.use('/user', helpers.group((router) => {
                router.get('/:userId', (req, res, next) => {
                    userServiceProxy(req, res, next);
                });
            }));
        }));
    }
}

const userApi = new UserApi();
export default userApi;
