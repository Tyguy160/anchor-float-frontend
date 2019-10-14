FROM node:10-buster

WORKDIR /opt/app

# docker-compose defines the context as ./frontend
COPY ./package.json ./

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]
