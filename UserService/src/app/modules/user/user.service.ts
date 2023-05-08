import User from './user.model';
import passwordHash from '../../utils/password-hash.util';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import Role from '../role/role.model';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-03-22
 * 
 * Class UserService
 */
class UserService {
  
  /**
   * Create a new UserService instance.
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
        const user = await User
        .findOne({email: data.email})
        .populate('gender')
        .populate('roles');
        
        if(user && passwordHash.compareHash(data.password, user.password)) {
          await User.findOneAndUpdate({email: data.email}, { $set: { online: true } });

          const loginRes = {
            _id: user._id,
            username: user.username,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            gender: user.gender,
            roles: user.roles
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
   * Logout
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-11
   * 
   * @param any data 
   * @returns any user
   */
  public async logout(req: Request) {
    return new Promise(async (resolve, reject) => {
      try {
        const authorization = req.headers.authorization;
        
        if(authorization) {
          const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
          
          // jwt.sign(authorization, "", { expiresIn: 1 } , (logout, err) => {
          //   if (logout) resolve(logout);
          //   else reject(err);
          // });
          const privateKey = fs.readFileSync(path.join(__dirname,'../auth/private.key'));

          jwt.sign(
            {
              exp: 0, // Zero minute
              iat: 0
            },
            privateKey,
            {algorithm: 'RS256'},
            (err, token) => {
              if(token) resolve(token);
              else reject(err);
            }
          );
        }
        else{
          resolve(authorization);
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
  public profile(userId: string) {
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
   * Assign a role to a user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string userId 
   * @param string roleId 
   * @returns user
   */
  public assign(userId: string, roleId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId);

        if(user) {
          const role = await Role.findById(roleId);
          
          if(role){
            // Check if the user doesn't already have this role
            const existRole = user.roles.filter(x => x._id.toString() == role._id.toString());
            
            if(existRole.length > 0) resolve('ALREADY_ASSIGNED');
            else{
              user.roles = [...user.roles, role._id];

              await user.save();
            }
            
            resolve(user);
          }
          else{
            resolve('ROLE_NOT_FOUND');
          }
        }
        else{
          resolve('USER_NOT_FOUND');
        }        
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Unassign a role to a user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string userId 
   * @param string roleId 
   * @returns user
   */
  public unassign(userId: string, roleId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId);

        if(user) {
          const role = await Role.findById(roleId);
          
          if(role){
            if(user.roles.length > 0){
              user.roles = user.roles.filter(x => x._id.toString() != role._id.toString());

              await user.save();
            }
            
            resolve(user);
          }
          else{
            resolve('ROLE_NOT_FOUND');
          }
        }
        else{
          resolve('USER_NOT_FOUND');
        }        
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
  public async register(data: any) {
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

  /**
   * Update a user
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   * 
   * @param string userId
   * @param any data 
   * @returns any user
   */
  public async update(userId: string, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId);
        if (user) {
          user.firstname = data.firstname || user.firstname;
          user.lastname = data.lastname;
          user.gender = data.gender;
          
          const updatedUser = await user.save();

          resolve(updatedUser);
        } else {
          resolve(user);
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Delete a user by id
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   * 
   * @param string userId 
   * @returns User user
   */
  public delete(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(userId).populate('roles');

        if(user) {
          let roles: Array<any> = user?.roles as any
          roles = roles.filter(role => role.name == 'Admin');
          
          if(roles.length) resolve('isAdmin');
          else{
            const deleteUser = await user.deleteOne();

            resolve(deleteUser);
          }
        } else {
          resolve(user);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

const userService = new UserService()
export default userService;