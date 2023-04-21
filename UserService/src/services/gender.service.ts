import Gender from '../models/gender.model';

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-04-21
 * 
 * Class GenderService
 */
class GenderService {
  
  /**
   * Create a new GenderService instance.
   *
   * @return void
   */
  constructor() {}

  /**
   * Get gender details
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string genderId 
   * @returns any gender
   */
  public getById(genderId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const gender = await Gender.findById(genderId);
        
        resolve(gender);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get all genders details
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @returns any gender
   */
  public getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const genders = await Gender.find();
        
        resolve(genders);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Create a new gender
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param any data 
   * @returns any gender
   */
  public async store(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const gender = new Gender({ name: data.name });
    
        const createdGender = await gender.save();

        resolve(createdGender);
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Update a gender
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string genderId
   * @param any data 
   * @returns any gender
   */
  public async update(genderId: string, data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const gender = await Gender.findById(genderId);

        if(gender) {
          gender.name = data.name || gender.name;
          
          const updatedGender = await gender.save();

          resolve(updatedGender);
        } else {
          resolve(gender);
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Delete a gender by id
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   * 
   * @param string genderId 
   * @returns any gender
   */
  public delete(genderId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const gender = await Gender.findById(genderId);

        if(gender) {
          const deleteGender = await gender.deleteOne();
          
          resolve(deleteGender);
        } else {
          resolve(gender);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

const genderService = new GenderService()
export default genderService;