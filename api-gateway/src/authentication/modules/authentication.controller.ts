import { Request, Response } from 'express';
import authenticationService from "./authentication.service";
import i18n from '../../core/i18n';
import customResponse from '../utils/custom-response.util';
import statusCode from '../utils/status-code.util';
import errorNumbers from '../utils/error-numbers.util';
import validator from '../utils/validator.util';
import { Errors } from 'validatorjs';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-23
 *
 * Class AuthenticationController
 */
class AuthenticationController {

  /**
   * This function will generate a public and private keypair and save to
   * current directory
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-04
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @returns {Promise<void>} the eventual completion or failure
   */
  public async generateKeyPair(req: Request, res: Response) : Promise<void> {
    authenticationService.generateKeyPair()
    .then((result) => {
      const response = {
        status: statusCode.httpOk,
        data: result,
      }

      return customResponse.success(response, res);
    })
    .catch(error => {
      const response = {
        status: error?.status || statusCode.httpInternalServerError,
        errNo: errorNumbers.genericError,
        errMsg: error?.message || error,
      }

      return customResponse.error(response, res);
    })
  }

  /**
   * Logs out current logged in user session
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-23
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @returns {Promise<void>} the eventual completion or failure
   */
  public async logout(req: Request, res: Response) : Promise<void> {
    authenticationService.logout(req)
    .then((result) => {
      if (result === 'NO_TOKEN') {
        const response = {
          status: statusCode.httpUnauthorized,
          errNo: errorNumbers.tokenNotFound,
          errMsg: i18n.__("unauthorize.noToken"),
        }

        return customResponse.error(response, res);
      }
      else {
        const response = {
          status: statusCode.httpNoContent,
          data: result,
        }

        return customResponse.success(response, res);
      }
    })
    .catch(error => {
      const response = {
        status: error?.status || statusCode.httpInternalServerError,
        errNo: errorNumbers.genericError,
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
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async refresh(req: Request, res: Response) : Promise<void>{
    const validationRule = {
      "refreshtoken": "required|string"
    };

    await validator
    .validator(req.body, validationRule,{}, (err: Errors, status: boolean) => {
      if (!status) {
        const response = {
          status: statusCode.httpPreconditionFailed,
          errNo: errorNumbers.validator,
          errMsg: err.errors,
        }

        return customResponse.error(response, res);
      }
      else {
        authenticationService.refresh(req)
        .then(result => {
          if (result === 'NO_REFRESH_TOKEN') {
            const response = {
              status: statusCode.httpUnauthorized,
              errNo: errorNumbers.tokenNotFound,
              errMsg: i18n.__("unauthorize.noRefreshToken"),
            }

            return customResponse.error(response, res);
          }
          else if (result === 'INVALID_REFRESH_TOKEN') {
            const response = {
              status: statusCode.httpUnauthorized,
              errNo: errorNumbers.tokenNotFound,
              errMsg: i18n.__("unauthorize.invalidRefreshToken"),
            }

            return customResponse.error(response, res);
          }
          else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            }

            return customResponse.success(response, res);
          }
        })
        .catch(error => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          }

          return customResponse.error(response, res);
        })
      }
    })
    .catch( error => {
      const response = {
        status: error?.status || statusCode.httpInternalServerError,
        errNo: errorNumbers.genericError,
        errMsg: error?.message || error,
      }

      return customResponse.error(response, res);
    })
  }
}

const authenticationController = new AuthenticationController();
export default authenticationController;