export const USER_ENDPOINT = [
  `GET : ${ALL_USER}`, 
  `GET : ${USER_BY_ID}`
]

const ALL_USER = '/api/users'
const USER_BY_ID = '/api/users/{id}'
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
app.get(ALL_USER, async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (error) {
      console.error('Erreur lors de la requête', error);
      res.status(500).json({ error: 'Erreur de serveur' });
    }
  });

/**
 * @swagger
 * /api/users/{id}:
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
app.get(USER_BY_ID, async (req, res) => {
  try {
    const id = parseInt(req.params.id); // Récupérer l'ID à partir des paramètres de l'URL
      res.status(200).json({ result: 'Test : ' + id });
  } catch (error) {
    console.error('Erreur lors de la requête', error);
    res.status(500).json({ error: 'Erreur interne au serveur' });
  }
});