import { Request, Response, NextFunction } from "express";
import config from "../../config";
import statusCode from "../utils/status-code.util";
import errorNumbers from "../utils/error-numbers.util";
import customResponse from "../utils/custom-response.util";
import i18n from '../../core/i18n';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-05-13
 *
 * Class SetLocale
 */
class SetLocale {
  /**
   * Set locale
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return void
   */
  public setLocale(req: Request, res: Response, next: NextFunction): void {
    const swagger_base_url: string = config.swagger_base_url;
    const swagger_auth_base_url: string = config.swagger_auth_base_url;

    // Except documentation route for localization
    if (
      req.originalUrl.indexOf(swagger_base_url) > -1 ||
      req.originalUrl.indexOf(swagger_auth_base_url) > -1
    ) {
      return next();
    } else {
      const locale: string = req.params.lang || "";
      const locales: Array<string> = i18n.getLocales() || [];

      if (!locales.includes(locale)) {
        const response = {
          status: statusCode.HTTP_BAD_REQUEST,
          errNo: errorNumbers.generic_error,
          errMsg: "Language not supported",
        };

        return customResponse.error(response, res);
      } else {
        i18n.setLocale(locale);
        next();
      }
    }
  }
}

const setLocale = new SetLocale();
export default setLocale;