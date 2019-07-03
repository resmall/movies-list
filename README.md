# Upcoming Movies Web App

# Architecture

## Server

### Structure
Bellow you can see how the app was structured.

- app: contains the use-cases and logic
- controllers: they connnect and abstract the http world with the application
- infra: repositories and code that communicates with the external world, such as databases and apis
- services: small resources, used only for the api lib
- support: adapters mostly and excpetions
- tests: contains a few test cases.

### API, Stack and Architecture
At first I created a very simple API using ExpressJS and NodeJS, using a MVC approach. But then I decided to push it a little further and try to break down the application into a Clean Architecture approach.

With this method the rest of the code would not be dependendant on the framework I was using, so it would be possible to swap it.

### Cache for movie genres
Also, when listing the movies genres, I noticed that only the IDs came, so I added the functionality to translate those IDs into their names, but that required another request to the API to list all the movies genre. So I created a very simple cache solution using redis to load it into memory, and in case the data was missing, it refreshed the cashe. For that I used Redis.

## Client
### ReactJS
Although front end is not really my strong point, I ventured myself to build it in ReactJS, I encountered some barriers, that due to time constraint I had to work around, so the code might not be that pretty 😬

Was a good learning experience though.

## Tests
I used Jest and created just a few test cases.

# Assumptions

- The genres should always be listed with their names, not their IDs, that's why I created the cache.
- The focus was more on the backend than in front end, so there are not styles in the front end. It's very simple just to interact with the API.
- To not being limited to the 20 first results of TMDB, I created an infinite scroll in the front end, so it would page the views seamlessly.

# Things that could be improved

- The controllers have a good amount of knowledge with the other components, so that could be improved to make it more decoupled and changes more easy, without so much overhead.
- The same goes for use-cases.
- Improved exception handling
- Get the configurations, such as images base url and the like from the config endpoint.
- Add debounce to React when paginating.

# Build Instructions

The API works on port 3333 by default, and the client app on 3000.

- Client: `http://localhost:3000`
- Server: `http://localhost:3333`

## Using docker-compose
I've dockerized the application, so you can run it in dev mode by just executing the following code:

```
docker-compose up
```

## Set up
### Server
To setup the API, follow these steps:
1. Copy the `.env-example` file to `.env` file
2. Fill the parameters
3. Run `npm install` to install the dependencies
4. Run `npm start`

### Client
To setup the React App
1. Run `npm install` to install the dependencies
2. Run `npm start`

# Third Party Libs Used

- axios: for requests
- jest: for testing
- express: the frameworks for building apis in nodejs
- redis: to use redis
- cors: to add the necessary headers to accept requests from the public web
- dotenv: to use environment variables