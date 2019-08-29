FROM node

WORKDIR /opt/app

COPY . .

RUN rm -rf node_modules \
  && npm i -g --unsafe-perm prisma2@latest  \
  && npm install \
  && chown -R node /opt/app

RUN prisma2 generate

USER node

ENV HOME_DIR=/opt/app

CMD [ "node", "./scan/index.js" ]
