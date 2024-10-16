import express from 'express';
import User from './models/User.js'; // Importer le modèle
import sequelize from './config/database.js'; // Importer Sequelize
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Sequelize } from 'sequelize';

import { API_VERSION } from './../version.js'

const DB_LOCATION = 'postgres' // Nom du service associé dans le fichier docker-compose
const DB_NAME = 'breizhsport'
const DB_USER = 'breizhsport'
const DB_PASSWORD = "breizhsport"
const DB_PORT = 5432


const app = express();
const port = 3001;

// Synchroniser la base de données
sequelize.sync({ force: false }) // force: true pour recréer les tables à chaque démarrage (à éviter en production)
  .then(() => {
    console.log('La base de données a été synchronisée.');
  })
  .catch(err => {
    console.error('Erreur de synchronisation de la base de données:', err);
  });

// Exemple de route d'API
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Utilisation de Sequelize pour récupérer les utilisateurs
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la requête', error);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
});

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BreizhSport API',
      version: '1.0.0',
      description: 'Documentation de l’API de BreizhSport',
      contact: {
        name: 'Support',
        email: 'support@breizhsport.com',
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
    },
  },
  apis: ['./src/routes/*.js'], // Spécifiez où Swagger doit chercher les annotations
};

// Initialiser Swagger avec la configuration
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur Express
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
  console.log(`Swagger disponible sur http://localhost:${port}/api-docs`);
});