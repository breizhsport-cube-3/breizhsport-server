import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Stock
const Stock = sequelize.define('Stock', {
  // Définir les colonnes de la table
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_shop: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Exporter le modèle Stock comme export par défaut
export default Stock;