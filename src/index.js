import express from 'express';
import entities from './models/Entities.js'; // Importer les modèles
import sequelize from './config/database.js'; // Importer Sequelize
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import jwt from 'jsonwebtoken';
const SECRET_KEY = 'your-secret-key';

import { API_VERSION } from './../version.js'
const API_PORT = 3001;

const app = express();
const port = API_PORT;

try {
  await sequelize.authenticate();
  console.log('Connection to postgres has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Synchroniser la base de données
sequelize.sync({ force: true }) // force: true pour recréer les tables à chaque démarrage (à éviter en production)
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

app.post('/login', (req, res) => {
  // For simplicity, assuming the user credentials are passed in request body
  const { username, password } = req.body;

  // Validate user credentials here (e.g., check username and password against a database)
  if (username === 'admin' && password === 'password') {
      // Generate JWT token upon successful authentication
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token });
  } else {
      return res.status(401).json({ message: 'Invalid credentials' });
  }
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

app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you have access to this route.` });
});

// Exemple de route d'API
app.get('/api/users', async (req, res) => {
  try {
    const users = await entities.User.findAll(); // Utilisation de Sequelize pour récupérer les utilisateurs
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