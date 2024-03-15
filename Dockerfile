FROM node:20-alpine


WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:migrate:dev" ]
