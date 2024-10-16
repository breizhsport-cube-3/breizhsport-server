import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Product
const Product = sequelize.define('Product', {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specs: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Exporter le modèle Product comme export par défaut
export default Product;