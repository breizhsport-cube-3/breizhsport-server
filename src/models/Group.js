import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Group
const Group = sequelize.define('Group', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Exporter le modèle Group comme export par défaut
export default Group;