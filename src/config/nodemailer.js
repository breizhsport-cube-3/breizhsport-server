import nodemailer from 'nodemailer';

const API_EMAIL_ADDRESS = process.env.API_EMAIL_ADDRESS;
const API_EMAIL_PASSWORD = process.env.API_EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: API_EMAIL_ADDRESS,
    pass: API_EMAIL_PASSWORD
  }
});

const mailService = {
  async sendEmail(to, subject, template) {
    try {
      const info = await transporter.sendMail({
        from: API_EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: template
      });
      return { success: true, info };
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return { success: false, error };
    }
  }
};

export default mailService;