import { sequelize } from '../../../core/db';
import { DataTypes } from 'sequelize';
import User from '../user/user.model';
import Role from '../role/role.model';

const attributes = {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
}

const options = {
  timestamps: true,
  underscored: true,
};

const UserRole = sequelize.define('user_role', attributes, options);

User.belongsToMany(Role, { through: 'user_role', foreignKey: 'user_id', });
Role.belongsToMany(User, { through: 'user_role', foreignKey: 'role_id' });

export default UserRole;