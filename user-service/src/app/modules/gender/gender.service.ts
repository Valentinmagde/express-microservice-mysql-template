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
          const gender: any = await Gender.findByPk(genderId);

          if (gender) {
            const name = data.name || gender.name;

            const updatedGender = await Gender.update(
              { name: name },
              { where: { id: genderId } }
            );

            resolve(updatedGender);
          } else {
            resolve(gender);
          }
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
          const gender = await Gender.findByPk(genderId);

          if (gender) {
            const deleteGender = await Gender.destroy({where: {id: genderId}});

            resolve(deleteGender);
          } else {
            resolve(gender);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const genderService = new GenderService();
export default genderService;