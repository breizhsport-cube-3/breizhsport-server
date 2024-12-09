import express from 'express';
import sequelize from './config/database.js'; // Importer Sequelize
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { API_VERSION } from './../version.js';
import usersRoutes, { USER_ENDPOINT } from './routes/users.js';
import jwt from 'jsonwebtoken';

const API_PORT = process.env.API_PORT;
export const app = express();

if (process.env.NODE_ENV !== 'build') {
  try {
    await sequelize.authenticate();
    console.log('Connection to postgres has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Stop the api
    process.exit(1);
  }
}

// Synchroniser la base de données
sequelize.sync({ force: true }) // force: true pour recréer les tables à chaque démarrage (à éviter en production)
.then(() => {
  console.log('La base de données a été synchronisée.');
})
.catch(err => {
  console.error('Erreur de synchronisation de la base de données:', err);
});

// Middleware pour l'authentification
const authentification = require('./../middleware/authentification.js')
app.use(authentification)

// Middleware pour analyser le JSON
app.use(express.json());

// Middleware pour ajouter le numéro de version de l'API dans le header des réponses
app.use((_, res, next) => {
  res.setHeader('x-api-version', API_VERSION);
  next()
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = user; // Attach user data to request object
      next();
  });
};

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BreizhSport API',
      version: '1.0.0',
      description: 'Documentation de l’API de BreizhSport',
      servers: [
        {
          url: `http://localhost:${API_PORT}`,
        },
      ],
    },
  },
  apis: ['./src/routes/*.js'], // Spécifiez où Swagger doit chercher les annotations
};

// Initialiser Swagger avec la configuration
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

usersRoutes(app);

// Démarrer le serveur Express
if (process.env.NODE_ENV !== 'build') {
  app.listen(API_PORT, () => {
    console.log(`Serveur Express démarré sur http://localhost:${API_PORT}`);
    console.log(`Swagger disponible sur http://localhost:${API_PORT}/api-docs`);
    console.log(`Version de l'API déployé : ${API_VERSION}`);
    console.log('Endpoints de l\'API :');
    USER_ENDPOINT.forEach((endPoint) => {
      console.log(`- ${endPoint}\n`);
    });
  });
}