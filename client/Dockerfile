# syntax=docker/dockerfile:1

FROM node:16.13.1
WORKDIR /App
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm i
CMD ["npm", "start"]