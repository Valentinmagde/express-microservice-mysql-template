import { Request, Response } from "express";
import i18n from "../translations";
import errorNumbers from "../utils/error.numbers.utils";
import statusCode from "../utils/status.code.utils";
import customResponse from "../utils/custom.response.utils";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 * 
 * Class Controller
 */
export default class Controller {
  /**
   * Route Not Found Handle
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param req 
   * @param res
   * @returns json
   */
  public routeNotFoundHandler(req: Request, res: Response) {
    const response = {
      status: statusCode.HTTP_NOT_FOUND,
      errNo: errorNumbers.resource_not_found,
      errMsg: i18n.en.others.ROUTE_NOT_FOUND,
    }

    return customResponse.error(response, res);
  }
}