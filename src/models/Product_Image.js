import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Product_Image
const Product_Image = sequelize.define('Product_Image', {
  // Définir les colonnes de la table
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_image: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  }
});

// Exporter le modèle Product_Image comme export par défaut
export default Product_Image;