import { NextFunction, Request, Response } from 'express';
import authenticationService from "../services/authentication.service";
import i18n from '../../translations';
import customResponse from '../../utils/custom.response.utils';
import statusCode from '../../utils/status.code.utils';
import errorNumbers from '../../utils/error.numbers.utils';
import validator from '../../utils/validator.utils';
import { Errors } from 'validatorjs';
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 * 
 * Class AuthenticationController
 */
class AuthenticationController {
  
  /**
   * Create a new AuthenticationController instance.
   *
   * @return void
   */
  public constructor() {}

  /**
   * Logs out current logged in user session
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return any
   */
  public async logout(req: Request, res: Response) {
    authenticationService.logout(req)
    .then((result) => {
      if (result === 'NO_TOKEN') {
        const response = {
          status: statusCode.HTTP_UNAUTHORIZED,
          errNo: errorNumbers.token_not_found,
          errMsg: i18n.en.unauthorize.NO_TOKEN,
        }

        return customResponse.error(response, res);
      }
      else {
        const response = {
          status: statusCode.HTTP_OK,
          data: null,
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
   * Refresh token handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return any
   */
  public async refresh(req: Request, res: Response) {
    const validationRule = {
      "refreshtoken": "required|string"
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
        authenticationService.refresh(req)
        .then(result => {
          if (result === 'NO_TOKEN') {
            const response = {
              status: statusCode.HTTP_UNAUTHORIZED,
              errNo: errorNumbers.token_not_found,
              errMsg: i18n.en.unauthorize.NO_TOKEN,
            }
    
            return customResponse.error(response, res);
          }
          else if (result === 'INVALID_TOKEN') {
            const response = {
              status: statusCode.HTTP_UNAUTHORIZED,
              errNo: errorNumbers.token_not_found,
              errMsg: i18n.en.unauthorize.INVALID_TOKEN,
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
}

const authenticationController = new AuthenticationController();
export default authenticationController;