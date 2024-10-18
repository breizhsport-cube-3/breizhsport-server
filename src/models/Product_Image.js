import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';
import Image from './Image.js';

// Définir un modèle Product_Image
const Product_Image = sequelize.define('Product_Image', {
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
  id_image: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Image,
      key: 'id',
    },
  }
});

// Exporter le modèle Product_Image comme export par défaut
export default Product_Image;