import { Request, Response } from "express";
import userService from "./user.service";
import i18n from "../../../core/i18n";
import customResponse from "../../utils/custom-response.util";
import statusCode from "../../utils/status-code.util";
import errorNumbers from "../../utils/error-numbers.util";
import validator from "../../utils/validator.util";
import { Errors } from "validatorjs";
import helpers from "../../utils/helpers.util";
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
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async profile(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    userService
      .profile(userId)
      .then((result) => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("user.profile.userNotFound"),
          };

          return customResponse.error(response, res);
        } else {
          const response = {
            status: statusCode.httpOk,
            data: result,
          };

          return customResponse.success(response, res);
        }
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Get all users details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-20
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async showAll(req: Request, res: Response): Promise<void> {
    userService
      .getAll()
      .then((result) => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("user.show.userNotFound"),
          };

          return customResponse.error(response, res);
        } else {
          const response = {
            status: statusCode.httpOk,
            data: result,
          };

          return customResponse.success(response, res);
        }
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Assign a role to a user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async assign(req: Request, res: Response): Promise<void> {
    const userid = req.params.userId;
    const roleid = req.params.roleId;

    userService
      .assign(userid, roleid)
      .then((result) => {
        if (result === "ROLE_NOT_FOUND") {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("role.show.roleNotFound"),
          };

          return customResponse.error(response, res);
        } else if (result === "USER_NOT_FOUND") {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("user.profile.userNotFound"),
          };

          return customResponse.error(response, res);
        } else if (result === "ALREADY_ASSIGNED") {
          const response = {
            status: statusCode.httpBadRequest,
            errNo: errorNumbers.resourceExist,
            errMsg: i18n.__("user.assign.roleAlreadyAssigned"),
          };

          return customResponse.error(response, res);
        } else {
          const response = {
            status: statusCode.httpOk,
            data: result,
          };

          return customResponse.success(response, res);
        }
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Unassign a role to a user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async unassign(req: Request, res: Response): Promise<void> {
    const userid = req.params.userId;
    const roleid = req.params.roleId;

    userService
      .unassign(userid, roleid)
      .then((result) => {
        if (result === "ROLE_NOT_FOUND") {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("role.show.roleNotFound"),
          };

          return customResponse.error(response, res);
        } else if (result === "USER_NOT_FOUND") {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("user.profile.userNotFound"),
          };

          return customResponse.error(response, res);
        } else if (result === "NOT_HAVE_THIS_ROLE") {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("user.unassign.notHaveThisRole"),
          };

          return customResponse.error(response, res);
        } else {
          const response = {
            status: statusCode.httpNoContent,
            data: result,
          };

          return customResponse.success(response, res);
        }
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });

  }

  /**
   * Login route handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async login(req: Request, res: Response): Promise<void> {
    const validationRule = {
      email: "required|string|email",
      password: "required|string|min:6",
    };

    await validator
      .validator(
        req.body,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            userService
              .login(req.body)
              .then((result) => {
                if (result === null || result === undefined) {
                  const response = {
                    status: statusCode.httpBadRequest,
                    errNo: errorNumbers.badLoginCredentials,
                    errMsg: i18n.__("user.login.userLoginFailed"),
                  };

                  return customResponse.error(response, res);
                } else {
                  const response = {
                    status: statusCode.httpOk,
                    data: result,
                  };

                  return customResponse.success(response, res);
                }
              })
              .catch((error) => {
                const response = {
                  status:
                    error?.status || statusCode.httpInternalServerError,
                  errNo: errorNumbers.genericError,
                  errMsg: error?.message || error,
                };

                return customResponse.error(response, res);
              });
          }
        }
      )
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Register route handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async register(req: Request, res: Response): Promise<void> {
    const validationRule = {
      username: "required|string",
      last_name: "required|string",
      email: "required|string|email",
      gender_id: "required",
      password: "required|string|min:6",
    };

    await validator
      .validator(
        req.body,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            userService
              .register(req.body)
              .then((result) => {
                const response = {
                  status: statusCode.httpCreated,
                  data: result,
                };

                return customResponse.success(response, res);
              })
              .catch((error) => {
                const response = {
                  status:
                    error?.status || statusCode.httpInternalServerError,
                  errNo: errorNumbers.genericError,
                  errMsg:
                    error?.errors?.find(() => true).message ||
                    error?.message ||
                    error
                };

                return customResponse.error(response, res);
              });
          }
        }
      )
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Update a user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async update(req: Request, res: Response): Promise<void> {
    const validationRule = {
      last_name: "required|string",
      gender_id: "required|string",
    };

    await validator
      .validator(
        req.body,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            const userId = req.params.userId;

            userService
              .update(userId, req.body)
              .then((result) => {
                if (result === null || result === undefined) {
                  const response = {
                    status: statusCode.httpNotFound,
                    errNo: errorNumbers.resourceNotFound,
                    errMsg: i18n.__("user.update.userNotFound"),
                  };

                  return customResponse.error(response, res);
                } else {
                  const response = {
                    status: statusCode.httpOk,
                    data: result,
                  };

                  return customResponse.success(response, res);
                }
              })
              .catch((error) => {
                const response = {
                  status:
                    error?.status || statusCode.httpInternalServerError,
                  errNo: errorNumbers.genericError,
                  errMsg: error?.message || error,
                };

                return customResponse.error(response, res);
              });
          }
        }
      )
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Delete a user by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async delete(req: Request, res: Response): Promise<void> {
    const userid = req.params.userId;

    if (helpers.checkObjectId(userid)) {
      userService
        .delete(userid)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("user.profile.userNotFound"),
            };

            return customResponse.error(response, res);
          } else if (result == "isAdmin") {
            const response = {
              status: statusCode.httpBadRequest,
              errNo: errorNumbers.requiredPermission,
              errMsg: i18n.__("user.delete.cannotDeleteAdmin"),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpNoContent,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("user.others.invalidUserId"),
      };

      return customResponse.error(response, res);
    }
  }
}

const userController = new UserController();
export default userController;