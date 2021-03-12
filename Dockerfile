FROM node:12.18-alpine

USER root

RUN mkdir /home/node/app

# VOLUME [ "/home/node/app" ]
WORKDIR /home/node/app

CMD /bin/sh
