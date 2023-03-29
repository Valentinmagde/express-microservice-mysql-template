import { NextFunction, Request, Response } from 'express';
import CONSTANTS from "../../config/constants";
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
      if (userid === '') {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
          error: true,
          message: CONSTANTS.USERID_NOT_FOUND,
        });
      } else {
        try {
          const userDetails = await userService.getUserDetails(userid.trim());
          if (userDetails === undefined) {
            res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
              error: true,
              details: CONSTANTS.USERNAME_DETAIL_FAILED,
            });
          } else {
            res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
              error: false,
              details: userDetails,
            });
          }
        } catch (error) {
          res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE,
          });
        }
      }
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
    const data = {
      username: req.body.username === '' || req.body.username === undefined ? null : (req.body.username).trim(),
      lastname: req.body.lastname === '' || req.body.lastname === undefined ? null : req.body.lastname.trim(),
      email: req.body.email === '' || req.body.email === undefined ? null : req.body.email.trim(),
      gender: req.body.gender === '' || req.body.gender === undefined ? null : req.body.gender.trim(),
      password: req.body.password === '' || req.body.password === undefined ? null : req.body.password.trim(),
      online: 'Y'
    };

    if (data.username === '' || data.username === null) {
        res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.USERNAME_NOT_FOUND,
        });
    } else if (data.lastname === '' || data.lastname === null) {
      res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.USERLASTNAME_NOT_FOUND,
      });
    } else if (data.email === '' || data.email === null) {
      res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.EMAIL_NOT_FOUND,
      });
    } else if (data.gender === '' || data.gender === null) {
      res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
      });
    } else if (data.password === '' || data.password === null) {
      res.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
        error: true,
        message: CONSTANTS.PASSWORD_NOT_FOUND,
      });
    } else {
      userService.registerUser(data)
      .then((result) => {
        if (result === null || result === undefined) {
          res.status(CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({
            error: false,
            message: CONSTANTS.USER_REGISTRATION_FAILED,
          });
        } else {
          res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            error: false,
            userId: result,
            message: CONSTANTS.USER_REGISTRATION_OK,
          });
        }
      })
      .catch(error => {
        res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
          error: true,
          message: error.message,
        });
      })
    }
  }   
}

const userController = new UserController();
export default userController;