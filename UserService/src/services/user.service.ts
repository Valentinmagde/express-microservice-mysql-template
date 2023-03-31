import User from '../models/user.model';
import passwordHash from '../utils/password.hash';
import Auth from '../auth/auth';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class UserService
 */
class UserService {
  
  /**
   * Create a new UserController instance.
   *
   * @return void
   */
  constructor() {}

  /**
   * Login
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param any data 
   * @returns any user
   */
  public async login(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({email: data.email});
        
        if(user && passwordHash.compareHash(data.password, user.password)) {
          await User.findOneAndUpdate({email: data.email}, { $set: { online: true } });

          const loginRes = {
            _id: user._id,
            name: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: new Auth().generateToken(user)
          };

          resolve(loginRes);
        }
        else{
          resolve(null);
        }
      } catch (error) { reject(error); }
    });
  }

  /**
   * Get user details
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param userId 
   * @returns user
   */
  public getUserDetails(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId);
        
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Register user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param any data 
   * @returns any user
   */
  public async registerUser(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = new User({
          username: data.username,
          email: data.email,
          lastname: data.lastname,
          gender: data.gender,
          password: passwordHash.createHash(data.password),
        });
    
        const createdUser = await user.save();

        resolve(createdUser);
      } catch (error) {
        reject(error)
      }
    })
  }
}

const userService = new UserService()
export default userService;