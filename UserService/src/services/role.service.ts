import Role from '../models/role.model';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-20
 * 
 * Class RoleService
 */
class RoleService {
  
  /**
   * Create a new RoleService instance.
   *
   * @return void
   */
  constructor() {}

  /**
   * Get role details
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string roleId 
   * @returns any role
   */
  public getById(roleId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await Role.findById(roleId);
        
        resolve(role);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get all roles details
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @returns any roles
   */
  public getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await Role.find();
        
        resolve(role);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create a new role
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-20
   * 
   * @param any data 
   * @returns any role
   */
  public async store(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const role = new Role({ name: data.name });
    
        const createdRole = await role.save();

        resolve(createdRole);
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Update a role
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string roleId
   * @param any data 
   * @returns any role
   */
  public async update(roleId: string, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await Role.findById(roleId);

        if(role) {
          role.name = data.name || role.name;
          
          const updatedUser = await role.save();

          resolve(updatedUser);
        } else {
          resolve(role);
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Delete a role by id
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string roleId 
   * @returns any role
   */
  public delete(roleId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const role = await Role.findById(roleId);

        if(role) {
          const deleteRole = await role.deleteOne();
          
          resolve(deleteRole);
        } else {
          resolve(role);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

const roleService = new RoleService()
export default roleService;