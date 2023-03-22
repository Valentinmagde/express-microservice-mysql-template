import User from '../models/user-model';
import { mongoDB } from '../config/db';
import passwordHash from 'utils/password-hash';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 * 
 * Class UserService
 * 
 * @param mongodb
 */
class UserService {
  private mongodb;
  
  /**
   * Create a new UserController instance.
   *
   * @return void
   */
  constructor() {
    this.mongodb = mongoDB;
  }

  /**
   * Login
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   * 
   * @param any data 
   * @returns any user
   */
  public login(data: any) {
    return new Promise(async (resolve, reject) => {
      // try {
      //   DB.collection('user').findOneAndUpdate(
      //     data,
      //     {
      //       $set: {
      //         online: 'Y',
      //       },
      //     },
      //     (error, result) => {
      //       DBClient.close();
      //       if (error) {
      //         reject(error);
      //       }
      //       result.lastErrorObject.updatedExisting ? resolve(result.value._id) : resolve(null);
      //     },
      //   );
      // } catch (error) {
      //   reject(error);
      // }
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
      // try {
      //   const [DB, ObjectID, DBClient] = await this.mongodb.onConnect();
      //   DB.collection('user').aggregate([
      //     {
      //       $match: { _id: ObjectID(userId) },
      //     },
      //     {
      //       $project: {
      //         name: true,
      //         email: true,
      //         lastname: true,
      //         online: true,
      //         _id: false,
      //         id: '$_id',
      //       },
      //     },
      //   ]).toArray((error, result) => {
      //     DBClient.close();
      //     if (error) {
      //       reject(error);
      //     }
      //     let userDetails = null;
      //     if (result.length > 0) {
      //       userDetails = result[0];
      //     }
      //     resolve(userDetails);
      //   });
      // } catch (error) {
      //   reject(error);
      // }
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