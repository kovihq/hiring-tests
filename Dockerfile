# ======================================================================
# @author: Vitor Ferreira Garcia
# @version: 1.0.0
#
# @description:
#   Dockerfile to build,test and deploy intersect function
# ======================================================================

# Step 1 - Copy files and install all dependencies
FROM node:10.16-alpine as build

WORKDIR /app
COPY . .
RUN npm install

# Step 2 - Run unit testing
FROM build as unit-test

RUN npm run unit-test

# Step 3 - Deploy
FROM unit-test as deploy

ARG ACCESS_KEY_ID
ARG SECRET_ACCESS_KEY

RUN npm run config -- --provider aws --key ${ACCESS_KEY_ID} --secret ${SECRET_ACCESS_KEY}

RUN npm run deploy