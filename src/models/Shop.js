import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Shop
const Shop = sequelize.define('Shop', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone_1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_address: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Exporter le modèle Shop comme export par défaut
export default Shop;