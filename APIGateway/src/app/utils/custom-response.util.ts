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
     * @param any data 
     * @param Response res
     * 
     * @return Response of customize response
     */
    public success(data: any, res: Response) {
        res
        .status(data.status)
        .send({ status: "OK", data: data.data });
    }

    /**
     * Error customize response
     * 
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-27-03
     * 
     * @param any data 
     * @param Response res
     * 
     * @return Response of customize response
     */
    public error(data: any, res: Response) {
        res
        .status(data.status)
        .send({ 
            status: "FAILED", 
            data: { errNo: data.errNo, errMsg: data.errMsg }
        });
    }
}

const customResponse = new CustomResponse();
export default customResponse;