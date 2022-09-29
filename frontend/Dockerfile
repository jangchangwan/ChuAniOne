FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
COPY --from=build-stage /app/build /usr/share/nginx/html