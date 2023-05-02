import { Request, Response } from 'express';
import i18n from '../../configs/translations';
import customResponse from '../../utils/custom.response.utils';
import statusCode from '../../utils/status.code.utils';
import errorNumbers from '../../utils/error.numbers.utils';
import validator from '../../utils/validator.utils';
import { Errors } from 'validatorjs';
import helpers from '../../utils/helpers.utils';
import roleService from './role.service';
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-20
 * 
 * Class RoleController
 */
class RoleController {
  
  /**
   * Create a new RoleController instance.
   *
   * @return void
   */
  public constructor() {}

  /**
   * Get role details handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of role detail 
   */
  public async show(req: Request, res: Response) 
  {
    const roleid = req.params.roleId;
    
    if (helpers.checkObjectId(roleid)) {
      roleService.getById(roleid)
      .then(result => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.en.role.show.ROLE_NOT_FOUND
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
        errMsg: i18n.en.role.others.INVALID_ROLE_ID,
      }

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all roles details handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of role detail 
   */
  public async showAll(req: Request, res: Response) 
  {
    roleService.getAll()
    .then(result => {
      if (result === null || result === undefined) {
        const response = {
          status: statusCode.HTTP_NOT_FOUND,
          errNo: errorNumbers.resource_not_found,
          errMsg: i18n.en.role.show.ROLE_NOT_FOUND
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
   * Add role route handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return json of Response
   */
  public async store(req: Request, res: Response) {
    const validationRule = { "name": "required|string" };

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
        roleService.store(req.body)
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
   * Update a role
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return json of Response
   */
  public async update(req: Request, res: Response) {
    
    const validationRule = { "name": "required|string" };

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
        const roleid = req.params.roleId;
        // check if role id is valid
        if (helpers.checkObjectId(roleid)) {
          roleService.update(roleid, req.body)
          .then(result => {
            if (result === null || result === undefined) {
              const response = {
                status: statusCode.HTTP_NOT_FOUND,
                errNo: errorNumbers.resource_not_found,
                errMsg: i18n.en.role.show.ROLE_NOT_FOUND,
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
            errMsg: i18n.en.role.others.INVALID_ROLE_ID,
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
   * Delete a role by id
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of role detail 
   */
  public async delete(req: Request, res: Response) 
  {
    const roleid = req.params.roleId;

    if (helpers.checkObjectId(roleid)) {
      roleService.delete(roleid)
      .then(result => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.en.role.show.ROLE_NOT_FOUND,
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
        errMsg: i18n.en.role.others.INVALID_ROLE_ID,
      }

      return customResponse.error(response, res);
    }
  }
}

const roleController = new RoleController();
export default roleController;