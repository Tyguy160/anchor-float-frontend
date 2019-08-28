FROM node:alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app

COPY . .

RUN npm install

CMD [ "node", "./index.js" ]
