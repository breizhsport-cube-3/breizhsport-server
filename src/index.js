const express = require('express');
const { Pool } = require('pg');

// Créer une application Express
const app = express();
const port = 5000;

// Configurer une pool PostgreSQL
const pool = new Pool({
  user: 'breizhsport',
  host: 'postgres',  // Le nom du service dans Docker Compose
  database: 'breizhsport',
  password: 'breizhsport',
  port: 5432,
});

// Exemple de route pour obtenir des utilisateurs depuis PostgreSQL
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Erreur lors de la requête', error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
});

// Lancer le serveur Express
app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});