import Gender from "./gender.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-21
 *
 * Class GenderService
 */
class GenderService {
  /**
   * Get gender details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} genderId the gender id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getById(genderId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const gender = await Gender.findByPk(genderId);

          resolve(gender);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all genders details
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
          const genders = await Gender.findAll();

          resolve(genders);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new gender
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {any} data the user data to store
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: { name: string }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await Gender.sync();

          const createdGender = await Gender.create({ name: data.name });

          resolve(createdGender);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a gender
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} genderId the gender id
   * @param {any} data the user data to update
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(
    genderId: string,
    data: { name: string }
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const updatedGender = await Gender.update(
            { name: data.name },
            { where: { id: genderId } }
          );

          if (updatedGender)
            resolve(await Gender.findByPk(genderId));
          else
            resolve(null);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a gender by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @param {string} genderId the gender id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(genderId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const deletedGender = await Gender.destroy({
            where: { id: genderId },
          });

          if(deletedGender)
            resolve(deletedGender);
          else
            resolve(null);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const genderService = new GenderService();
export default genderService;