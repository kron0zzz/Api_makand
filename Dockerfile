FROM node:20-bookworm

WORKDIR /app

# Dependencias necesarias para ejecutar Chromium/Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-liberation \
    fonts-noto \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*

# Le indicamos a Puppeteer que use Chromium instalado por el sistema
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copiar primero los archivos de dependencias
COPY package*.json ./

# Instalar dependencias de Node
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Puerto de la aplicación
EXPOSE 10000

# Arrancar la API
CMD ["npm", "start"]