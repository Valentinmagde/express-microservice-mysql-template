import User from "./user.model";
import passwordHash from "../../utils/password-hash.util";
import Role from "../role/role.model";
import UserType from "./user.type";
import RoleType from "../role/role.type";
import Gender from "../gender/gender.model";
import UserRole from "../user-roles/user-roles.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-03-22
 *
 * Class UserService
 */
class UserService {
  /**
   * Login
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @param {any} data the user data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async login(data: {
    email: string;
    password: string;
  }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user: any = await User.findOne({
            attributes: [
              "id",
              "username",
              "last_name",
              "first_name",
              "email",
              "gender_id",
              "password",
            ],
            where: { email: data.email },
          });

          if (user && passwordHash.compareHash(data.password, user.password)) {
            await User.update(
              { online: true },
              { where: { email: data.email } }
            );

            console.log(user);
            const roles: Array<string> = [];

            const loginRes = {
              _id: user.id,
              username: user.username,
              lastname: user.last_name,
              firstname: user.first_name,
              email: user.email,
              gender: user.gender_id,
              roles: roles,
            };

            resolve(loginRes);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get user details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @param {string} userId the user id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public profile(userId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user = await User.findByPk(userId);

          resolve(user);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all users details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-20
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAll(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const users = await User.findAll();

          resolve(users);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Assign a role to a user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} userId the user id
   * @param {string} roleId the role id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public assign(userId: string, roleId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user: any = await User.findByPk(userId);

          if (user) {
            const role: any = await Role.findByPk(roleId);

            if (role) {
              await UserRole.sync();

              // Check if the user doesn't already have this role
              const hasRole = await UserRole.findOne({
                where: {
                  user_id: userId,
                  role_id: roleId,
                },
              });

              if (hasRole) resolve("ALREADY_ASSIGNED");
              else {
                const userRoleCreated = await UserRole.create({
                  user_id: userId,
                  role_id: roleId,
                });

                resolve(userRoleCreated);
              }
            } else {
              resolve("ROLE_NOT_FOUND");
            }
          } else {
            resolve("USER_NOT_FOUND");
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Unassign a role to a user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} userId the user id
   * @param {string} roleId the role id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public unassign(userId: string, roleId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user: any = await User.findByPk(userId);

          if (user) {
            const role: any = await Role.findByPk(roleId);

            if (role) {
              // Check if the user have this role
              const hasRole = await UserRole.findOne({
                where: {
                  user_id: userId,
                  role_id: roleId,
                }
              });

              if (!hasRole) resolve("NOT_HAVE_THIS_ROLE");
              else {
                const deletedUserRole = await UserRole.destroy({
                  where: {
                    user_id: userId,
                    role_id: roleId,
                  }
                });

                resolve(deletedUserRole);
              }
            } else {
              resolve("ROLE_NOT_FOUND");
            }
          } else {
            resolve("USER_NOT_FOUND");
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Register user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-22-03
   *
   * @param {any} data the user data to store
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async register(data: UserType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await User.sync({ alter: true });

          const user = {
            username: data.username,
            email: data.email,
            last_name: data.last_name,
            gender_id: data.gender_id,
            password: passwordHash.createHash(data.password),
          };

          const createdUser = await User.create(user);

          resolve(createdUser);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @param {string} userId the user id
   * @param {any} data the user data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(userId: string, data: UserType): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user: any = await User.findByPk(userId);

          if (user) {
            user.first_name = data.first_name || user.firstname;
            user.last_name = data.last_name;
            user.gender_id = data.gender_id;

            const updatedUser = await user.save();

            resolve(updatedUser);
          } else {
            resolve(user);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a user by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @param {string} userId the user id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(userId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const user: any = await User.findByPk(userId);

          if (user) {
            let roles: Array<RoleType> = user?.roles as Array<RoleType>;
            roles = roles.filter((role) => role.name == "Admin");
            if (roles.length) resolve("isAdmin");
            else {
              // const deleteUser = await new User(user).deleteOne();
              // resolve(deleteUser);
            }
          } else {
            resolve(user);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const userService = new UserService();
export default userService;