/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';

class PasswordHash {
  createHash(password) {
    return bcrypt.hashSync(password, 10);
  }

  compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

const passwordHash = new PasswordHash();
export default passwordHash;
