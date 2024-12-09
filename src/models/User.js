import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'

import sequelize from '../config/database.js';
import Group from './Group.js';
import Address from './Address.js';

// Définir un modèle User
export const User = sequelize.define('User', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmationToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_group: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Group,
      key: 'id',
    },
  },
  id_address: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Address,
      key: 'id',
    },
  }
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Exporter le modèle User comme export par défaut
export default User;