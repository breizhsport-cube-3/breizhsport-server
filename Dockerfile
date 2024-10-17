# Utiliser une image Node.js pour le backend
FROM node:20-alpine

# Installer Make et Yarn
RUN apk add --no-cache make && \
    if ! yarn --version >/dev/null 2>&1; then npm install -g yarn; fi

COPY . .

# Installe les dépendances listées dans le fichier package.json
RUN yarn

EXPOSE 3001

CMD ["node", "src/index.js"]