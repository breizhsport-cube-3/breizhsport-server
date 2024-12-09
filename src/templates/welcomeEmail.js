export const welcomeEmailTemplate = (username) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .container { 
      padding: 20px;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Compte confirmé avec succès !</h2>
    <p>Félicitations ${username} !</p>
    <p>Votre compte BreizhSport est maintenant actif. Vous pouvez dès à présent vous connecter et profiter de tous nos services.</p>
    <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
    <p>À bientôt sur BreizhSport !</p>
  </div>
</body>
</html>
`;