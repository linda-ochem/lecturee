FROM node:14

RUN mkdir /app

WORKDIR /app

COPY package*.json app /app/

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]