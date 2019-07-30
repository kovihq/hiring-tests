FROM node:10.16
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY ./api/package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm i --only=production

EXPOSE 3000

CMD npm install && npm run start:dev
# If you are building your code for production
# CMD npm install && npm start