import User from '../models/user-model.js';
import { mongoDB } from './../config/db.js';

class UserService {
  constructor() {
    this.mongodb = mongoDB;
  }

  login(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.mongodb.onConnect();
        DB.collection('user').findOneAndUpdate(
          data,
          {
            $set: {
              online: 'Y',
            },
          },
          (error, result) => {
            DBClient.close();
            if (error) {
              reject(error);
            }
            result.lastErrorObject.updatedExisting ? resolve(result.value._id) : resolve(null);
          },
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserDetails(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const [DB, ObjectID, DBClient] = await this.mongodb.onConnect();
        DB.collection('user').aggregate([
          {
            $match: { _id: ObjectID(userId) },
          },
          {
            $project: {
              name: true,
              email: true,
              lastname: true,
              online: true,
              _id: false,
              id: '$_id',
            },
          },
        ]).toArray((error, result) => {
          DBClient.close();
          if (error) {
            reject(error);
          }
          let userDetails = null;
          if (result.length > 0) {
            userDetails = result[0];
          }
          resolve(userDetails);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  registerUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
            console.log(data);
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                lastname: req.body.lastname,
                gender: req.body.gender,
                password: bcrypt.hashSync(req.body.password, 8),
            });
        
            await user.save(data, (err, result) => {
            DBClient.close();
            if (err) {
                reject(err);
            }
            resolve(result);
            });

            const createdUser = await user.save();
            
            res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(createdUser),
            });
      } catch (error) {
        reject(error);
      }
    });
  }
}

const userService = new UserService()
export default userService;