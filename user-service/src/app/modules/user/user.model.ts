import { sequelize } from "../../../core/db";
import { DataTypes } from "sequelize";
import Gender from "../gender/gender.model";

const attributes = {
  first_name: { type: DataTypes.STRING, allowNull: true },
  last_name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  gender_id: {
    type: DataTypes.INTEGER,
    references: { model: Gender, key: "id" },
  },
  is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
  online: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true },
};

const options = {
  timestamps: true,
  createdAt: "created_at", // alias createdAt as created_at
  updatedAt: "updated_at", // alias updatedAt as updated_at
  defaultScope: {
    attributes: { exclude: ['password'] },
  }
};

const User = sequelize.define("User", attributes, options);

export default User;