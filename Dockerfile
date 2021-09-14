FROM node:14-slim

RUN mkdir -p /usr/frontend
WORKDIR /usr/frontend

COPY package*.json /usr/frontend/

RUN yarn install

COPY . /usr/frontend

RUN yarn run build

CMD [ "yarn", "run", "start" ]