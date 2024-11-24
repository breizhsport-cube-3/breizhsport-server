import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Group from './Group.js';
import Address from './Address.js';

// Définir un modèle User
const User = sequelize.define('User', {
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
  }
});

// Exporter le modèle User comme export par défaut
export default User;