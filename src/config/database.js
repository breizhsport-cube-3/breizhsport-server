import { Sequelize } from 'sequelize';

// Créez une instance de Sequelize et configurez la connexion à PostgreSQL
const sequelize = new Sequelize('breizhsport', 'breizhsport', 'breizhsport', {
  host: 'postgres',
  dialect: 'postgres',
  port: 5432,
});

export default sequelize;