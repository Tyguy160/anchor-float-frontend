FROM node:12

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
USER node
WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 4000
CMD [ "node", "./api/index.js" ]
