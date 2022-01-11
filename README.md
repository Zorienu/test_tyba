# Near restaurants API

## Features:
- Login / Sign-up / logout
- Obtain near restaurant giving latitude and longitude
- Record history of all searches made by each user with their results (registred users)
- Obtain the history of searches made by the user (registred users)
## Technologies
- NodeJS with TypeScript
- PostgreSQL with sequelize
- Jest/supertest for testing
## Run App
Run `npm install` and `npm run dev`, the API will listen on port 3000 for development and 3001 for testing
## Endpoints
- `/api/users` For signup
- `/api/login` For user login
- `/api/logiut` For user logout
- `/api/restaurants/:latitude/:longitude` Obtain near restaurants for the given latitude and longitude
- `/api/restaurants/:city` Obtain near restaurant for the given city name (NOT finished)
- `/api/history` Obtain the list of searches made by the authenticated user
