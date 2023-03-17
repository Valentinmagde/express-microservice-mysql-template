import CONSTANTS from "../../config/constants.js";
import userService from "../../services/user-service.js";
import Controller from "../controller.js";

class UserController extends Controller {
    constructor() {
        super();
    }

    async getUserDetailsHandler(request, response) {
        const userid = request.params.userId;
        if (userid === '') {
          response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USERID_NOT_FOUND,
          });
        } else {
          try {
            const userDetails = await userService.getUserDetails(userid.trim());
            if (userDetails === undefined) {
              response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                error: true,
                details: CONSTANTS.USERNAME_DETAIL_FAILED,
              });
            } else {
              response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                details: userDetails,
              });
            }
          } catch (error) {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.SERVER_ERROR_MESSAGE,
            });
          }
        }
    }
    
    async loginRouteHandler(request, response) {
    const data = {
        name: request.body.name === '' || request.body.name === undefined ? null : (request.body.name).trim(),
        password: request.body.password === '' || request.body.password === undefined ? null : request.body.password.trim(),
    };
    if (data.name === '' || data.name === null) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERNAME_NOT_FOUND,
        });
    } else if (data.password === '' || data.password === null) {
        response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
        });
    } else {
        try {
        const result = await userService.login(data);
        if (result === null || result === undefined) {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED,
            });
        } else {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: false,
            userId: result,
            message: CONSTANTS.USER_LOGIN_OK,
            });
        }
        } catch (error) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USER_LOGIN_FAILED,
        });
        }
    }
    }
    
    async registerRouteHandler(request, response) {
        const data = {
            username: request.body.username === '' || request.body.username === undefined ? null : (request.body.username).trim(),
            lastname: request.body.lastname === '' || request.body.lastname === undefined ? null : request.body.lastname.trim(),
            email: request.body.email === '' || request.body.email === undefined ? null : request.body.email.trim(),
            gender: request.body.gender === '' || request.body.gender === undefined ? null : request.body.gender.trim(),
            password: request.body.password === '' || request.body.password === undefined ? null : request.body.password.trim(),
        };
    
        if (data.username === '' || data.username === null) {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND,
            });
        } else if (data.lastname === '' || data.lastname === null) {
          response.status(CONSTANTSANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USERLASTNAME_NOT_FOUND,
          });
        } else if (data.email === '' || data.email === null) {
          response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.EMAIL_NOT_FOUND,
          });
        } else if (data.gender === '' || data.gender === null) {
          response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.PASSWORD_NOT_FOUND,
          });
        } else if (data.password === '' || data.password === null) {
          response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.PASSWORD_NOT_FOUND,
          });
        } else {
          try {
            data.online = 'Y';
            const result = await userService.registerUser(data);
            if (result === null || result === undefined) {
              response.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({
                error: false,
                message: CONSTANTS.USER_REGISTRATION_FAILED,
              });
            } else {
              response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                error: false,
                userId: result.insertedId,
                message: CONSTANTS.USER_REGISTRATION_OK,
              });
            }
          } catch (error) {
            response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              message: CONSTANTS.SERVER_ERROR_MESSAGE,
            });
          }
        }
    }    
}

const userController = new UserController();
export default userController;