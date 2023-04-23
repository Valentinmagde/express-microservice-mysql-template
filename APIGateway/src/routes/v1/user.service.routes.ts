import authentication from '../../authentication.modules/authentication';
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
 * Class UserServiceRoutes
 */
class UserServiceRoutes {
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
     * Creating all user service routes 
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-26-03
     * 
     * @returns Router
     */
    public userServiceRoutes() {
        return this.router.use(routesGrouping.group((router) => {
            // All gender routes
            router.use(routesGrouping.group((router) => {
                router.use('/genders', routesGrouping.group((router) => {
                    router.post('/', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        
                        userServiceProxy(req, res, next);
                    });
                    
                    router.get('/', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;

                        userServiceProxy(req, res, next);
                    });
                }));

                router.use('/gender', routesGrouping.group((router) => {
                    router.get('/:genderId', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });

                    router.put('/:genderId', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });

                    router.delete('/:genderId', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });
                }));
            }));

            // All role routes
            router.use(routesGrouping.group((router) => {
                router.use('/roles', routesGrouping.group((router) => {
                    router.post('/', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        
                        userServiceProxy(req, res, next);
                    });
                    
                    router.get('/', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;

                        userServiceProxy(req, res, next);
                    });
                }));

                router.use('/role', routesGrouping.group((router) => {
                    router.get('/:roleId', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });

                    router.put('/:roleId', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });

                    router.delete('/:roleId', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });
                }));
            }));

            // All user routes
            router.use(routesGrouping.group((router) => {
                router.use('/users', routesGrouping.group((router) => {
                    router.post('/', (req, res, next) => {
                        const bearerToken = authentication.generateGatewayToken(req);
                        
                        // Set request header authorization with generic gateway
                        req.headers.authorization = `Bearer ${bearerToken}`;
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;

                        userServiceProxy(req, res, next);
                    });

                    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
                        const bearerToken = authentication.generateGatewayToken(req);

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

                router.use('/user', routesGrouping.group((router) => {
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

                    router.get('/:userId/role/:roleId/assign', (req, res, next) => {
                        // Update url with original url which contain all path
                        req.url = req.originalUrl;
                        userServiceProxy(req, res, next);
                    });

                    router.get('/:userId/role/:roleId/unassign', (req, res, next) => {
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
        }));
    }
}

const userServiceRoutes = new UserServiceRoutes();
export default userServiceRoutes;
