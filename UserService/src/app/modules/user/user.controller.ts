import { Request, Response } from 'express';
import userService from "./user.service";
import i18n from '../../../core/i18n';
import customResponse from '../../utils/custom-response.util';
import statusCode from '../../utils/status-code.util';
import errorNumbers from '../../utils/error-numbers.util';
import validator from '../../utils/validator.util';
import { Errors } from 'validatorjs';
import helpers from '../../utils/helpers.util';
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class UserController
 */
class UserController {

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
  public async profile(req: Request, res: Response) 
  {
    const userid = req.params.userId;
    if (helpers.checkObjectId(userid)) {
      userService.profile(userid)
      .then(result => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.__("user.profile.USER_NOT_FOUND"),
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
    else{
      const response = {
        status: statusCode.HTTP_BAD_REQUEST,
        errNo: errorNumbers.ivalid_resource,
        errMsg: i18n.__("user.others.INVALID_USER_ID"),
      }

      return customResponse.error(response, res);
    }
  }

  /**
   * Assign a role to a user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of user detail 
   */
  public async assign(req: Request, res: Response) 
  {
    const userid = req.params.userId;
    const roleid = req.params.roleId;

    if(!helpers.checkObjectId(userid)) {
      const response = {
        status: statusCode.HTTP_BAD_REQUEST,
        errNo: errorNumbers.ivalid_resource,
        errMsg: i18n.__("user.others.INVALID_USER_ID"),
      }

      return customResponse.error(response, res);
    }
    else if(!helpers.checkObjectId(roleid)) {
      const response = {
        status: statusCode.HTTP_BAD_REQUEST,
        errNo: errorNumbers.ivalid_resource,
        errMsg: i18n.__("role.others.INVALID_ROLE_ID"),
      }

      return customResponse.error(response, res);
    }
    else{
      userService.assign(userid, roleid)
      .then(result => {
        if (result === 'ROLE_NOT_FOUND') {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.__("role.show.ROLE_NOT_FOUND"),
          }

          return customResponse.error(response, res);
        }
        else if (result === 'USER_NOT_FOUND') {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.__("user.profile.USER_NOT_FOUND"),
          }

          return customResponse.error(response, res);
        }
        else if (result === 'ALREADY_ASSIGNED') {
          const response = {
            status: statusCode.HTTP_BAD_REQUEST,
            errNo: errorNumbers.resource_exist,
            errMsg: i18n.__("user.assign.ROLE_ALREADY_ASSIGNED"),
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
  }

  /**
   * Unassign a role to a user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of user detail 
   */
  public async unassign(req: Request, res: Response)
  {
    const userid = req.params.userId;
    const roleid = req.params.roleId;

    if(!helpers.checkObjectId(userid)) {
      const response = {
        status: statusCode.HTTP_BAD_REQUEST,
        errNo: errorNumbers.ivalid_resource,
        errMsg: i18n.__("user.others.INVALID_USER_ID"),
      }

      return customResponse.error(response, res);
    }
    else if(!helpers.checkObjectId(roleid)) {
      const response = {
        status: statusCode.HTTP_BAD_REQUEST,
        errNo: errorNumbers.ivalid_resource,
        errMsg: i18n.__("role.others.INVALID_ROLE_ID"),
      }

      return customResponse.error(response, res);
    }
    else{
      userService.unassign(userid, roleid)
      .then(result => {
        if (result === 'ROLE_NOT_FOUND') {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.__("role.show.ROLE_NOT_FOUND"),
          }

          return customResponse.error(response, res);
        }
        else if (result === 'USER_NOT_FOUND') {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.__("user.profile.USER_NOT_FOUND"),
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
  public async login(req: Request, res: Response) {
    const validationRule = {
      "email": "required|string|email",
      "password": "required|string|min:6"
    };

    await validator
    .validator(req.body, validationRule,{}, (err: Errors, status: boolean) => {
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
              errMsg: i18n.__("user.login.USER_LOGIN_FAILED"),
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
  public async register(req: Request, res: Response) {
    
    const validationRule = {
      "username": "required|string",
      "lastname": "required|string",
      "email": "required|string|email",
      "gender": "required|string",
      "password": "required|string|min:6"
    };

    await validator
    .validator(req.body, validationRule,{}, (err: Errors, status: boolean) => {
      if (!status) {
        const response = {
          status: statusCode.HTTP_PRECONDITION_FAILED,
          errNo: errorNumbers.validator,
          errMsg: err.errors,
        }

        return customResponse.error(response, res);
      }
      else {
        userService.register(req.body)
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
  
  /**
   * Update a user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return json of Response
   */
  public async update(req: Request, res: Response) {
    
    const validationRule = {
      "lastname": "required|string",
      "gender": "required|integer",
    };

    await validator
    .validator(req.body, validationRule,{}, (err: Errors, status: boolean) => {
      if (!status) {
        const response = {
          status: statusCode.HTTP_PRECONDITION_FAILED,
          errNo: errorNumbers.validator,
          errMsg: err.errors,
        }

        return customResponse.error(response, res);
      }
      else {
        const userid = req.params.userId;
        // check if user id is valid
        if (helpers.checkObjectId(userid)) {
          userService.update(userid, req.body)
          .then(result => {
            if (result === null || result === undefined) {
              const response = {
                status: statusCode.HTTP_NOT_FOUND,
                errNo: errorNumbers.resource_not_found,
                errMsg: i18n.__("user.update.USER_NOT_FOUND"),
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
        else{
          const response = {
            status: statusCode.HTTP_BAD_REQUEST,
            errNo: errorNumbers.ivalid_resource,
            errMsg: i18n.__("user.others.INVALID_USER_ID"),
          }
  
          return customResponse.error(response, res);
        }
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
   * Delete a user by id
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of user detail 
   */
  public async delete(req: Request, res: Response) 
  {
    const userid = req.params.userId;

    if (helpers.checkObjectId(userid)) {
      userService.delete(userid)
      .then(result => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.__("user.profile.USER_NOT_FOUND"),
          }

          return customResponse.error(response, res);
        }
        else if(result == 'isAdmin'){
          const response = {
            status: statusCode.HTTP_BAD_REQUEST,
            errNo: errorNumbers.required_permission,
            errMsg: i18n.__("user.delete.CANNOT_DELETE_ADMIN"),
          }

          return customResponse.error(response, res);
        }
        else {
            const response = {
              status: statusCode.HTTP_NO_CONTENT,
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
    else{
      const response = {
        status: statusCode.HTTP_BAD_REQUEST,
        errNo: errorNumbers.ivalid_resource,
        errMsg: i18n.__("user.others.INVALID_USER_ID"),
      }

      return customResponse.error(response, res);
    }
  }
}

const userController = new UserController();
export default userController;