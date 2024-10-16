import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Définir un modèle Card
const Card = sequelize.define('Card', {
  // Définir les colonnes de la table
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cvv: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  exp_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Exporter le modèle Card comme export par défaut
export default Card;