/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retourne une liste d'utilisateurs
 *     description: Utilisez cette route pour obtenir une liste d'utilisateurs.
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Erreur serveur
 */
app.get('/api/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Erreur lors de la requête', error);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  });