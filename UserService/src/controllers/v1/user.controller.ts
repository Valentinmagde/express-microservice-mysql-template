import { Request, Response } from 'express';
import userService from "../../services/user.service";
import Controller from "../controller";
import i18n from '../../i18n';
import customResponse from '../../utils/custom.response';
import statusCode from '../../utils/status.code';
import errorNumbers from '../../utils/error.numbers';
import validator from '../../utils/validator';
import { Errors } from 'validatorjs';
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class UserController
 */
class UserController extends Controller {
  
  /**
   * Create a new UserController instance.
   *
   * @return void
   */
  public constructor() {
    super();
  }

  /**
   * Get user details handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of user detail 
   */
  public async getUserDetailsHandler(req: Request, res: Response) 
  {
    const userid = req.params.userId;
    
    userService.getUserDetails(userid)
    .then(result => {
      if (result === null || result === undefined) {
        const response = {
          status: statusCode.HTTP_BAD_REQUEST,
          errNo: errorNumbers.bad_login_credentials,
          errMsg: i18n.en.profile.USER_NOT_FOUND,
        }

        return customResponse.error(response, res);
      } 
      else {
          const response = {
            status: statusCode.HTTP_OK,
            data: result,
          }
  
          return customResponse.success(response, res);
      }
    })
    .catch(error => {
      const response = {
        status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
        errNo: errorNumbers.generic_error,
        errMsg: error?.message || error,
      }

      return customResponse.error(response, res);
    })
  }
    
  /**
   * Login route handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return json of Response
   */
  public async loginRouteHandler(req: Request, res: Response) {
    
    const validationRule = {
      "email": "required|string|email",
      "password": "required|string|min:6"
    };

    await validator
    .validator(req.body, validationRule,{}, (err: Errors, status: Boolean) => {
      if (!status) {
        const response = {
          status: statusCode.HTTP_PRECONDITION_FAILED,
          errNo: errorNumbers.validator,
          errMsg: err.errors,
        }

        return customResponse.error(response, res);
      }
      else {
        userService.login(req.body)
        .then(result => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.HTTP_BAD_REQUEST,
              errNo: errorNumbers.bad_login_credentials,
              errMsg: i18n.en.login.USER_LOGIN_FAILED,
            }
    
            return customResponse.error(response, res);
          } 
          else {
              const response = {
                status: statusCode.HTTP_OK,
                data: result,
              }
      
              return customResponse.success(response, res);
          }
        })
        .catch(error => {
          const response = {
            status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
            errNo: errorNumbers.generic_error,
            errMsg: error?.message || error,
          }

          return customResponse.error(response, res);
        })
      }
    })
    .catch( error => {
      const response = {
        status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
        errNo: errorNumbers.generic_error,
        errMsg: error?.message || error,
      }

      return customResponse.error(response, res);
    })
  }
    
  /**
   * Register route handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return json of Response
   */
  public async registerRouteHandler(req: Request, res: Response) {
    
    const validationRule = {
      "username": "required|string",
      "lastname": "required|string",
      "email": "required|string|email",
      "gender": "required|integer",
      "password": "required|string|min:6"
    };

    await validator
    .validator(req.body, validationRule,{}, (err: Errors, status: Boolean) => {
      if (!status) {
        const response = {
          status: statusCode.HTTP_PRECONDITION_FAILED,
          errNo: errorNumbers.validator,
          errMsg: err.errors,
        }

        return customResponse.error(response, res);
      }
      else {
        userService.registerUser(req.body)
        .then(result => {
          const response = {
            status: statusCode.HTTP_CREATED,
            data: result,
          }
  
          return customResponse.success(response, res);
        })
        .catch(error => {
          const response = {
            status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
            errNo: errorNumbers.generic_error,
            errMsg: error?.message || error,
          }

          return customResponse.error(response, res);
        })
      }
    })
    .catch( error => {
      const response = {
        status: error?.status || statusCode.HTTP_INTERNAL_SERVER_ERROR,
        errNo: errorNumbers.generic_error,
        errMsg: error?.message || error,
      }

      return customResponse.error(response, res);
    })
  }   
}

const userController = new UserController();
export default userController;