CREATE TABLE aisdata (
  id SERIAL PRIMARY KEY,
  BaseDateTime TIMESTAMP,
  LAT DOUBLE PRECISION NOT NULL,
  LON DOUBLE PRECISION NOT NULL,
  IMO TEXT NOT NULL
);

COPY aisdata(BaseDateTime, LAT, LON, IMO) FROM '/ais-data.csv' DELIMITER ',' CSV HEADER;

--psql -U username -d db -h localhost