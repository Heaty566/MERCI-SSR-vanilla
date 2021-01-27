FROM node:12-alpine AS builder

WORKDIR /app  
COPY ./package.json ./
RUN npm install  
COPY . .
CMD ["yarn", "run", "start"]




