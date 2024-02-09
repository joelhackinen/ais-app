import { sql } from "./database.ts";
import { Application, Router } from "./deps.ts";
import { AISEntry } from "./types.ts";
import { toAISEntry, isOptionalTDate } from "./util.ts";

const app = new Application();
const router = new Router();

router.get("/aisdata", async ({ request, response }) => {
  const searchParams = request.url.searchParams;
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  if (!isOptionalTDate(startTime)) {
    response.body = { error: "Invalid start time." };
    return response.status = 400;
  }

  if (!isOptionalTDate(endTime)) {
    response.body = { error: "Invalid end time." };
    return response.status = 400;
  }

  const rows = await sql<AISEntry[]>`
    SELECT
      to_char(basedatetime, 'YYYY-MM-DD"T"HH24:MI:SS') AS basedatetime,
      lat,
      lon,
      imo
    FROM
      aisdata
    WHERE
      basedatetime >= COALESCE(${startTime}, '-infinity')::TIMESTAMP
        AND
      basedatetime <= COALESCE(${endTime}, 'infinity')::TIMESTAMP;
  `;
  response.body = rows;
});

router.post("/aisdata", async ({ request, response }) => {
  const body = request.body;
  const data = await body.json();

  let newEntry: AISEntry;
  try {
    newEntry = toAISEntry(data);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " " + error.message;
    }
    response.body = { error: errorMessage };
    return response.status = 400;
  }

  await sql`
    INSERT INTO
      aisdata (basedatetime, lat, lon, imo)
    VALUES (
      ${newEntry.baseDateTime},
      ${newEntry.lat},
      ${newEntry.lon},
      ${newEntry.imo}
    );
  `;
  response.body = newEntry;
});

app.use(router.routes());

const portConfig = { port: 7777, hostname: '0.0.0.0' };
await app.listen(portConfig);