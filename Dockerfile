FROM node:alpine

EXPOSE 5000

RUN npm i -g serve

COPY . /app

WORKDIR /app

CMD ["npm", "run", "start"]
