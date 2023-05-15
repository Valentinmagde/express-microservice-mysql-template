import { Application } from "express";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class ExpressConfig
 */
class ExpressConfig {
  private app;
  
  /**
   * Create a new ExpressConfig instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @return void
   */
  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Set App Engine.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @return void
   */
  public setAppEngine() {
    this.app.set('view engine', 'html');
  }
}

export default ExpressConfig;
