import { Sequelize } from 'sequelize';

const DB_LOCATION = process.env.DB_LOCATION
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT

// Créez une instance de Sequelize et configurez la connexion à PostgreSQL
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_LOCATION}:${DB_PORT}/${DB_NAME}`)

export default sequelize;