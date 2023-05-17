import Validatorjs, { ErrorMessages, Rules } from "validatorjs";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-29-03
 *
 * Class Validator
 *
 */
class Validator {
  /**
   * Initialize the validatorjs
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-29-03
   *
   * @param any body
   * @param Rules rules
   * @param ErrorMessages customMessages
   * @param any callback
   *
   * @return void
   */
  public async validator(
    body: any,
    rules: Rules,
    customMessages: ErrorMessages,
    callback: any
  ) {
    const validation = new Validatorjs(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  }
}

const validator = new Validator();
export default validator;