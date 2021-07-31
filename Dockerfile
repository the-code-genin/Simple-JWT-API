FROM node:current-alpine3.13
RUN apk add --update npm
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]