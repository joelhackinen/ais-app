import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.215.0/assert/mod.ts";

import {
  TDate,
  Latitude,
  Longitude,
  IMO,
  AISEntry,
} from "../types.ts";

import {
  toAISEntry,
  isTDate,
  isLongitude,
  isLatitude,
  isIMO,
  isOptionalTDate,
} from "../util.ts";


Deno.test("toAISEntry - valid input", () => {
  const input = {
    baseDateTime: "2024-02-13T12:00:00",
    lat: 40.7128,
    lon: -74.0060,
    imo: "IMO1234567",
  };

  const result: AISEntry = toAISEntry(input);

  assertEquals(result.baseDateTime, "2024-02-13T12:00:00" as TDate);
  assertEquals(result.lat, 40.7128 as Latitude);
  assertEquals(result.lon, -74.006 as Longitude);
  assertEquals(result.imo, "IMO1234567" as IMO);
});

Deno.test("toAISEntry - invalid input", () => {
  const invalidInput = {
    baseDateTime: "2024-02-13T12:00:00",
    imo: "IMO1234567",
  };

  assertThrows(() => toAISEntry(invalidInput), Error, "Incorrect or missing data");
});

Deno.test("isTDate", () => {
  assert(isTDate("2024-02-13T12:00:00"));
  assert(isTDate("2023-01-01T00:00:00"));
  assert(!isTDate("2021-02-29T12:00:00"));
  assert(!isTDate("2021-02-28"));
  assert(!isTDate("2021-02-28T"));
  assert(!isTDate("2021-02-28T12"));
  assert(!isTDate("2024-02-22T25:00:00"));
  assert(!isTDate("2024-02-22T23:61:00"));
  assert(!isTDate("2024-02-22T24:01:00"));
  assert(!isTDate("2024-02-24T00:00:71"));
  assert(!isTDate("invalid date"));
  assert(!isTDate(12345));
});

Deno.test("isOptionalTDate", () => {
  assert(isOptionalTDate(null));
  assert(!isOptionalTDate(undefined));
});

Deno.test("isLongitude", () => {
  assert(!isLongitude(-181));
  assert(isLongitude(-180));
  assert(isLongitude(-90));
  assert(isLongitude(0));
  assert(isLongitude(180));
  assert(!isLongitude(181));
  assert(!isLongitude(NaN));
  assert(!isLongitude("45"));
  assert(!isLongitude("invalid"));
});

Deno.test("isLatitude", () => {
  assert(!isLatitude(-91));
  assert(isLatitude(-90));
  assert(isLatitude(-45));
  assert(isLatitude(0));
  assert(isLatitude(90));
  assert(!isLatitude(100));
  assert(!isLatitude("20"));
  assert(!isLatitude("invalid"));
});

Deno.test("isIMO", () => {
  assert(isIMO("IMO1234567"));
  assert(isIMO("IMO1"));
  assert(!isIMO("IMO11zaa"));
  assert(!isIMO("IMO"));
  assert(!isIMO("invalid"));
  assert(!isIMO("IMOabcdef"));
  assert(!isIMO(12345));
});