FROM node:alpine

EXPOSE 8081

COPY ./docs /app

WORKDIR /app

RUN npm install http-server

CMD ["npm", "start"]
