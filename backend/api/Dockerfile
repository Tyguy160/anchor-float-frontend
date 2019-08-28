FROM node:alpine

USER node
WORKDIR /home/node

COPY --chown=node:node . .

RUN npm install

CMD [ "node", "./api/index.js" ]
