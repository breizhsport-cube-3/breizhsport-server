import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './Product.js';
import Order from './Order.js';

// Définir un modèle Order_Item
const Order_Item = sequelize.define('Order_Item', {
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
  id_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
});

// Exporter le modèle Order_Item comme export par défaut
export default Order_Item;