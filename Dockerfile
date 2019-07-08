FROM node:10
WORKDIR /usr/src/app
ADD . .
CMD [ "node", "index.js" ]