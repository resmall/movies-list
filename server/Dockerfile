FROM node:10.16.0-alpine

WORKDIR /server

COPY . /server

RUN npm install

RUN npm i -g nodemon

EXPOSE 3333

CMD ["nodemon", "src/index.js"]