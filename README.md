### How to run
- `git clone` the repo and `cd` into it
- Run locally with Docker to expose the application at `http://localhost:7800`:
    ```
    docker compose up -d --build
    ```
---
### API endpoints
#### 1. HTTP  GET `http://localhost:7800/api/aisdata`
  - takes three search parameters which are all optional:
    | Param              | Type                   | Example             |
    | ------------------ | ---------------------- | ------------------- |
    | startTime: string  | plain datetime         | 2023-01-01T00:00:01 |
    | endTime: string    | plain datetime         | 2023-01-13T00:00:01 |
    | imo: string        | "IMO" + number         | IMO12345            |
  - example:
    - `http://localhost:7800/api/aisdata?endTime=2023-01-02T00:00:01`

#### 2. HTTP POST `http://localhost:7800/api/aisdata`
  - request body as JSON, all fields are mandatory:
    | Field                | Type                  | Example             |
    | -------------------- | --------------------- | ------------------- |
    | baseDateTime: string | plain datetime        | 2023-01-01T00:00:01 |
    | lat: number          | -90 <= number <= 90   | 88.12345            |
    | lon: number          | -180 <= number <= 180 | -110.2234           |
    | imo: string          | "IMO" + number        | IMO12345            |
  - example:
    ```
    {
      "baseDateTime": "2023-01-01T00:00:01",
      "lat": 88.12345,
      "lon": -110.2234,
      "imo": "IMO12345"
    }
    ```
---

### Technologies used
- Deno with TypeScript for the backend
  - Built-in TypeScript support, no transpilation step, no boilerplate code and almost complete npm package support
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
- Python utilized to read and validate the data
---

### TODO
- [x] Data validation when reading the file
- [x] Unit tests
- [ ] e2e tests
- [ ] Sticky table header