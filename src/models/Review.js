import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Review
const Review = sequelize.define('Review', {
  // Définir les colonnes de la table
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

// Exporter le modèle Review comme export par défaut
export default Review;