# Utiliser une image Node.js pour le backend
FROM node:20-alpine

# Installer Make, et seulement installer Yarn s'il n'est pas déjà présent
RUN apk add --no-cache make && \
    if ! yarn --version >/dev/null 2>&1; then npm install -g yarn; fi

# Créer un répertoire de travail pour l'application
WORKDIR /app    

# Copier le code du serveur Express
COPY . .

# Installer les dépendances
RUN yarn install

# Exposer le port 5000 pour l'API Express
EXPOSE 5001

# Commande pour démarrer le serveur
CMD ["node", "src/index.js"]