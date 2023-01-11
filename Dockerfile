FROM node:16.17.0

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

EXPOSE 3000 3333
 
CMD ["node", "dist/server.js"];