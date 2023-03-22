/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class PasswordHash
 */
class PasswordHash {

  /**
   * Create hash
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param string password 
   * @returns string crypt password
   */
  public createHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * Compare hash
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param string password 
   * @param string hash
   * @returns boolean true | false
   */
  public compareHash(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

const passwordHash = new PasswordHash();
export default passwordHash;
