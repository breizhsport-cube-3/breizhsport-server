import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Order_Item
const Order_Item = sequelize.define('Order_Item', {
  // Définir les colonnes de la table
  id_product: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  id_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
});

// Exporter le modèle Order_Item comme export par défaut
export default Order_Item;