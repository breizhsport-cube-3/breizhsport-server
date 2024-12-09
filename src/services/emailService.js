import mailService from '../config/nodemailer';
import { accountConfirmationTemplate } from '../templates/accountConfirmation';
import { passwordResetTemplate } from '../templates/passwordReset';
import { welcomeEmailTemplate } from '../templates/welcomeEmail';

const emailService = {
  async sendConfirmationEmail(userEmail, username, confirmationToken) {
    const confirmationLink = `${process.env.FRONTEND_URL}/confirm-account/${confirmationToken}`;
    const template = accountConfirmationTemplate(username, confirmationLink);
    return await mailService.sendEmail(
      userEmail,
      'Confirmez votre compte BreizhSport',
      template
    );
  },

  async sendPasswordResetEmail(userEmail, username, resetToken) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const template = passwordResetTemplate(username, resetLink);
    return await mailService.sendEmail(
      userEmail,
      'Réinitialisation de votre mot de passe BreizhSport',
      template
    );
  },

  async sendWelcomeEmail(userEmail, username) {
    const template = welcomeEmailTemplate(username);
    return await mailService.sendEmail(
      userEmail,
      'Bienvenue sur BreizhSport !',
      template
    );
  }
};

export default emailService;