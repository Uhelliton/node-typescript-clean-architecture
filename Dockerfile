# base image
FROM node:12.2.0-alpine

RUN apk add --update --no-cache \
    curl \
    git \
    vim

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

USER node

# set working directory
WORKDIR /home/node/app

# install and cache app dependencies
COPY package*.json ./
COPY --chown=node:node . .

RUN npm install

EXPOSE 8080

CMD [ "node" ]