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
    | Param              | Description            | Example             |
    | ------------------ | ---------------------- | ------------------- |
    | startTime: string  | plain datetime         | 2023-01-01T00:00:01 |
    | endTime: string    | plain datetime         | 2023-01-13T00:00:01 |
    | imo: string        | string                 | IMO12345            |
  - example:
    - `http://localhost:7800/api/aisdata?endTime=2023-01-02T00:00:01`

#### 2. HTTP POST `http://localhost:7800/api/aisdata`
  - request body as JSON, all fields are mandatory:
    | Field                | Description           | Example             |
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
I tried to choose the technologies in such a way that the setup would work on any platform. Personally, I developed it with WSL amd64 (x86-64) and I have had no change to test it with any other platform.

- Deno with TypeScript for the backend
  - Built-in TypeScript support, no transpilation step, no boilerplate code and almost complete npm package support
  - [PostgreSQL client](https://deno.land/x/postgresjs)
  - [oak framework](https://deno.land/x/oak)
- React with TypeScript
  - [shadcn](https://ui.shadcn.com/) for UI-components, which I tailored for the app's need
  - TailwindCSS for styling
  - Vite as a build tool
- Database runs on PostgreSQL, utilizing official [PostgreSQL image](https://hub.docker.com/_/postgres)
- Docker and Docker Compose for development and production environments
  - The easiest way to run all the services simultaneously
  - Mimics a real production environment well
  - nginx used as reverse proxy and to serve the React app to the client
  - Platform agnostic (in theory)
  - Improved scalability, as each service is a separate container. For example, the backend could easily be replicated as long as the replicas share a same database.
- Python utilized to read and validate the data
- Playwright for e2e tests
---

### TODO
- [x] Data validation when reading the file
- [x] Unit tests
- [x] e2e tests
- [ ] Tests separately for API endpoints
- [ ] Sticky table header