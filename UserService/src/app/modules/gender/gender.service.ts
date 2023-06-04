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
          const gender = await Gender.findById(genderId);

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
          const genders = await Gender.find();

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
          const gender = new Gender({ name: data.name });

          const createdGender = await gender.save();

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
          const gender = await Gender.findById(genderId);

          if (gender) {
            gender.name = data.name || gender.name;

            const updatedGender = await gender.save();

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
          const gender = await Gender.findById(genderId);

          if (gender) {
            const deleteGender = await gender.deleteOne();

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