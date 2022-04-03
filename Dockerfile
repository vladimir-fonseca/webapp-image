FROM public.ecr.aws/bitnami/node:latest AS build-env

COPY . /app
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy application with its dependencies into distroless image
FROM gcr.io/distroless/nodejs:16

COPY --from=build-env /app /app
WORKDIR /app

EXPOSE 8080
CMD [ "server.js" ]