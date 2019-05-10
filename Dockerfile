FROM node:10.9.0 as builder
WORKDIR /usr/app
COPY . .
WORKDIR /usr/app/frontend
RUN npm install
RUN npm run build
WORKDIR /usr/app/backend
RUN npm install
