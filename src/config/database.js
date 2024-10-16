import { Sequelize } from 'sequelize';

const DB_LOCATION = 'postgres' // Nom du service associé dans le fichier docker-compose
const DB_NAME = 'breizhsport'
const DB_USER = 'breizhsport'
const DB_PASSWORD = "breizhsport"
const DB_PORT = 5432

// Créez une instance de Sequelize et configurez la connexion à PostgreSQL
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_LOCATION}:${DB_PORT}/${DB_NAME}`)

export default sequelize;