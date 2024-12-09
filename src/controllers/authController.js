import emailService from '../services/emailService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await User.create({
      email,
      username,
      password: hashedPassword,
      confirmationToken
    });

    await emailService.sendConfirmationEmail(email, username, confirmationToken);

    res.status(201).json({ 
      message: "Compte créé avec succès. Veuillez vérifier vos emails pour confirmer votre compte." 
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    if (!user.isConfirmed) {
      return res.status(401).json({ message: "Veuillez confirmer votre compte avant de vous connecter" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

export const confirmAccount = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ where: { confirmationToken: token } });
    if (!user) {
      return res.status(400).json({ message: "Token invalide" });
    }

    user.isConfirmed = true;
    user.confirmationToken = null;
    await user.save();

    await emailService.sendWelcomeEmail(user.email, user.username);

    res.status(200).json({ message: "Compte confirmé avec succès" });
  } catch (error) {
    console.error('Erreur lors de la confirmation du compte:', error);
    res.status(500).json({ message: "Erreur lors de la confirmation du compte" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = resetToken;
    await user.save();

    await emailService.sendPasswordResetEmail(email, user.username, resetToken);

    res.status(200).json({ 
      message: "Email de réinitialisation envoyé" 
    });
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    res.status(500).json({ message: "Erreur lors de la demande de réinitialisation" });
  }
};