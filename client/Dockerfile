# syntax=docker/dockerfile:1

FROM node:16.13.1
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm i
EXPOSE 3000
CMD ["npm", "start"]