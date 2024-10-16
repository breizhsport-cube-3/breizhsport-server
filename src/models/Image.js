import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Image
const Image = sequelize.define('Image', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Exporter le modèle Image comme export par défaut
export default Image;