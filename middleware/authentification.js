import { User } from './../src/models/User.js'
import jwt from 'jsonwebtoken'
const API_SECRET_KEY = process.env.API_SECRET_KEY;

export const authentification = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, API_SECRET_KEY);

            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'Utilisateur introuvable' });
            }

            req.user = user;
            next()
        } catch (err) {
            console.error(err)
            res.status(403).json({ message: 'Token invalide ou expiré' });
        }
    } else {
        res.status(401).json({ message: 'Token requis' });
    }
}