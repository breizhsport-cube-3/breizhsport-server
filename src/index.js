import express from 'express';
import pkg from 'pg';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const { Pool } = pkg;  // Extraire Pool de l'objet pg

// Créer l'application Express
const app = express();
const port = 3001;

// Configurer PostgreSQL avec une pool de connexions
const pool = new Pool({
  user: 'breizhsport',
  host: 'postgres',
  database: 'breizhsport',
  password: 'breizhsport',
  port: 5432,
});

// Middleware pour analyser le JSON
app.use(express.json());

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

// Exemple de route d'API
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la requête', error);
    res.status(500).json({ error: 'Erreur de serveur' });
  }
});

// Lancer le serveur Express
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
  console.log(`Swagger disponible sur http://localhost:${port}/api-docs`);
});