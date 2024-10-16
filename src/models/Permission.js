import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Permission
const Permission  = sequelize.define('Permission', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Exporter le modèle Permission comme export par défaut
export default Permission;