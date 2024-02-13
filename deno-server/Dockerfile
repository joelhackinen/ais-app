FROM lukechannings/deno:v1.40.3

EXPOSE 7777

WORKDIR /app

COPY deps.ts .

RUN deno cache deps.ts

COPY . .

CMD [ "run", "--unstable-temporal", "--allow-net", "--allow-read", "--allow-env", "app.ts" ]