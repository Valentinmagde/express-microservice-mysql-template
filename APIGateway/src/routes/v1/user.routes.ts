import auth from '../../auth/auth';
import express, { Application, NextFunction, Request, Response, Router } from 'express';
import httpProxy from 'express-http-proxy';
import dotenv from "dotenv";
import routesGrouping from '../../utils/routes.grouping';

dotenv.config();

const userServiceProxy = httpProxy(process.env.USER_SERVICE_URL as string);

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
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
        return this.router.use(routesGrouping.group((router) => {
            router.use('/users', routesGrouping.group((router) => {
                // router.get('/docs', (req, res, next) => {
                //     const bearerToken = auth.generateGatewayToken(req);
                    
                //     // Set request header authorization with generic gateway
                //     req.headers.authorization = `Bearer ${bearerToken}`;
                //     // Update url with original url which contain all path
                //     req.url = req.originalUrl;
                    
                //     userServiceProxy(req, res, next);
                // });

                router.post('/', (req, res, next) => {
                    const bearerToken = auth.generateGatewayToken(req);
                    
                    // Set request header authorization with generic gateway
                    req.headers.authorization = `Bearer ${bearerToken}`;
                    // Update url with original url which contain all path
                    req.url = req.originalUrl;

                    userServiceProxy(req, res, next);
                });

                router.post('/login', (req: Request, res: Response, next: NextFunction) => {
                    const bearerToken = auth.generateGatewayToken(req);

                    // Set request header authorization with generic gateway
                    req.headers.authorization = `Bearer ${bearerToken}`;
                    // Update url with original url which contain all path
                    req.url = req.originalUrl;
        
                    userServiceProxy(req, res, next);
                });

                router.get('/logout', (req, res, next) => {
                    // Update url with original url which contain all path
                    req.url = req.originalUrl;
                    userServiceProxy(req, res, next);
                });
            }));

            router.use('/user', auth.isAuth, routesGrouping.group((router) => {
                router.get('/:userId', (req, res, next) => {
                    // Update url with original url which contain all path
                    req.url = req.originalUrl;
                    userServiceProxy(req, res, next);
                });

                router.put('/:userId', (req, res, next) => {
                    // Update url with original url which contain all path
                    req.url = req.originalUrl;
                    userServiceProxy(req, res, next);
                });

                router.delete('/:userId', (req, res, next) => {
                    // Update url with original url which contain all path
                    req.url = req.originalUrl;
                    userServiceProxy(req, res, next);
                });
            }));
        }));
    }
}

const userRoutes = new UserRoutes();
export default userRoutes;
