# Utiliser une image Node.js pour le backend
FROM node:20-alpine

# Installer Make et Yarn (Yarn seulement si non présent)
RUN apk add --no-cache make && \
    if ! yarn --version >/dev/null 2>&1; then npm install -g yarn; fi

# Créer un répertoire de travail pour l'application
WORKDIR /app    

# Copier package.json et yarn.lock pour installer les dépendances
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier le reste du code de l'application
COPY . .

# Exposer le port 5001 pour l'API Express
EXPOSE 5001

# Commande pour démarrer le serveur
CMD ["node", "src/index.js"]