import {
  TDate,
  Longitude,
  Latitude,
  IMO,
  AISEntry
} from "./types.ts";


export const toAISEntry = (obj: unknown) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data.")
  }
  if ("baseDateTime" in obj && "lat" in obj && "lon" in obj && "imo" in obj) {
    const entry: AISEntry = {
      baseDateTime: parseTDate(obj.baseDateTime),
      lat: parseLatitude(obj.lat),
      lon: parseLongitude(obj.lon),
      imo: parseIMO(obj.imo),
    };
    return entry;
  }
  throw new Error("Incorrect or missing data");
};

const parseTDate = (obj: unknown): TDate => {
  if (!obj || !isTDate(obj)) {
    throw new Error("Incorrect date.");
  }
  return obj;
};

export const isTDate = (obj: unknown): obj is TDate => {
  if (typeof obj !== "string") {
    return false;
  }
  const [date, time] = obj.split("T");
  if (!date || date.split("-").length !== 3 || !time || time.split(":").length !== 3) {
    return false;
  }

  try {
    Temporal.PlainDateTime.from(obj, { overflow: "reject", });
  } catch (e) {
    return false;
  }
  return true;
};

export const isOptionalTDate = (obj: unknown): obj is TDate | null => {
  return obj === null || isTDate(obj);
};

const parseLongitude = (obj: unknown): Longitude => {
  if (!obj || !isLongitude(obj)) {
    throw new Error("Invalid longitude.");
  }
  return obj;
};

export const isLongitude = (obj: unknown): obj is Longitude => {
  return typeof obj === "number" && obj >= -180 && obj <= 180;
};

const parseLatitude = (obj: unknown): Latitude => {
  if (!obj || !isLatitude(obj)) {
    throw new Error("Invalid latitude.");
  }
  return obj;
};

export const isLatitude = (obj: unknown): obj is Latitude => {
  return typeof obj === "number" && obj >= -90 && obj <= 90;
};

const parseIMO = (obj: unknown): IMO => {
  if (!obj || !isIMO(obj)) {
    throw new Error("Invalid IMO.");
  }
  return obj;
};

export const isIMO = (obj: unknown): obj is IMO => {
  return typeof obj === "string" && obj.startsWith("IMO") && obj.slice(3) !== "" && !isNaN(Number(obj.slice(3)));
};