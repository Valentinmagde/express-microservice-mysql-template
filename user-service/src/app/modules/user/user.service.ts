import User from "./user.model";
import passwordHash from "../../utils/password-hash.util";
import Role from "../role/role.model";
import UserType from "./user.type";
import RoleType from "../role/role.type";

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
          const user: UserType = (await User.findOne({ email: data.email })
            // .populate("gender")
            .populate("roles")) as UserType;

          if (user && passwordHash.compareHash(data.password, user.password)) {
            await User.findOneAndUpdate(
              { email: data.email },
              { $set: { online: true } }
            );

            const loginRes = {
              _id: user._id,
              username: user.username,
              lastname: user.lastname,
              firstname: user.firstname,
              email: user.email,
              gender: user.gender,
              roles: user.roles,
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
          const user = await User.findById(userId);

          resolve(user);
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
          const user: UserType | null = await User.findById(userId);

          if (user) {
            const role: RoleType | null = await Role.findById(roleId);

            if (role) {
              // Check if the user doesn't already have this role
              if (user.roles.includes(role._id)) resolve("ALREADY_ASSIGNED");
              else {
                user.roles = [...user.roles, role._id];

                await new User(user).save();
              }

              resolve(user);
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
          const user: UserType | null = await User.findById(userId);

          if (user) {
            const role: RoleType | null = await Role.findById(roleId);

            if (role) {
              // Check if the user have this role
              if (!user.roles.includes(role._id)) resolve("NOT_HAVE_THIS_ROLE");
              else {
                user.roles = user.roles.filter(
                  (x) => x.toString() != role._id.toString()
                );

                await new User(user).save();
              }

              resolve(user);
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
          const user: UserType | null = await User.findById(userId);

          if (user) {
            user.firstname = data.firstname || user.firstname;
            user.lastname = data.lastname;
            user.gender = data.gender;

            const updatedUser = await new User(user).save();

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
          const user: UserType | null = await User.findById(userId).populate(
            "roles"
          );

          if (user) {
            let roles: Array<RoleType> = user?.roles as Array<RoleType>;
            roles = roles.filter((role) => role.name == "Admin");

            if (roles.length) resolve("isAdmin");
            else {
              const deleteUser = await new User(user).deleteOne();

              resolve(deleteUser);
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