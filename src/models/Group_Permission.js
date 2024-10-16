import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Group_Permission
const Group_Permission = sequelize.define('Group_Permission', {
  // Définir les colonnes de la table
  id_group: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_permission: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  }
});

// Exporter le modèle Group_Permission comme export par défaut
export default Group_Permission;