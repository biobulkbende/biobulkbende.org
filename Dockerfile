FROM node:alpine

EXPOSE 8081

COPY ./docs /app

WORKDIR /app

RUN apk add --no-cache curl

RUN npm install http-server

CMD ["npm", "start"]
