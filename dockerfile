#definir el tipo de aplicacion que vamos a definir 
FROM node

# definir donde se va a guardar el proyecto/imagen
WORKDIR /simplex-complex

# copio/pego el package de la aplicacion desde el servidor 
COPY package*.json ./

RUN npm install

#copiamos el resto de los archivos del server al contenedor
COPY . .

#configuramos el puerto de exposicion
EXPOSE 8081

#configurar el comando de ejecucion del servidor
CMD ["npm", "start"]