import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Address from './Address.js';

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
    references: {
      model: Address,
      key: 'id',
    },
  }
});

// Exporter le modèle Shop comme export par défaut
export default Shop;