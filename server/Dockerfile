# syntax=docker/dockerfile:1

FROM node:16.13.1
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start"]