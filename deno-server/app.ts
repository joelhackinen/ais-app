import { sql } from "./database.ts";
import { Application, Router, datetime } from "./deps.ts";

const app = new Application();
const router = new Router();

router.get("/", async ({ request, response }) => {
  const searchParams = request.url.searchParams;
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  console.log("start time:", startTime);
  console.log("end time:  ", endTime);

  if (!startTime || !endTime) {
    return response.status = 400;
  }

  const rows = await sql`
    SELECT
      to_char(basedatetime, 'YYYY-MM-DD"T"HH24:MI:SS') AS datetime,
      lat,
      lon,
      imo
    FROM
      aisdata
    WHERE
      basedatetime >= ${startTime}::TIMESTAMP
        AND
      basedatetime <= ${endTime}::TIMESTAMP;
  `;
  console.log(rows);
  response.body = rows;
});

app.use(router.routes());

const portConfig = { port: 7777, hostname: '0.0.0.0' };
await app.listen(portConfig);