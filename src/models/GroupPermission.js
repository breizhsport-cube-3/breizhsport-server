import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Group from './Group.js';
import Permission from './Permission.js';

// Définir un modèle Group_Permission
const GroupPermission = sequelize.define('GroupPermission', {
  // Définir les colonnes de la table
  id_group: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Group,
      key: 'id',
    },
  },
  id_permission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Permission,
      key: 'id',
    },
  }
});

// Exporter le modèle Group_Permission comme export par défaut
export default GroupPermission;