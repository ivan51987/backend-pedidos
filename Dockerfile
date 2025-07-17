FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (por defecto usas 3000)
EXPOSE 3000

# Comando para iniciar el servidor en modo desarrollo
CMD ["npm", "run", "dev"]
