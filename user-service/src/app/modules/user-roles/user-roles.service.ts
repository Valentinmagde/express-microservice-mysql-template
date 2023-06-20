import Role from "./role.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-20
 *
 * Class RoleService
 */
class RoleService {
  /**
   * Get role details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} roleId the role id
   * @returns {Promise<unknown>} the eventual completion or failure
   */
  public getById(roleId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const role = await Role.findByPk(roleId);

          resolve(role);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all roles details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getAll(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const roles = await Role.findAll();

          resolve(roles);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new role
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   *
   * @param {any} data the role data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: { name: string }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await Role.sync();

          const createdRole = await Role.create({ name: data.name });

          resolve(createdRole);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a role
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} roleId the role id
   * @param {any} data the role data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    roleId: string,
    data: { name: string }
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const role: any = await Role.findByPk(roleId);

          if (role) {
            role.name = data.name || role.name;

            const updatedRole = await role.save();

            resolve(updatedRole);
          } else {
            resolve(role);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a role by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} roleId the role id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(roleId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const deletedRole = await Role.destroy({
            where: { id: roleId },
          });

          if(deletedRole)
            resolve(deletedRole);
          else
            resolve(null);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const roleService = new RoleService();
export default roleService;