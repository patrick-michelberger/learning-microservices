# Learning Microservices

This repo is used to learn building microservices with Docker and Node.js.

# How to

## 1. Dockerize the database

Example import data can be found in `test-database/setup.sql`

Create `Dockerfile` in `/test-database`

```
FROM mysql

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE users
ENV MYSQL_USER users_service
ENV MYSQL_PASSWORD 123

ADD setup.sql /docker-entrypoint-initdb.d
```

## 2. Create a microservice in Node.js

Example code can be found in the `users-service` directory. 

The microservices exposes the following endpoints

```
HTTP GET /users
HTTP GET /search?email=homer@thesimpsons.com
```

## 3. Dockerise the microservice

Create `Dockerfile` in `/users-service`

```
# Use Node v4 as the base image.
FROM node:4

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# Install dependencies
RUN cd /app; \  
    npm install --production

# Expose our server port.
EXPOSE 8123

# Run our app.
CMD ["node", "/app/index.js"]  
```

## 4. Linking Containers with Docker Compose

Create `docker-compose.yml` in the root.

```
version: '2'
services:
  users-service:
    build: ./users-service
    container_name: users_service
    ports:
     - "8123:8123"
    links:
      - db:db
    depends_on:
     - db
    environment:
     - DATABASE_HOST=db
  db:
    build: ./test-database
```

## 5. Build & Run

In the root directory containing the `docker-compose.yml` file
 
```
$ docker-compose build
```

Run the containers

```
$ docker-compose up
```




