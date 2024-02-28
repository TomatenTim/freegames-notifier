FROM node:20-bullseye-slim AS build
WORKDIR /app
COPY ./package*.json ./
RUN npm i
COPY ./tsconfig.json ./
COPY ./src ./src
RUN npm run build


FROM node:alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY --from=build /app/dist ./dist
CMD ["npm", "run", "start"]