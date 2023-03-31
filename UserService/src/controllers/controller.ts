import { Request, Response } from "express";
import i18n from "../i18n";
import errorNumbers from "../utils/error.numbers";
import statusCode from "../utils/status.code";
import customResponse from "../utils/custom.response";

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