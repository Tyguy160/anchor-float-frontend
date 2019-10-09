# ONLY USE FOR SEEDING THE DATABASE

# build with `docker build -f ./backend/prisma/Dockerfile -t dbmigrateandseed ./backend` from the root project dir
# run with `docker run --network=associate-engine_default dbmigrateandseed`

FROM node:10-buster

WORKDIR /opt/app

# docker-compose defines the context as ./backend
COPY ./package.json ./

# Add the schema so that prisma2 generate works
COPY ./prisma/schema.prisma ./prisma/

RUN npm i && npm run postinstall

COPY . .

USER node

# Run the app with node
CMD [ "npm", "run", "migrateandseed" ]
