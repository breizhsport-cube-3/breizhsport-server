export const passwordResetTemplate = (username, resetLink) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .button {
      background-color: #008CBA;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Réinitialisation de mot de passe</h2>
    <p>Bonjour ${username},</p>
    <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour créer un nouveau mot de passe :</p>
    <a href="${resetLink}" class="button">Réinitialiser mon mot de passe</a>
    <p>Ce lien est valable pendant 1 heure.</p>
    <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
  </div>
</body>
</html>
`;