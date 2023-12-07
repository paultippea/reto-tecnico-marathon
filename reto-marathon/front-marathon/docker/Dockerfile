# Establece la imagen base
FROM node:18.18.1 as builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Establece la imagen de producción
FROM nginx:alpine

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Copia los archivos de construcción al servidor web Nginx
COPY --from=builder /app/dist/front-marathon/browser /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]