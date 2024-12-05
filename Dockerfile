FROM node:20-alpine

WORKDIR /kyuuchan199/literature-fe

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD npm run start