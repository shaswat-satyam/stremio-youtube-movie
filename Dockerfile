FROM node:alpine as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf node_modules && npm install --frozen-lockfile && yarn cache clean

COPY . .

CMD ["npm","run","start"]
