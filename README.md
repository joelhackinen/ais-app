## How to run
Run locally with Docker to expose the application at `http://localhost:7800`
```
docker compose up -d --build
```
### API endpoints
1. HTTP  GET `http://localhost:7800/api/aisdata/?startTime=2023-01-01T00:00:01&endTime=2023-01-13T00:00:01&imo=IMO0000000`
    - all search parameters are optional

2. HTTP POST `http://localhost:7800/api/aisdata`
    - request body as JSON
      ```
      {
        "baseDateTime": "2023-01-29T00:00:07",
        "lat": 50.213123213,
        "lon": -100.12321,
        "imo": "IMO1233"
      }
      ```


## Technologies used
- Deno with TypeScript for the backend
  - [PostgreSQL client](https://deno.land/x/postgresjs)
  - [oak framework](https://deno.land/x/oak)
- React with TypeScript
   - [shadcn](https://ui.shadcn.com/) for UI-components, which I tailored for the app's need
- Database runs on PostgreSQL, utilizing official [PostgreSQL image](https://hub.docker.com/_/postgres)
- Docker and Docker Compose for development and production environments
  - The easiest way to run all the services simultaneously
  - Mimics a real production environment well
  - [nginx](https://hub.docker.com/_/nginx) used as reverse proxy and to serve the React app to the client
  - Platform agnostic (in theory)


#### TODO
- Data validation when reading the file
- Tests
- Sticky table header