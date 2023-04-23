import { Request, Response } from 'express';
import Controller from "../controller";
import i18n from '../../i18n';
import customResponse from '../../utils/custom.response';
import statusCode from '../../utils/status.code';
import errorNumbers from '../../utils/error.numbers';
import validator from '../../utils/validator';
import { Errors } from 'validatorjs';
import helpers from '../../utils/helpers';
import genderService from '../../services/gender.service';
/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-21
 * 
 * Class GenderController
 */
class GenderController extends Controller {
  
  /**
   * Create a new GenderController instance.
   *
   * @return void
   */
  public constructor() {
    super();
  }

  /**
   * Get gender details handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of gender detail 
   */
  public async show(req: Request, res: Response) 
  {
    const genderid = req.params.genderId;
    
    if (helpers.checkObjectId(genderid)) {
      genderService.getById(genderid)
      .then(result => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.en.gender.show.GENDER_NOT_FOUND
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
        errMsg: i18n.en.gender.others.INVALID_GENDER_ID,
      }

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all gender details handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of gender detail 
   */
  public async showAll(req: Request, res: Response) 
  {
    genderService.getAll()
    .then(result => {
      if (result === null || result === undefined) {
        const response = {
          status: statusCode.HTTP_NOT_FOUND,
          errNo: errorNumbers.resource_not_found,
          errMsg: i18n.en.gender.show.GENDER_NOT_FOUND
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
   * Add gender route handler
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res 
   * 
   * @return json of Response
   */
  public async store(req: Request, res: Response) {
    console.log(req);
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
        genderService.store(req.body)
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
   * Update a gender
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
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
        const genderid = req.params.genderId;
        // check if gender id is valid
        if (helpers.checkObjectId(genderid)) {
          genderService.update(genderid, req.body)
          .then(result => {
            if (result === null || result === undefined) {
              const response = {
                status: statusCode.HTTP_NOT_FOUND,
                errNo: errorNumbers.resource_not_found,
                errMsg: i18n.en.gender.show.GENDER_NOT_FOUND,
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
            errMsg: i18n.en.gender.others.INVALID_GENDER_ID,
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
   * Delete a gender by id
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param Request req 
   * @param Response res
   * 
   * @return json of gender detail 
   */
  public async delete(req: Request, res: Response) 
  {
    const genderid = req.params.genderId;

    if (helpers.checkObjectId(genderid)) {
      genderService.delete(genderid)
      .then(result => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.HTTP_NOT_FOUND,
            errNo: errorNumbers.resource_not_found,
            errMsg: i18n.en.gender.show.GENDER_NOT_FOUND,
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
        errMsg: i18n.en.gender.others.INVALID_GENDER_ID,
      }

      return customResponse.error(response, res);
    }
  }
}

const genderController = new GenderController();
export default genderController;