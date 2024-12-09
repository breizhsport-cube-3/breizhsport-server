import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken');
const { User } = require('./../models/User');
const API_SECRET_KEY = process.env.API_SECRET_KEY;

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user && bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, API_SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        }

        res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});
