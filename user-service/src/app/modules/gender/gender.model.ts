import DBManager from '../../../core/db';
import { DataTypes } from 'sequelize';

const sequelize = new DBManager().onConnectMysql();

const attributes = {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}

const options = { timestamps: true };

const Gender = sequelize.define('Gender', attributes, options);

// const genderSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: false, unique: true }
//   },
//   {
//     timestamps: true,
//   }
// );

// const Gender = mongoose.model('Gender', genderSchema);

export default Gender;