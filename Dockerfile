# Use a imagem oficial do Node.js como base
FROM node:18

# Crie um diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do aplicativo para o diretório de trabalho
COPY . .

# Build do TypeScript
RUN npm run build

# Porta que a aplicação irá escutar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "start"]