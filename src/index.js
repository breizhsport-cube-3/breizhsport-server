import express from 'express';
import sequelize from './config/database.js'; // Importer Sequelize
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { API_VERSION } from './../version.js';
import { PORT } from './env.js';
import loginRoutes from './routes/login.js';

const app = express();

try {
  await sequelize.authenticate();
  console.log('Connection to postgres has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Synchroniser la base de données
sequelize.sync({ force: false }) // force: true pour recréer les tables à chaque démarrage (à éviter en production)
  .then(() => {
    console.log('La base de données a été synchronisée.');
  })
  .catch(err => {
    console.error('Erreur de synchronisation de la base de données:', err);
  });

// Middleware pour analyser le JSON
app.use(express.json());

// Middleware pour ajouter le numéro de version de l'API dans le header des réponses
app.use((_, res, next) => {
  res.setHeader('x-api-version', API_VERSION);
  next()
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/login', loginRoutes);

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
          url: `http://localhost:${PORT}`,
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Spécifiez où Swagger doit chercher les annotations
};

// Initialiser Swagger avec la configuration
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Démarrer le serveur Express
app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur http://localhost:${PORT}`);
  console.log(`Swagger disponible sur http://localhost:${PORT}/api-docs`);
});