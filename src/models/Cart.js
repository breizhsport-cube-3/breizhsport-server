import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js'

// Définir un modèle Cart
const Cart = sequelize.define('Cart', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  items: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
});

// Exporter le modèle Cart comme export par défaut
export default Cart;