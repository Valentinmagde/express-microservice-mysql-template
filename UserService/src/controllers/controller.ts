import { Request, Response } from "express";
import CONSTANTS from "../config/constants";

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
    res.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
      error: true,
      message: CONSTANTS.ROUTE_NOT_FOUND,
    });
  }
}