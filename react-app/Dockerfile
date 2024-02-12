FROM node:21.6.1-bullseye-slim AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npx tailwindcss -i ./src/index.css -o ./src/output.css

RUN npm run build


FROM nginx:1.24.0-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
