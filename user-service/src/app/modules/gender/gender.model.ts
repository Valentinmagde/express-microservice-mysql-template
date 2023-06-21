import { sequelize } from '../../../core/db';
import { DataTypes } from 'sequelize';

const attributes = {
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}

const options = {
  timestamps: true,
  createdAt: "created_at", // alias createdAt as created_at
  updatedAt: "updated_at", // alias updatedAt as updated_at,
};

const Gender = sequelize.define('gender', attributes, options);

export default Gender;