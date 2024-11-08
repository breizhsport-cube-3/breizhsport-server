import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './../env.js'

const router = express.Router();

/**
 * Function to validate a JWT token.
 * @param {string} token - The JWT token to validate.
 * @returns {boolean} - Returns true if the token is valid, otherwise false.
 */
function validateToken(token) {
    try {
        jwt.verify(token, JWT_SECRET_KEY);
        return true; // Token is valid
    } catch (err) {
        return false; // Token is invalid
    }
}

/**
 * @swagger
 * /api/login/generateToken:
 *   post:
 *     summary: Génère un token JWT pour l'authentification.
 *     description: Cette route vérifie les informations d'identification de l'utilisateur et génère un jeton JWT pour les sessions sécurisées.
 *     responses:
 *       200:
 *         description: Jeton JWT généré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Erreur d'authentification.
 */
router.post("/generateToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    let data = {
        time: Date(),
        userId: 12,
    }

    const token = jwt.sign(data, JWT_SECRET_KEY);

    res.send(token);
});

/**
 * @swagger
 * /api/login/test:
 *   get:
 *     summary: Test route that requires a valid JWT token.
 *     description: Returns "Hello" if the token provided is valid.
 *     security:
 *       - bearerAuth: []  # This tells Swagger that this endpoint requires a Bearer token
 *     responses:
 *       200:
 *         description: Successfully validated token.
 *         content:
 *           text/plain:
 *             example: "Hello"
 *       401:
 *         description: Invalid or missing token.
 */
router.get('/test', (req, res) => {
    const token = req.headers['authorization'];
    console.log(token);

    if (token && validateToken(token)) {
        res.send('Hello');
    } else {
        res.status(401).json({ error: 'Invalid or missing token.' });
    }
});

export default router;