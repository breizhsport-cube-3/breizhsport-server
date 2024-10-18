import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';
import User from './User.js';

// Définir un modèle Review
const Review = sequelize.define('Review', {
  // Définir les colonnes de la table
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

// Exporter le modèle Review comme export par défaut
export default Review;