import { Response } from "express";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-27-03
 *
 * Class CustomResponse
 *
 */
class CustomResponse {
  /**
   * Success customize response
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-27-03
   *
   * @param {any} data the custom response
   * @param {Response} res the http response
   *
   * @return {void}
   */
  public success(data: any, res: Response) : void {
    res.status(data.status).send({ status: "OK", data: data.data });
  }

  /**
   * Error customize response
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-27-03
   *
   * @param {any} data the custom response
   * @param {Response} res the http response
   *
   * @return {void}
   */
  public error(data: any, res: Response): void {
    res.status(data.status).send({
      status: "FAILED",
      data: { errNo: data.errNo, errMsg: data.errMsg },
    });
  }
}

// export interface CustomResponseType {
//   status: number;
//   errNo?: number;
//   errMsg?: unknown;
//   data?: unknown;
// }

const customResponse = new CustomResponse();
export default customResponse;