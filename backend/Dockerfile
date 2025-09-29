# backend/Dockerfile

# 1. Usa a imagem padrão do Node.js, baseada em Debian
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código da aplicação
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
