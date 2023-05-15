import config from "../config/index.config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-05-09
 *
 * Class i18nConfig
 */
class I18nConfig {
  private _locale: string;
  private _locales: Array<string> = [];

  /**
   * Create a new i18nConfig instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return void
   */
  constructor() {
    this._locale = config.i18n_locale || "en";
    this._locales = ['en', 'fr'];
  }

  /*********************************************************************************
   * Getters and Setters
   *********************************************************************************/

  /**
   * Get current locale
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return current locale
   */
  public get locale() {
    return this._locale;
  }

  /**
   * Get all locales
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return all locale
   */
  public get locales() {
    return this._locales;
  }

  /**
   * Set locale
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-09
   *
   * @return void
   */
  public set locale(locale: string) {
    this._locale = locale;
  }
}

export default I18nConfig;