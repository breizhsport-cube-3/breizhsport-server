export const accountConfirmationTemplate = (username, confirmationLink) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .button {
      background-color: #4CAF50;
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
    <h2>Bienvenue sur BreizhSport !</h2>
    <p>Bonjour ${username},</p>
    <p>Merci de vous être inscrit. Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
    <a href="${confirmationLink}" class="button">Confirmer mon compte</a>
    <p>Ce lien est valable pendant 24 heures.</p>
    <p>À bientôt !</p>
  </div>
</body>
</html>
`;