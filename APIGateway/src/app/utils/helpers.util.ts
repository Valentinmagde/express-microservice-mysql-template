/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-05-14
 * 
 * Class Helpers
 */
class Helpers {

  /**
   * Check ObjectId validity
   * 
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   * 
   * @param string id
   * @returns boolean true | false
   */
  public checkObjectId(id: string) {
    return id.match(/^[0-9a-fA-F]{24}$/);
  }

  /**
   * Convert array of objects into array of properties
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-05-14
   *
   * @param array data
   * @return array of object
   */
  public convertToArrayOfProperties(
    data: Array<any>,
    properties: Array<string>
  ) {
    var finalArray: Array<any> = data.map(function (obj) {
      return properties.map((propertie) => {
        return obj[propertie];
      }).toString();
    });

    return finalArray;
  }
}

const helpers = new Helpers();
export default helpers;
