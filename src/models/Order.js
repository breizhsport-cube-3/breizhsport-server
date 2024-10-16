import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Order
const Order = sequelize.define('Order', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Exporter le modèle Order comme export par défaut
export default Order;