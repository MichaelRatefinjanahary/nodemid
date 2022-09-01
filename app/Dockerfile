FROM node:14 as base

WORKDIR /app
COPY ./package.json .

FROM base as test
RUN npm install
COPY . .
CMD [ "npm", "run", "test" ]

FROM base as dev
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]